import Navbar from "./components/navabr";
import { FaBolt, FaShoppingCart, FaChartLine, FaMousePointer } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Footer from "./components/footer";
import axios from "axios";
import { Link } from "react-router-dom";

function Kyc() {
    const [full_name, setFullName] = useState("");
    const [mobile_no, setMobile] = useState("");
    const [pan, setPan] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const panCard = sessionStorage.getItem("auth");
    console.log(panCard)

    // Fetch data when component mounts OR when pan changes
    // useEffect(() => {

    //     const fetchGetData = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await fetch('http://localhost:5000/api/getdata', {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify({ pan: panCard })
    //             });

    //             if (!response.ok) throw new Error(`HTTP ${response.status}`);

    //             const data = await response.json();
    //             console.log("✅ Data fetched:", data);
    //             setResult(data);
    //             if (data.full_name) {
    //                 setFullName(data.full_name);
    //             }
    //             if (data.mobile_no) {
    //                 setMobile(data.mobile_no);
    //             }
    //             if (data.pan) {
    //                 setPan(data.pan);
    //             } else if (data.pan_no) {
    //                 setPan(data.pan_no);
    //             } else {
    //                 setPan(panCard);
    //             }
    //         } catch (error) {
    //             console.error("❌ Fetch error:", error.message);
    //             setResult({ error: error.message });
    //         }
    //         setLoading(false);
    //     };

    //     fetchGetData();
    // }, [panCard]); // Re-run when pan or panCard changes

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const KycData = { full_name, mobile_no, pan_no: pan };

            const res = await axios.post("http://localhost:5000/api/check_kyc", KycData);
            console.log(res.data);
            alert("The Data submitted successfully");
        } catch (err) {
            if (err.response) {
                const message = err.response.data.message || "Error";
                const id = err.response.data.id !== undefined ? err.response.data.id : "";
                alert(`${message} ${id ? "| " + id : ""}`);
            } else {
                alert("Error submitting form");
            }
        }
    };

    const columnsData = [
        { icon: <FaBolt />, title: "Instant KYC", text: "Paperless Setup", link: "/check_kyc_status" },
        { icon: <FaShoppingCart />, title: "One Click Buy", text: "Instant Buying", link: "/mutual-funds/one-time-investment" },
        { icon: <FaChartLine />, title: "Top Mutual Fund", text: "Find For You", link: "/latest-funds-list" },
        { icon: <FaMousePointer />, title: "Topup Investment", text: "Easy Navigation", link: "/mutual-funds/mutual-top" },
    ];

    return (
        <>
            <Navbar />
            <section className="py-10 pt-40 bg-zinc-900 text-zinc-100">
                <div className="max-w-6xl mx-auto p-6 rounded-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

            <section className="">
                <div className="bg-zinc-900 px-5">
                    <h1 className="text-center pt-5 text-white text-5xl font-bold font-ubuntu">Check KYC Status</h1>
                    <div className="py-16 flex items-center justify-center bg-zinc-900">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-wrap gap-4 p-6 bg-zinc-800 rounded-xl shadow-lg"
                        >
                            <input
                                type="text"
                                placeholder="Full Name"
                                name="full_name"
                                value={full_name}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="px-4 py-2 rounded-md font-bold text-lg text-white bg-zinc-700 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                            <input
                                type="tel"
                                placeholder="Mobile Number"
                                name="mobile_no"
                                value={mobile_no}
                                onChange={(e) => setMobile(e.target.value)}
                                pattern="[0-9]{10}"
                                maxLength={10}
                                required
                                className="px-4 py-2 rounded-md font-bold text-lg text-white bg-zinc-700 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                            <input
                                type="text"
                                placeholder="PAN Number"
                                value={pan}
                                onChange={(e) => setPan(e.target.value)}
                                className="px-4 py-2 rounded-md font-bold text-lg text-white bg-zinc-700 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-600"
                            />

                            <button
                                type="submit"
                                className="w-2/3 sm:w-auto px-6 py-2 rounded-md font-bold text-lg text-white bg-green-600 hover:bg-blue-600 transition-all mx-auto"
                            >
                                Check Status
                            </button>
                        </form>


                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Kyc;