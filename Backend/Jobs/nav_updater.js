import mongoose from "mongoose";
import fetch from "node-fetch";
import { parse } from "csv-parse/sync";

const mongourl = "mongodb://localhost:27017/database_oneFinServe";

const csvurl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSW9x0U61JJw4yWL4aYGx_Vuf9waWl4YSAQv4qCy0QhDhSC8dFLnvc-KlK4L1Fj5e8zzkHG2htRzMk6/pub?gid=0&single=true&output=csv";

// Schema
const folioSchema = new mongoose.Schema({
  ISIN_No: { type: String, index: true },
  NAV: { type: Number },
  Units: { type: Number },   // existing in DB
  Value: { type: Number },   // will be updated
});

const FolioModel =
  mongoose.models.FolioModel ||
  mongoose.model("FolioModel", folioSchema, "Aum_Plus_Kfinkart_data");
  const FolioModel2 =
  mongoose.models.FolioModel2 ||
  mongoose.model("FolioModel2", folioSchema, "DUMMY");

// Fetch CSV
async function fetchCSV() {
  const res = await fetch(csvurl + "&t=" + Date.now());
  const text = await res.text();

  return parse(text, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
    trim: true,
  });
}

// MAIN FUNCTION
export async function updateNAV() {
  try {
    // ensure DB connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(mongourl);
      console.log("MongoDB Connected");
    }

    const rows = await fetchCSV();

    // STEP 1: Deduplicate CSV (last value wins)
    const isinMap = new Map();

    for (const r of rows) {
      const ISIN_No = (r["ISIN Growth"] || "")
        .trim()
        .toUpperCase()
        .replace(/\s+/g, "");

      const NAV_raw = r["Current NAV"];

      if (!ISIN_No || !NAV_raw) continue;

      const NAV = Number(parseFloat(NAV_raw).toFixed(4));
      if (isNaN(NAV)) continue;

      isinMap.set(ISIN_No, NAV);
    }

    // STEP 2: Build bulk operations
    const operations = [];

    for (const [ISIN_No, NAV] of isinMap.entries()) {
      operations.push({
        updateMany: {
          filter: {
            ISIN_No,
            $or: [
              { NAV: { $ne: NAV } },
              {
                $expr: {
                  // $ne is = not equal to her eit chekcs if $Value !== the caluclated value if true then
                  // update code runs 
                  $ne: [
                    "$Value",
                    {
                      $round: [
                        {
                          $multiply: [
                            { $ifNull: ["$Units", 0] },
                            NAV,
                          ],
                        },
                        2,
                      ],
                    },
                  ],
                },
              },
            ],
          },
          update: [
            {
              $set: {
                // Here it sets new NAV value and calculate the Value 
                NAV: NAV,
                Value: {
                  $round: [
                    {
                      $multiply: [
                        { $ifNull: ["$Units", 0] },
                        NAV,
                      ],
                    },
                    2,
                  ],
                },
              },
            },
          ],
        },
      });
    }

    // STEP 3: Execute
    let updatedDocs = 0;
    let updated_2=0
    let matched = isinMap.size;

    if (operations.length > 0) {
      const result = await FolioModel.bulkWrite(operations);
      const result_2 = await FolioModel2.bulkWrite(operations);
      updatedDocs = result.modifiedCount;
      updated_2 = result_2.modifiedCount;
    }

    // STEP 4: Count Value changes
    // Since Value is updated only when NAV changes,
    // Value changes == modified documents
    const valueChanged = updatedDocs;
    const newchange = updated_2

    // LOGS
    console.log("================================");
    console.log("Run Time:", new Date());
    console.log("CSV Unique ISINs:", isinMap.size);
    console.log("Attempted Updates:", operations.length);
    console.log("Documents Updated:", updatedDocs);
    console.log("Value Fields Changed:", valueChanged);
    console.log("Value Fields Changed:", newchange);
    console.log("================================");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    console.log("Done");
  }
}