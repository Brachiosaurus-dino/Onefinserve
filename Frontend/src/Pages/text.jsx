import { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";

export default function SheetDataTable() {
  const [sheetData, setSheetData] = useState([]);

  useEffect(() => {
    const url =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQCWKcPNj_6JhFnrJPO34inDkUMUdoTZGo1dBJpiOzl_A4mXzYqi2OjCvWB8sS-SEb1rb_y0K0upxHc/pub?output=csv";

    axios
      .get(url)
      .then((res) => {
        const parsed = Papa.parse(res.data, { header: true });
        console.log(parsed)
        setSheetData(parsed.data);
      })
      .catch((err) => console.error("Error fetching CSV:", err));
       
  }, []);
  return (
    <div className="p-4 bg-zinc-900 text-white">
      <h2 className="text-lg font-bold mb-2">Sheet Data</h2>
      <table className="min-w-full border border-zinc-700">
        <thead>
          <tr className="bg-zinc-800">
            <th className="border border-zinc-700 p-2 text-left">Scheme Name</th>
            <th className="border border-zinc-700 p-2 text-left">Current Nav</th>
            <th className="border border-zinc-700 p-2 text-left">1 yr Return</th>
            <th className="border border-zinc-700 p-2 text-left">2 yr Return</th>
            <th className="border border-zinc-700 p-2 text-left">3 yr Return</th>
            <th className="border border-zinc-700 p-2 text-left">5 yr Return</th>
          </tr>
        </thead>
        <tbody>
          {sheetData.map((row, idx) => (
            <tr key={idx} className="hover:bg-zinc-700">
              <td className="border border-zinc-700 p-2">{row["Scheme Name"]}</td>
              <td className="border border-zinc-700 p-2">{row["Current Nav"]}</td>
              <td className="border border-zinc-700 p-2">{row["1 yr Return"]}</td>
              <td className="border border-zinc-700 p-2">{row["2 yr Return"]}</td>
              <td className="border border-zinc-700 p-2">{row["3 yr Return"]}</td>
              <td className="border border-zinc-700 p-2">{row["5 yr Return"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}