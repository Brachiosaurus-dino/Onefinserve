import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Papa from "papaparse";
import Navbar from "./components/navabr";
import { Link } from "react-router-dom";
import NiftyCarousel from "./components/niftyCarousel";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./components/footer";
import { FaBolt, FaShoppingCart, FaChartLine, FaMousePointer } from "react-icons/fa";

  const columnsData = [
    { icon: <FaBolt />, title: "Instant KYC", text: "Paperless Setup" , link:"/check_kyc_status"},
    { icon: <FaShoppingCart />, title: "One Click Buy", text: "Instant Buying" , link:"/mutual-funds/one-time-investment"},
    { icon: <FaChartLine />, title: "Top Mutual Fund", text: "Find For You" , link:"/latest-funds-list"},
    { icon: <FaMousePointer />, title: "Topup Investment", text: "Easy Navigation" , link:"/mutual-funds/mutual-top"},
  ];

// Helper function to detect fund type from scheme name
function getFundType(title) {
  const t = title.toLowerCase();
  if (t.includes("large & mid")) return "Large & Mid Cap Funds";
  if (t.includes("large cap")) return "Large Cap Funds";
  if (t.includes("midcap")) return "Midcap Funds";
  if (t.includes("small cap")) return "Small Cap Funds";
  if (t.includes("flexi")) return "Flexi Cap Funds";
  if (t.includes("multi cap")) return "Multi Cap Funds";
  if (t.includes("sector")) return "Sectorial Funds";
  return "Other Funds";
}

function TopMutual() {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("All Funds");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [sheetData, setSheetData] = useState([]);
  const [filteredFunds, setFilteredFunds] = useState([]);

  const categories = [
    "All Funds",
    "Large & Mid Cap Funds",
    "Large Cap Funds",
    "Midcap Funds",
    "Small Cap Funds",
    "Flexi Cap Funds",
    "Multi Cap Funds",
    "Sectorial Funds",
  ];

  const dropdownRef = useRef();

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 300, once: true });
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch Google Sheets CSV data
  useEffect(() => {
    const url =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQCWKcPNj_6JhFnrJPO34inDkUMUdoTZGo1dBJpiOzl_A4mXzYqi2OjCvWB8sS-SEb1rb_y0K0upxHc/pub?output=csv";

    axios
      .get(url)
      .then((res) => {
        const parsed = Papa.parse(res.data, { header: true });
        const formatted = parsed.data
          .filter((row) => row["Scheme Name"])
          .map((row) => ({
            title: row["Scheme Name"],
            type: getFundType(row["Scheme Name"]),
            number: row["Current Nav"],
            durations: [
              { period: "1Y", percent: row["1 yr Return"] },
              { period: "2Y", percent: row["2 yr Return"] },
              { period: "3Y", percent: row["3 yr Return"] },
              { period: "5Y", percent: row["5 yr Return"] },
            ],
          }));
        setSheetData(formatted);
      })
      .catch((err) => console.error("Error fetching CSV:", err));
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = sheetData;

    // Filter by scheme name
    if (searchText.trim() !== "") {
      filtered = filtered.filter((fund) =>
        fund.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by category
    if (category !== "All Funds") {
      filtered = filtered.filter((fund) => fund.type === category);
    }

    setFilteredFunds(filtered);
    setShowAll(false); // reset showAll whenever filters change
  }, [searchText, category, sheetData]);

  const fundsToDisplay = showAll ? filteredFunds : filteredFunds.slice(0, 6);

  return (
    <div className="bg-zinc-900">
      <Navbar />

      {/* Features Section */}
      <section className="py-10 pt-40 bg-zinc-900 text-zinc-100">
        <div className="max-w-6xl mx-auto p-6 rounded-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {columnsData.map((col, index) => (
              <div
                key={index}
                className="flex flex-col items-center sm:items-start text-center sm:text-left"
              >
                <Link to={col.link}>
                <div className="relative p-4 rounded-2xl bg-zinc-800 mb-3">
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-zinc-900"></span>
                  
                  {React.cloneElement(col.icon, { className: "text-green-400 w-8 h-8" })}
                </div>
                </Link>
                <h3 className="text-sm font-bold">{col.title}</h3>
                <p className="text-xs font-bold text-zinc-400">{col.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NiftyCarousel />

      {/* Search & Filters */}
      <section className="py-8 bg-zinc-800 text-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 bg-zinc-900 rounded-2xl shadow-inner p-3 font-poppins">

            {/* Search Input */}
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search funds, SIPs, etc..."
              className="flex-1 min-w-0 bg-zinc-900 text-white placeholder-gray-400 font-semibold rounded-2xl px-4 py-3 outline-none shadow-inner"
            />

            {/* Category Dropdown */}
            <div className="relative flex-shrink-0 w-full sm:w-auto" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-zinc-900 text-white px-4 py-3 rounded-2xl shadow-inner font-semibold flex items-center gap-2 justify-between w-full sm:w-auto"
              >
                <span className="truncate">{category}</span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-1 w-full sm:w-auto bg-zinc-900 rounded-b-xl shadow-lg overflow-hidden z-50"
                  data-aos="fade-down"
                >
                  {categories.map((cat) => (
                    <div
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setDropdownOpen(false);
                      }}
                      className="px-4 py-3 hover:bg-zinc-700 cursor-pointer text-white font-semibold transition-colors whitespace-nowrap"
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Investment Cards */}
        <div className="max-w-7xl mx-auto p-4">
          <h2 className="text-3xl font-semibold mb-8 text-center font-roboto">
            Latest Mutual Funds
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {fundsToDisplay.map((fund, idx) => (
              <div
                key={idx}
                className="bg-zinc-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col justify-between"
              >
                <h3 className="text-2xl font-semibold">{fund.title}</h3>
                <p className="text-md font-bold mt-2">
                  NAV: <span className="font-light">₹{fund.number}</span>
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                  {fund.durations.map((d, i) => (
                    <div key={i} className="bg-zinc-700 p-3 rounded-lg text-center">
                      <p className="font-semibold text-sm md:text-base">{d.period}</p>
                      <p className="text-green-400 text-sm md:text-base">{d.percent}</p>
                    </div>
                  ))}
                </div>

                <button className="w-full h-15 mt-6 bg-linear-to-r from-green-500 to-green-700 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300">
                  Invest Now
                </button>
              </div>
            ))}
          </div>

          {/* Show More / Less */}
          {filteredFunds.length > 6 && (
            <div className="text-center mt-6">
              <Link>
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-2xl shadow-lg"
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default TopMutual;