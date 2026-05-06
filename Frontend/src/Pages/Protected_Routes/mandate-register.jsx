import Navbar from "../components/navabr";
import Footer from "../components/footer";
import { FaBolt, FaShoppingCart, FaChartLine, FaMousePointer } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

const columnsData = [
    { icon: <FaBolt />, title: "Instant KYC", text: "Paperless Setup", link: "/check_kyc_status" },
    { icon: <FaShoppingCart />, title: "One Click Buy", text: "Instant Buying", link: "/mutual-funds/one-time-investment" },
    { icon: <FaChartLine />, title: "Top Mutual Fund", text: "Find For You", link: "/latest-funds-list" },
    { icon: <FaMousePointer />, title: "Topup Investment", text: "Easy Navigation", link: "/mutual-funds/mutual-top" },
];

function MandatetRegister() {

    const [client_code, setClient_code] = useState("")
    const [account_no, setAccount_no] = useState("")
    const [mandate_type, setMandate_type] = useState("")
    const [ifsc_code, setIfsc_code] = useState("")
    const [micr_code, setMicr_code] = useState("")
    const [client_name, setClient_name] = useState("")
    const [amount, setAmount] = useState("")
    const [start_date, setStart_date] = useState(null)
    const [end_date, setEnd_date] = useState(null)
    const panCard = sessionStorage.getItem("auth");
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
                    setClient_code(data.panNUM);
                }
                if (data.ifscCode) {
                    setIfsc_code(data.ifscCode);
                }
                if (data.micrNo) {
                    setMicr_code(data.micrNo);
                }
                if (data.nameper) {
                    setClient_name(data.nameper);
                }
                if (data.accNo) {
                    setAccount_no(data.accNo);
                }
            } catch (error) {
                console.error("❌ Fetch error:", error.message);
            }
        };

        fetchGetData();
    }, [panCard]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const formatDate = (date) => {
                if (!date) return null;

                const y = date.getFullYear();
                const m = String(date.getMonth() + 1).padStart(2, "0");
                const d = String(date.getDate()).padStart(2, "0");

                return `${y}-${m}-${d}`;
            };

            const mandate_data = {
                client_code, ifsc_code, micr_code, client_name, amount, mandate_type, account_no,
                start_date: formatDate(start_date),
                end_date: formatDate(end_date),
            }

            let res = await axios.post("http://localhost:5000/api/mandate", mandate_data)

            console.log(res.data)
            alert("Data Submitted Successfully.....")

        } catch (err) {
            const errors = err.response.data.errors;

            if (errors && errors.length > 0) {
                const messages = errors.map(e => e.msg).join(" | ");
                alert(messages);
            } else {
                alert("Something went wrong");
            }
        }


    }


    return (
        <div className="bg-zinc-900 min-h-screen overflow-x-hidden">
            <Navbar />

            {/* Top Features Section */}
            <section className="py-10 pt-40 bg-zinc-900 text-zinc-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 rounded-2xl">
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

            {/* Mandate Registration Form */}
            <section className="w-full flex justify-center py-10 bg-zinc-900">
                <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 bg-zinc-800 rounded-2xl shadow-xl">
                    <h2 className="text-5xl font-bold font-ubuntu bg-clip-text bg-gradient-to-r text-white drop-shadow-lg mb-6 relative inline-block text-center">
                        <span className="relative inline-block">
                            Mandate
                            <span className="absolute left-0 -bottom-3 w-full h-1 lg:bg-green-500 rounded-full"></span>
                        </span>{" "}
                        Registration
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                        {/* Row 1 */}
                        <div>
                            <label className="block text-white font-semibold mb-1">PAN No.</label>
                            <input
                                type="text"
                                placeholder="Enter PAN No"
                                name="client_code"
                                value={client_code}
                                onChange={(e) => setClient_code(e.target.value.toLocaleUpperCase())}
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div>
                            <label className="block text-white font-semibold mb-1">IFSC Code</label>
                            <input
                                type="text"
                                placeholder="Enter IFSC Code"
                                name="ifsc_code"
                                value={ifsc_code}
                                onChange={(e) => setIfsc_code(e.target.value)}
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div>
                            <label className="block text-white font-semibold mb-1">MICR No.</label>
                            <input
                                type="text"
                                placeholder="Enter MICR No."
                                name="micr_code"
                                value={micr_code}
                                onChange={(e) => setMicr_code(e.target.value)}
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>

                        {/* Row 2 */}
                        <div>
                            <label className="block text-white font-semibold mb-1">Name</label>
                            <input
                                type="text"
                                placeholder="Enter Client Name"
                                name="client_name"
                                value={client_name}
                                onChange={(e) => setClient_name(e.target.value)}
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-white font-semibold mb-1">Enach Authorization Mode</label>
                            <select
                                name="mandate_type"
                                value={mandate_type}
                                onChange={(e) => setMandate_type(e.target.value)}
                                className="w-full h-12 p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none"
                            >
                                <option value="" disabled>Enach Authorization Mode</option>
                                <option value="net_banking">Net Banking</option>
                                <option value="aadhaar">Aadhaar Card</option>
                                <option value="debit_card">Debit Card</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-7">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <label className="block text-white font-semibold mb-1">Amount</label>
                            <input
                                type="text"
                                placeholder="Amount"
                                name="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                            />
                        </div>

                        {/* Row 3 */}
                        <div className="relative">
                            <label className="block text-white font-semibold mb-1">Start Date</label>
                            <DatePicker
                                name="start_date"
                                selected={start_date}
                                onChange={(date) => setStart_date(date)}
                                placeholderText="DD/MM/YYYY"
                                dateFormat="dd/MM/yyyy"
                                showYearDropdown
                                scrollableYearDropdown
                                yearDropdownItemNumber={100}
                                className="w-full h-12 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400 text-center"
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-white font-semibold mb-1">End Date</label>
                            <DatePicker
                                name="end_date"
                                selected={end_date}
                                onChange={(date) => setEnd_date(date)}
                                placeholderText="DD/MM/YYYY"
                                dateFormat="dd/MM/yyyy"
                                showYearDropdown
                                scrollableYearDropdown
                                yearDropdownItemNumber={100}
                                className="w-full h-12 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400 text-center"
                            />
                        </div>
                        <div>
                            <label className="block text-white font-semibold mb-1">Account No.</label>
                            <input
                                type="number"
                                placeholder="Enter Account Number"
                                name="account_no"
                                value={account_no}
                                onChange={(e) => setAccount_no(e.target.value)}
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                            />
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
    );
}

export default MandatetRegister;