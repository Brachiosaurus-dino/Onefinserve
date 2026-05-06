import Navbar from "../components/navabr"
import { FaBolt, FaShoppingCart, FaChartLine, FaMousePointer } from "react-icons/fa";
import { Link } from "react-router-dom";
import Papa from 'papaparse'
import axios from "axios";
import React from "react";
import Footer from "../components/footer";
import { useState, useEffect } from "react";



function Topup() {

    const columnsData = [
        { icon: <FaBolt />, title: "Instant KYC", text: "Paperless Setup", link: "/check_kyc_status" },
        { icon: <FaShoppingCart />, title: "One Click Buy", text: "Instant Buying", link: "/mutual-funds/one-time-investment" },
        { icon: <FaChartLine />, title: "Top Mutual Fund", text: "Find For You", link: "/latest-funds-list" },
        { icon: <FaMousePointer />, title: "Topup Investment", text: "Easy Navigation", link: "/mutual-funds/mutual-top" },
    ];
    const [formData, setFromData] = useState({
        pan_no: "",
        account_no: "",
        email: "",
        mobile_num: "",
        scheme_name_: "",
        scheme_code_isin: "",
        folio_num: "",
        order_amount: "",
        payment_mode: ""
    })
    const [results, setResults] = useState([])
    const [sheet, setSheet] = useState([])
    const panCard = sessionStorage.getItem("auth")?.replace(/"/g, "")
    console.log(panCard)

    useEffect(() => {

        const fetchGetData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/getfromdata', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pan: panCard })
                });

                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const data = await response.json();
                console.log("✅ Data fetched:", data);
                if (data.panNUM) {
                    setFromData(prev => ({
                        ...prev, pan_no: data.panNUM
                    }))
                }
                if (data.email) {
                    setFromData(prev => ({
                        ...prev, email: data.email
                    }))
                }
                if (data.accNo) {
                    setFromData(prev => ({
                        ...prev, account_no: data.accNo
                    }))
                }
                if (data.mob_num) {
                    setFromData(prev => ({
                        ...prev, mobile_num: data.mob_num
                    }))
                }
            } catch (error) {
                console.error("❌ Fetch error:", error.message);
            }
        };

        fetchGetData();
    }, [panCard]);
    useEffect(() => {
        const fetchData = () => {
            const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0XaXS0wfVTzMsRP7ZJEEO0djtLvUSFgqDYj1I1v3Kufg-S3xm0Dx-7Hn-ujhm-dfemWk0QTTSmoK4/pub?output=csv"

            axios.get(url).then((res) => {
                const parsed = Papa.parse(res.data, { header: true })
                // console.log(parsed)
                setSheet(parsed.data);
            })
        }
        fetchData()

        // const interval = setInterval(fetchData, 5000)

        // return () => clearInterval(interval);

    }, [])
    useEffect(() => {
        if (!sheet.length || !panCard) return;

        const matches = [];

        sheet.forEach((row) => {
            // Check each PAN column separately
            ["pan_no", "joint1_pan", "joint2_pan", "guardian_pan"].forEach((col) => {
                if (row[col]?.trim().toUpperCase() === panCard.trim().toUpperCase()) {
                    // Push a new object for each match
                    matches.push({ ...row, matchedColumn: col });
                }
            });
        });
        setResults(matches)
    }, [sheet, panCard])
    console.log(results);
    // useEffect(() => {

    //     const fetchGetData = async () => {
    //         try {
    //             const response = await fetch('http://localhost:5000/api/folioData', {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify({ pan: panCard })
    //             });

    //             if (!response.ok) throw new Error(`HTTP ${response.status}`);

    //             const data = await response.json();
    //             console.log("✅ Data fetched:", data);

    //             if (data.folio) {
    //                 setFromData(prev => ({
    //                     ...prev, folio_num: data.folio
    //                 }))
    //             }

    //         } catch (error) {
    //             console.error("❌ Fetch error:", error.message);
    //         }
    //     };

    //     fetchGetData();
    // }, [panCard]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const top_data = {
                ...formData
            }

            let res = await axios.post("http://localhost:5000/api/topup", top_data)

            console.log(res.data)
            alert("Data Submitted Successfully.....")

        } catch (err) {
            if (err.response) {
                alert(err.response.data.message + " | " + err.response.data.id)
            }
            else {
                alert("Error Submitting form ")
            }
        }


    }

    return (
        <div className="bg-zinc-900 min-h-screen overflow-x-hidden">
            <Navbar />

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
            <section className="w-full flex justify-center py-10 bg-zinc-900">
                <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 bg-zinc-800 rounded-2xl shadow-xl">
                    <h2 className="text-5xl font-bold font-ubuntu bg-clip-text bg-gradient-to-r text-white drop-shadow-lg mb-6 relative inline-block text-center">
                        <span className="relative inline-block">
                            Topup
                            <span className="absolute left-0 -bottom-3 w-full h-1 lg:bg-green-500 rounded-full"></span>
                        </span>{" "}
                        Your Investment
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                        {/* Row 1 */}
                        <div>
                            <label className="block text-white font-semibold mb-1">PAN No.</label>
                            <input
                                type="text"
                                placeholder="Enter PAN No"
                                name="pan_no"
                                value={formData.pan_no}
                                onChange={(e) => setFromData(prev => ({ ...prev, pan_no: e.target.value.toUpperCase() }))}
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div>
                            <label className="block text-white font-semibold mb-1">Account No.</label>
                            <input
                                type="text"
                                placeholder="Enter Account No."
                                name="account_no"
                                value={formData.account_no}
                                onChange={(e) => setFromData(prev => ({ ...prev, account_no: e.target.value }))}
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div>
                            <label className="block text-white font-semibold mb-1">Email</label>
                            <input
                                type="text"
                                placeholder="Enter Email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFromData(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>

                        {/* Row 2 */}
                        <div>
                            <label className="block text-white font-semibold mb-1">Mobile No.</label>
                            <input
                                type="text"
                                placeholder="Enter Mobile No."
                                name="mobile_num"
                                value={formData.mobile_num}
                                onChange={(e) => setFromData(prev => ({ ...prev, mobile_num: e.target.value }))}
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div>
                            <label className="block text-white font-semibold mb-1">Scheme Name</label>
                            <input
                                type="text"
                                placeholder="Enter Scheme Name"
                                name="scheme_name_"
                                value={formData.scheme_name_}
                                onChange={(e) => setFromData(prev => ({ ...prev, scheme_name_: e.target.value }))}
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                            />
                        </div>
                        <div>
                            <label className="block text-white font-semibold mb-1">Scheme Code / ISIN</label>
                            <input
                                type="text"
                                placeholder="Enter Scheme Code / ISIN"
                                name="scheme_code_isin"
                                value={formData.scheme_code_isin}
                                onChange={(e) => setFromData(prev => ({ ...prev, scheme_code_isin: e.target.value }))}
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                            />
                        </div>

                        {/* Row 3 */}
                        <div>
                            <label className="block text-white font-semibold mb-1">
                                Folio Number
                            </label>

                            <select
                                name="folio_num"
                                value={formData.folio_num}
                                onChange={(e) =>
                                    setFromData(prev => ({
                                        ...prev,
                                        folio_num: e.target.value
                                    }))
                                }
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                            >
                                <option value="">Select Folio Number</option>

                                {results.length > 0 ? (
                                    results.map((item, index) => (
                                        <option key={index} value={item.foliochk || item.folio_num}>
                                            {item.foliochk || item.folio_num}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No folio found</option>
                                )}
                            </select>
                        </div>
                        <div>
                            <label className="block text-white font-semibold mb-1">Order Amount</label>
                            <input
                                type="text"
                                placeholder="Order Amount"
                                name="order_amount"
                                value={formData.order_amount}
                                onChange={(e) => setFromData(prev => ({ ...prev, order_amount: e.target.value }))}
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-white font-semibold mb-1">Payment Mode</label>
                            <select
                                name="payment_mode"
                                value={formData.payment_mode}
                                onChange={(e) => setFromData(prev => ({ ...prev, payment_mode: e.target.value }))}
                                className="w-full h-12 p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none"
                            >
                                <option value="" disabled>Payment Mode</option>
                                <option value="cheaque">CHEAQUE</option>
                                <option value="mandate">MANDATE</option>
                                <option value="UPI">UPI</option>
                                <option value="NEFT / RTGS">NEFT / RTGS</option>
                                <option value="NET BANKING">NET BANKING</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-7">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-3 flex justify-center">
                            <button
                                type="submit"
                                className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-semibold p-3 rounded-lg transition"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Topup