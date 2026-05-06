import React, { useState } from "react";
import NiftyCarousel from "./components/niftyCarousel";
import { FaBolt, FaShoppingCart, FaChartLine, FaMousePointer } from "react-icons/fa";
import Footer from "./components/footer";
import Navbar from "./components/navabr";
import MutualCarousel from "./components/mutualcrousel";
import { Link } from "react-router-dom";

function Home() {
  const [principal, setPrincipal] = useState("");
  const [monthly, setMonthly] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [returns, setReturns] = useState(null);

  const calculateSIP = () => {
    const P = parseFloat(principal);
    const M = parseFloat(monthly);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (isNaN(P) || isNaN(M) || isNaN(r) || isNaN(n)) {
      alert("Please enter valid numbers in all fields");
      return;
    }

    const fvPrincipal = P * Math.pow(1 + r, n);
    const fvMonthly = M * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalFV = fvPrincipal + fvMonthly;

    setReturns(totalFV.toFixed(2));
  };

 
    

  const columnsData = [
    { icon: <FaBolt />, title: "Instant KYC", text: "Paperless Setup" , link:"/check_kyc_status"},
    { icon: <FaShoppingCart />, title: "One Click Buy", text: "Instant Buying" , link:"/mutual-funds/one-time-investment"},
    { icon: <FaChartLine />, title: "Top Mutual Fund", text: "Find For You" , link:"/latest-funds-list"},
    { icon: <FaMousePointer />, title: "Topup Investment", text: "Easy Navigation" , link:"/mutual-funds/mutual-top"},
  ];

  return (
    <>
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
      <section>
        <NiftyCarousel />
      </section>

      {/* Mutual Funds Section */}
      <section>
       
            <MutualCarousel/>
      
      </section>

      {/* SIP Calculator Section */}
      <section className="py-10 bg-zinc-900 text-zinc-100">
        <div className="flex justify-center px-4">
          <div className="w-full max-w-lg p-8 bg-zinc-800 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-semibold mb-6 text-center">Calculate SIP Returns</h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">
                  Principal Amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg bg-zinc-700 border-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-400 text-zinc-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">
                  Monthly SIP Amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={monthly}
                  onChange={(e) => setMonthly(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg bg-zinc-700 border-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-400 text-zinc-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">
                  Interest Rate (In %) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg bg-zinc-700 border-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-400 text-zinc-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">
                  Duration in Years <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg bg-zinc-700 border-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-400 text-zinc-100"
                />
              </div>

              <button
                onClick={calculateSIP}
                className="mt-4 w-full px-6 py-2 bg-linear-to-r from-green-500 to-green-700 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
              >
                Calculate
              </button>
            </div>

            {returns && (
              <div className="mt-6 p-4 bg-zinc-700 rounded-lg text-center">
                <p className="text-lg font-semibold">
                  Estimated SIP Returns: <span className="font-bold text-green-400">₹{returns}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;