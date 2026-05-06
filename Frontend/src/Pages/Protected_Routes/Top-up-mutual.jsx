import React, { useState, useEffect } from "react";
import Navbar from "../components/navabr";
import { Link } from "react-router-dom";

export default function TopInvestProtect() {
  const [selectedAMC, setSelectedAMC] = useState("CAMS");
  const [search, setSearch] = useState("");
  const [noData, setNoData] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [folios, setFolios] = useState([]);
  const [pan, setPan] = useState("");

  useEffect(() => {
    let storedPan = sessionStorage.getItem("auth");

    if (!storedPan) {
      setNoData(true);
      return;
    }

    storedPan = storedPan.replace(/"/g, "").trim();
    setPan(storedPan);

    if (storedPan !== "BTFPK2149R") {
      fetchData(storedPan);
    }
  }, []);

  const fetchData = async (panValue) => {
    setNoData(false);
    setShowResult(false);

    try {
      const response = await fetch("http://localhost:5000/api/foliodatass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ PanNum: panValue }),
      });

      const data = await response.json();

      if (!data.success || !data.data.length) {
        setNoData(true);
        return;
      }

      setFolios(data.data);
      setShowResult(true);
    } catch (error) {
      console.error("❌ Error:", error);
      setNoData(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(search);
  };

  return (
    <div className="bg-zinc-900 min-h-screen flex flex-col items-center p-6">
      <Navbar />

      {/* TOP BUTTONS */}
      <div className="flex w-full max-w-6xl pt-20 mb-6">
        <button
          className={`px-6 py-2 rounded-l-lg font-bold ${selectedAMC === "CAMS"
            ? "bg-green-500"
            : "bg-zinc-800 text-white"
            }`}
          onClick={() => setSelectedAMC("CAMS")}
        >
          CAMS
        </button>

        <Link to="/mutual/data">
          <button
            className={`px-6 py-2 rounded-r-lg font-bold ${selectedAMC === "Karve"
              ? "bg-green-500"
              : "bg-zinc-800 text-white"
              }`}
            onClick={() => setSelectedAMC("Karve")}
          >
            Karve
          </button>
        </Link>
      </div>

      {/* SEARCH ONLY FOR BPB */}
      {pan?.replace(/"/g, "").trim() === "BTFPK2149R" && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-6xl flex flex-col items-center"
        >
          <input
            type="text"
            placeholder="Enter PAN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-700 text-white"
          />

          <button
            type="submit"
            className="mt-6 px-8 py-3 bg-green-500 rounded-xl font-bold"
          >
            Search
          </button>
        </form>
      )}

      {/* CARDS GRID */}
      <div className="w-full max-w-7xl mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">

        {showResult &&
          folios.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-green-500/20 rounded-2xl shadow-xl p-4 flex flex-col"
            >
              {/* TITLE */}


              {/* 2 x 3 GRID */}
              <div className="grid grid-cols-2 gap-2 text-xs flex-1">

                <div className="bg-zinc-800 px-2 py-2 rounded-md">
                  <span className="text-gray-400 text-[10px]">Folio No</span>
                  <div className="text-white font-medium leading-tight">{item.Folio_No}</div>
                </div>

                <div className="bg-zinc-800 px-2 py-2 rounded-md">
                  <span className="text-gray-400 text-[10px]">Name</span>
                  <div className="text-white font-medium leading-tight">{item.Name}</div>
                </div>

                <div className="bg-zinc-800 px-2 py-2 rounded-md">
                  <span className="text-gray-400 text-[10px]">Amount</span>
                  <div className="text-green-400 font-medium leading-tight">{item.COSTVALUE}</div>
                </div>

                <div className="bg-zinc-800 px-2 py-2 rounded-md">
                  <span className="text-gray-400 text-[10px]">Value</span>
                  <div className="text-white font-medium leading-tight">{item.Value}</div>
                </div>

                <div className="bg-zinc-800 px-2 py-2 rounded-md">
                  <span className="text-gray-400 text-[10px]">Units</span>
                  <div className="text-white font-medium leading-tight">{item.Units}</div>
                </div>

                <div className="bg-zinc-800 px-2 py-2 rounded-md">
                  <span className="text-gray-400 text-[10px]">NAV</span>
                  <div className="text-green-400 font-medium leading-tight">{item.NAV}</div>
                </div>

              </div>

              {/* SCHEME NAME AT BOTTOM */}
              <div className="mt-3 bg-zinc-800 p-3 rounded-lg border border-green-500/20">
                <span className="text-gray-400 text-xs">Scheme Name</span>
                <div className="text-green-400 font-semibold">
                  {item.Scheme_name}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* NO DATA (KEPT EXACTLY) */}
      {noData && (
        <div className="text-red-400 text-center mt-10">
          No Data Found
        </div>
      )}
    </div>
  );
}