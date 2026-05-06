import Navbar from "./components/navabr";
import { FaBolt, FaShoppingCart, FaChartLine, FaMousePointer } from "react-icons/fa";
import React, { useState, useRef, useEffect } from "react";
import AOS from "aos";
import Footer from "./components/footer";
import { Link } from "react-router-dom";

function NFOlist() {
    const [searchText, setSearchText] = useState("");
    const [category, setCategory] = useState("All Funds");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const categories = ["All Funds", "Equity Mutual Fund", "Debt Mutual Fund", "Hybrid Mutual Fund"];
    const dropdownRef = useRef();

    useEffect(() => { AOS.init({ duration: 300, once: true }); }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = () => { alert(`Searching: ${searchText}\nCategory: ${category}`); };

  const columnsData = [
    { icon: <FaBolt />, title: "Instant KYC", text: "Paperless Setup" , link:"/check_kyc_status"},
    { icon: <FaShoppingCart />, title: "One Click Buy", text: "Instant Buying" , link:"/mutual-funds/one-time-investment"},
    { icon: <FaChartLine />, title: "Top Mutual Fund", text: "Find For You" , link:"/latest-funds-list"},
    { icon: <FaMousePointer />, title: "Topup Investment", text: "Easy Navigation" , link:"/mutual-funds/mutual-top"},
  ];


    const funds = [
        { name: "Groww Nifty PSU Bank ETF", status: "Open Now", statusColor: "bg-emerald-500", riskLevel: "Moderate", launchDate: "01 Jan 2023", closeDate: "31 Mar 2023" },
        { name: "Groww Nifty PSU Bank Index Fund", status: "Closed", statusColor: "bg-red-500", riskLevel: "High", launchDate: "15 Feb 2023", closeDate: "15 Apr 2023" },
        { name: "Trust Mutual Fund", status: "Open Now", statusColor: "bg-emerald-500", riskLevel: "Moderate", launchDate: "01 Mar 2023", closeDate: "31 May 2023" },
        { name: "HDFC Equity Fund - Regular Plan", status: "Upcoming", statusColor: "bg-yellow-500", riskLevel: "Low", launchDate: "01 Apr 2023", closeDate: "30 Jun 2023" },
    ];

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <Navbar />

            {/* Features Section */}
            <section className="py-10 pt-40 bg-zinc-900 text-zinc-100">
                <div className="max-w-6xl mx-auto p-6 rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {columnsData.map((col, index) => (
                            <div key={index} className="flex flex-col items-center sm:items-start text-center sm:text-left">
                                <div className="relative p-4 rounded-2xl bg-zinc-800 mb-3">
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-zinc-900"></span>
                                    <Link to={col.link}>
                                        {React.cloneElement(col.icon, { className: "text-green-400 w-8 h-8" })}
                                    </Link>
                                </div>
                                <h3 className="text-sm font-bold">{col.title}</h3>
                                <p className="text-xs font-bold text-zinc-400">{col.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NFO Section */}
            <section className="bg-zinc-800 py-10 px-4 sm:px-5 flex-1">
                <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold font-ubuntu text-white">
                        Active New Fund Offerings (NFO)
                    </h2>
                    <p className="mt-3 text-lg font-ubuntu text-gray-400 max-w-2xl mx-auto">
                        Explore and invest in the latest mutual funds before they hit the open market.
                    </p>
                </div>

                {/* Search & Filter */}
                <div className="w-full max-w-5xl mx-auto mb-8">
                    <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 bg-zinc-900 rounded-2xl shadow-inner p-2 font-poppins">

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
                                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 top-full mt-1 w-full sm:w-auto bg-zinc-900 rounded-b-xl shadow-lg overflow-hidden z-50" data-aos="fade-down">
                                    {categories.map((cat) => (
                                        <div
                                            key={cat}
                                            onClick={() => { setCategory(cat); setDropdownOpen(false); }}
                                            className="px-4 py-3 hover:bg-zinc-700 cursor-pointer text-white font-semibold transition-colors whitespace-nowrap"
                                        >
                                            {cat}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Search Button */}
                        <button
                            onClick={handleSearch}
                            className="bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg w-full sm:w-auto flex-shrink-0"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Funds Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {funds.map((fund, idx) => (
                        <div key={idx} className="bg-zinc-900 shadow-lg rounded-3xl p-4 sm:p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
                            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:items-center gap-2">
                                <h3 className="text-xl sm:text-2xl font-bold text-white">{fund.name}</h3>
                                <span className={`text-sm font-bold px-3 py-2 rounded-xl text-white whitespace-nowrap ${fund.statusColor}`}>
                                    {fund.status}
                                </span>
                            </div>

                            <div className="mb-4">
                                <span className="text-base font-medium text-gray-400">Risk Level:</span>
                                <span className="ml-2 text-base font-semibold text-white">{fund.riskLevel}</span>
                            </div>

                            <div className="grow"></div>

                            <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm text-gray-400 mb-4">
                                <div>
                                    <span className="font-medium text-gray-400">Launch Date:</span>{" "}
                                    <span className="text-white">{fund.launchDate}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-400">Close Date:</span>{" "}
                                    <span className="text-white">{fund.closeDate}</span>
                                </div>
                            </div>

                            <button className="mt-auto w-full py-3 bg-green-500 text-white text-lg font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                                Invest Now
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default NFOlist;