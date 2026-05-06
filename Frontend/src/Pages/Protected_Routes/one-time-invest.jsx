import Navbar from "../components/navabr"
import { FaBolt, FaShoppingCart, FaChartLine, FaMousePointer } from "react-icons/fa";
import { Link } from "react-router-dom"
import { useEffect } from "react";
import axios from "axios";
import React, { useState } from "react";
import Footer from "../components/footer";
const columnsData = [
    { icon: <FaBolt />, title: "Instant KYC", text: "Paperless Setup", link: "/check_kyc_status" },
    { icon: <FaShoppingCart />, title: "One Click Buy", text: "Instant Buying", link: "/mutual-funds/one-time-investment" },
    { icon: <FaChartLine />, title: "Top Mutual Fund", text: "Find For You", link: "/latest-funds-list" },
    { icon: <FaMousePointer />, title: "Topup Investment", text: "Easy Navigation", link: "/mutual-funds/mutual-top" },
];

function OneTimeInvest() {
    const [pan_num, setClient_code] = useState("")
    const [order_amount, setOrder_amount] = useState("")
    const [mobile_no, setMobile] = useState("")
    const [account_no, setAccount_no] = useState("")
    const [email, setEmail] = useState("")
    const [payment_mode, setPayment_mode] = useState("")
    const [schemes, setSchemes] = useState([]);
    const [selectedAMC, setSelectedAMC] = useState("");
    const [selectedScheme, setSelectedScheme] = useState("");
    const [schemeCode, setSchemeCode] = useState(""); // <-- New state
    const [filteredSchemes, setFilteredSchemes] = useState([]);



    const amcNames = [
        "360 ONE MUTUAL FUND",
        "ABAKKUS INVESTMENT MANAGERS PVT LTD",
        "AXIS ASSET MGMT COMPANY",
        "BAJAJ FINSERV ASSET MANAGEMENT LIMITED",
        "BANDHAN MUTUAL FUND",
        "BANK OF INDIA MUTUAL FUND",
        "BARODA BNP PARIBAS ASSET MANAGEMENT INDIA PVT LTD",
        "BIRLA SUNLIFE AMC",
        "CANARA ROBECO ASSET MGMT",
        "DSP INVESTMENT MANAGERS FUND",
        "EDELWEISS ASSET MGMT CO LTD",
        "FRANKLIN TEMPLETON AMC",
        "GROWW MUTUAL FUND",
        "HDFC AMC",
        "HELIOS CAPITAL ASSET MANAGEMENT INDIA PVT LTD",
        "HSBC MUTUAL FUND",
        "ICICI PRUDENTIAL MUTUAL FUND",
        "INVESCO ASSET MGMT",
        "ITI MUTUAL FUND",
        "JM FINANCIAL MUTUAL FUND",
        "KOTAK MAHINDRA MF",
        "LIC MUTUAL FUND",
        "MAHINDRA MUTUAL FUND",
        "MIRAE ASSET MUTUAL FUND",
        "MOTILAL OSWAL AMC LIMITED",
        "NAVI AMC LIMITED",
        "NIPPON INDIA MUTUAL FUND",
        "NJ MUTUAL FUND",
        "OLD BRIDGE ASSET MANAGEMENT COMPANY LIMITED",
        "PGIM INDIA MUTUAL FUND",
        "PPFAS MUTUAL FUND",
        "QUANT MUTUAL FUND",
        "QUANTUM MUTUAL FUND",
        "SAMCO MUTUAL FUND",
        "SBI AMC",
        "SHRIRAM ASSET MANAGEMENT COMPANY LIMITED",
        "SUNDARAM MUTUAL FUND",
        "TATA AMC",
        "TAURUS ASSET MGMT CO LTD",
        "TRUST MUTUAL FUND",
        "UNION MUTUAL FUND",
        "UTI ASSET MANAGMENT CO LTD",
        "WEALTH COMPANY ASSET MANAGEMENT PVT LTD",
        "WHITEOAK CAPITAL ASSET MANAGEMENT LIMITED"
    ];
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
                    if (data.accNo) {
                        setAccount_no(data.accNo);
                    }
                    if (data.email) {
                        setEmail(data.email);
                    }
                    if (data.mob_num) {
                        setMobile(data.mob_num);
                    }
    
                } catch (error) {
                    console.error("❌ Fetch error:", error.message);
                }
            };
    
            fetchGetData();
        }, [panCard]);

    useEffect(() => {
        fetch("/scheme-names.html")
            .then((res) => res.text())
            .then((htmlString) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlString, "text/html");
                const options = Array.from(doc.querySelectorAll("option"));

                const allSchemes = options
                    .map((opt) => ({
                        id: opt.value,
                        name: opt.textContent.trim(),
                        amcCode: opt.id.toLowerCase()
                    }))
                    .filter((scheme) => {
                        const name = scheme.name.toUpperCase();
                        const isGrowth = /GROWTH|REGULAR GROWTH|GROWTH PLAN/i.test(name);
                        const isL0L1 = scheme.name.includes("-L0") || scheme.name.includes("-L1");
                        return isGrowth && !isL0L1;
                    });

                setSchemes(allSchemes);
            });
    }, []);

    useEffect(() => {
        if (!selectedAMC) {
            setFilteredSchemes([]);
            setSelectedScheme("");
            return;
        }

        const specialMappings = {
            "360 ONE MUTUAL FUND SIF": "360-sif",
            "360 ONE MUTUAL FUND": "360",
            "BANK OF INDIA MUTUAL FUND": "bank-of-india",
            "BARODA BNP PARIBAS ASSET MANAGEMENT INDIA PVT LTD": "barodha",
            "BANDHAN MUTUAL FUND SIF": "bandhan-sif",
            "BANDHAN MUTUAL FUND": "bandhan",
            "EDELWEISS ASSET MGMT CO LTD SIF": "edelweiss-sif",
            "EDELWEISS ASSET MGMT CO LTD": "edelweiss",
            "ITI MUTUAL FUND SIF": "iti-sif",
            "ITI MUTUAL FUND": "iti",
            "JM FINANCIAL MUTUAL FUND": "jm",
            "OLD BRIDGE ASSET MANAGEMENT COMPANY LIMITED": "old",
            "SBI AMC SIF": "sbi-sif",
            "SBI AMC": "sbi",
            "TATA MUTUAL FUND SIF": "tata-sif",
            "TATA AMC": "tata",
            "TAURUS ASSET MGMT CO LTD": "tarus",
            "BAJAJ FINSERV ASSET MANAGEMENT LIMITED": "bajaj",
        };

        const amcCode = specialMappings[selectedAMC] || selectedAMC.split(" ")[0].toLowerCase();
        const filtered = schemes.filter((s) => s.amcCode === amcCode);
        setFilteredSchemes(filtered);
        setSelectedScheme("");
    }, [selectedAMC, schemes]);



    const handleSchemeChange = (e) => {
        const selectedId = e.target.value;
        setSelectedScheme(selectedId);

        // Extract scheme code from the beginning of the scheme name
        const schemeObj = filteredSchemes.find((s) => s.id === selectedId);
        if (schemeObj) {
            // Take everything from start until first " - " (safe for multiple dashes)
            const codeMatch = schemeObj.name.match(/^[A-Z0-9\-]+/);
            const code = codeMatch ? codeMatch[0] : "";
            setSchemeCode(code);
        } else {
            setSchemeCode("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Find the selected scheme object
            const schemeObj = filteredSchemes.find(s => s.id === selectedScheme);

            const quick_data = {
                pan_num,
                amc_name: selectedAMC,             // AMC Name
                scheme_id: selectedScheme,         // Scheme ID
                scheme_name: schemeObj ? schemeObj.name : "", // <-- Add this
                scheme_code_isin: schemeCode,      // Scheme Code / ISIN
                order_amount,
                account_no,
                mobile_no,
                email,
                payment_mode
            };

            let res = await axios.post("http://localhost:5000/api/quick_order", quick_data);

            console.log(res.data);
            alert("Data Submitted Successfully!");
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors && errors.length > 0) {
                const messages = errors.map(e => e.msg).join(" | ");
                alert(messages);
            } else {
                alert("Something went wrong");
            }
        }
    };



    return (
        <div className="bg-zinc-900">
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

            <section className="px-4">
                <div className="max-w-6xl mx-auto p-8 bg-zinc-800 w-full rounded-2xl shadow-xl">
                    <h2 className="text-5xl font-bold font-ubuntu  bg-clip-text bg-gradient-to-r text-white drop-shadow-lg mb-6 relative inline-block">
                        Quick Order
                        <span className="absolute left-0 -bottom-4 w-33 h-1  lg:bg-green-500  rounded-full"></span>
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* PAN No */}
                        <div>
                            <label className="block text-white font-semibold mb-1">PAN No.</label>
                            <input type="text"
                                name="pan_num"
                                value={pan_num}
                                onChange={(e) => setClient_code(e.target.value.toUpperCase())}
                                placeholder="Enter PAN No"
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400" />
                        </div>

                        {/* AMC Name */}
                        {/* <div className="relative">
                            <label className="block text-white font-semibold mb-1">AMC Name</label>
                            <select className="w-full p-3 pr-10 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none">
                                <option>Select AMC Name</option>
                              
                            </select>
                           
                            <div className="pointer-events-none absolute inset-y-0 right-3 top-7 flex items-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div> */}

                        <div>
                            <label className="block text-white font-semibold mb-1">Select AMC</label>
                            <div className="relative">
                                {/* Left arrow */}
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                {/* Dropdown */}
                                <select
                                    name="amc"
                                    id="amc"
                                    value={selectedAMC}
                                    onChange={(e) => setSelectedAMC(e.target.value)}
                                    className="w-full pl-4 pr-3 h-12 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none"

                                >
                                    <option value="">--Select AMC--</option>
                                    {amcNames.map((amc) => (
                                        <option key={amc} value={amc}>{amc}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Scheme Name */}
                        <div>
                            <label className="block text-white font-semibold mb-1">Select Scheme</label>
                            <div className="relative">
                                {/* Dropdown arrow */}
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>

                                {/* Dropdown */}
                                <select
                                    name="scheme"
                                    id="scheme"
                                    value={selectedScheme}
                                    onChange={handleSchemeChange} // Only one onChange needed
                                    className="w-full pl-4 pr-10 h-12 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none"
                                >
                                    <option value="">--Select Scheme--</option>
                                    {filteredSchemes.map((scheme) => (
                                        <option key={scheme.id} value={scheme.id}>
                                            {scheme.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        {/* Scheme Code / ISIN */}
                        <div>
                            <label className="block text-white font-semibold mb-1">
                                Scheme Code / ISIN
                            </label>

                            {schemeCode ? (
                                <p className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700">
                                    {schemeCode}
                                </p>
                            ) : (
                                <p className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700">
                                    -- Not Selected --
                                </p>
                            )}
                        </div>

                        {/* Order Amount */}
                        <div>
                            <label className="block text-white font-semibold mb-1">Order Amount *</label>
                            <input type="number"
                                name="order_amount"
                                value={order_amount} onChange={(e) => setOrder_amount(e.target.value)}
                                placeholder="Enter Order Amount"
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400" />
                        </div>

                        {/* Account No */}
                        <div>
                            <label className="block text-white font-semibold mb-1">Account No.</label>
                            <input type="text"
                                name="account_no"
                                value={account_no}
                                onChange={(e) => setAccount_no(e.target.value)}
                                placeholder="Account No."
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700" />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-white font-semibold mb-1">Email</label>
                            <input type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700" />
                        </div>

                        {/* Mobile No */}
                        <div>
                            <label className="block text-white font-semibold mb-1">Mobile No.</label>
                            <input type="text"
                                name="mobile_no"
                                value={mobile_no}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="Mobile Number"
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700" />
                        </div>

                        {/* Payment Mode */}
                        {/* <div className="relative">
                            <label className="block text-white font-semibold mb-1">Payement Mode</label>
                            <select className="w-full p-3 pr-10 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none">
                                <option>Select Payment mode</option> */}
                        {/* Add your options here */}
                        {/* </select> */}
                        {/* Optional custom arrow */}
                        {/* <div className="pointer-events-none absolute inset-y-0 right-3 top-7 flex items-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div> */}
                        <div className="relative w-full">
                            <label className="block text-white font-semibold mb-1">Payment Mode</label>
                            <select
                                name="firstApplicantGendar"
                                value={payment_mode}
                                onChange={(e) => setPayment_mode(e.target.value)}
                                className="w-full h-12 p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none"

                            >
                                <option value="" disabled>Payment Mode</option>
                                <option value="net_banking">CHEAQUE</option>
                                <option value="aadhaar">MANDATE</option>
                                <option value="UPI">UPI</option>
                                <option value="NEFT / RTGS">NEFT / RTGS</option>
                                <option value="NET BANKING">NET BANKING</option>
                            </select>
                            <div className="pointer-events-none pt-7 absolute inset-y-0 right-3 flex items-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                        <div>

                        </div>

                        {/* Submit Button spans full width */}
                        <div className="md:col-span-3  flex justify-center">
                            <button type="submit" className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-semibold p-3 rounded-lg transition">
                                Submit
                            </button>
                        </div>

                    </form>
                </div>
            </section>
            <div className="pt-20">
                <Footer />
            </div>

        </div>
    )
}

export default OneTimeInvest


// import Navbar from "../components/navabr";
// import { FaBolt, FaShoppingCart, FaChartLine, FaMousePointer } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom"; // Import useLocation
// import { useEffect, useState } from "react";
// import axios from "axios";
// import React from "react";
// import Footer from "../components/footer";

// const amcNames = [
//     "360 ONE MUTUAL FUND", "AXIS ASSET MGMT COMPANY", "BAJAJ FINSERV ASSET MANAGEMENT LIMITED",
//     "BANDHAN MUTUAL FUND", "BANK OF INDIA MUTUAL FUND", "BIRLA SUNLIFE AMC", "HDFC AMC",
//     "ICICI PRUDENTIAL MUTUAL FUND", "KOTAK MAHINDRA MF", "NIPPON INDIA MUTUAL FUND", 
//     "SBI AMC", "TATA AMC", "UTI ASSET MANAGMENT CO LTD", "OLD BRIDGE ASSET MANAGEMENT COMPANY LIMITED"
//     // ... add others as needed
// ];

// function OneTimeInvest() {
//     const location = useLocation(); // Hook to get data from Link state
//     const [pan_num, setClient_code] = useState("");
//     const [order_amount, setOrder_amount] = useState("");
//     const [mobile_no, setMobile] = useState("");
//     const [account_no, setAccount_no] = useState("");
//     const [email, setEmail] = useState("");
//     const [payment_mode, setPayment_mode] = useState("");
//     const [schemes, setSchemes] = useState([]);
//     const [selectedAMC, setSelectedAMC] = useState("");
//     const [selectedScheme, setSelectedScheme] = useState("");
//     const [schemeCode, setSchemeCode] = useState("");
//     const [filteredSchemes, setFilteredSchemes] = useState([]);

//     // Fetch schemes from HTML file
//     useEffect(() => {
//         fetch("/scheme-names.html")
//             .then((res) => res.text())
//             .then((htmlString) => {
//                 const parser = new DOMParser();
//                 const doc = parser.parseFromString(htmlString, "text/html");
//                 const options = Array.from(doc.querySelectorAll("option"));
//                 const allSchemes = options.map((opt) => ({
//                     id: opt.value,
//                     name: opt.textContent.trim(),
//                     amcCode: opt.id.toLowerCase()
//                 })).filter((scheme) => {
//                     const name = scheme.name.toUpperCase();
//                     return /GROWTH|REGULAR GROWTH/i.test(name) && !name.includes("-L0");
//                 });
//                 setSchemes(allSchemes);
//             });
//     }, []);

//     // AUTO-FILL LOGIC: Runs when schemes load or location state changes
//     useEffect(() => {
//         if (location.state?.fundData && schemes.length > 0) {
//             const fund = location.state.fundData;
            
//             // Try to find the scheme that matches the title from the carousel
//             const matchedScheme = schemes.find(s => 
//                 s.name.toUpperCase().includes(fund.title.toUpperCase())
//             );

//             if (matchedScheme) {
//                 // 1. Set the AMC Name (matching based on the first word of the amcCode)
//                 const matchedAMC = amcNames.find(amc => 
//                     amc.toLowerCase().includes(matchedScheme.amcCode.split('-')[0])
//                 );
//                 if (matchedAMC) setSelectedAMC(matchedAMC);

//                 // 2. Set the Scheme ID and Code
//                 setSelectedScheme(matchedScheme.id);
//                 const codeMatch = matchedScheme.name.match(/^[A-Z0-9\-]+/);
//                 setSchemeCode(codeMatch ? codeMatch[0] : "");
//             }
//         }
//     }, [location.state, schemes]);

//     // Handle manual AMC changes
//     useEffect(() => {
//         if (!selectedAMC) { setFilteredSchemes([]); return; }
//         const specialMappings = { "360 ONE MUTUAL FUND": "360", "SBI AMC": "sbi", "TATA AMC": "tata" };
//         const amcCode = specialMappings[selectedAMC] || selectedAMC.split(" ")[0].toLowerCase();
//         setFilteredSchemes(schemes.filter((s) => s.amcCode === amcCode));
//     }, [selectedAMC, schemes]);

//     const handleSchemeChange = (e) => {
//         const id = e.target.value;
//         setSelectedScheme(id);
//         const schemeObj = schemes.find((s) => s.id === id);
//         if (schemeObj) {
//             const codeMatch = schemeObj.name.match(/^[A-Z0-9\-]+/);
//             setSchemeCode(codeMatch ? codeMatch[0] : "");
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const schemeObj = schemes.find(s => s.id === selectedScheme);
//         const quick_data = { pan_num, amc_name: selectedAMC, scheme_id: selectedScheme, 
//                            scheme_name: schemeObj?.name, scheme_code_isin: schemeCode, 
//                            order_amount, account_no, mobile_no, email, payment_mode };
        
//         try {
//             await axios.post("http://localhost:5000/api/quick_order", quick_data);
//             alert("Success!");
//         } catch (err) { alert("Error submitting"); }
//     };

//     return (
//         <div className="bg-zinc-900 min-h-screen text-white">
//             <Navbar />
//             <div className="max-w-6xl mx-auto p-8 pt-40">
//                 <h2 className="text-4xl font-bold mb-10 border-b-4 border-green-500 inline-block">Quick Order</h2>
//                 <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-zinc-800 p-8 rounded-2xl">
                    
//                     {/* PAN */}
//                     <div>
//                         <label className="block mb-1 font-semibold">PAN No.</label>
//                         <input type="text" value={pan_num} onChange={(e) => setClient_code(e.target.value.toUpperCase())} className="w-full p-3 rounded bg-zinc-900 border border-zinc-700" />
//                     </div>

//                     {/* AMC Dropdown */}
//                     <div>
//                         <label className="block mb-1 font-semibold">Select AMC</label>
//                         <select value={selectedAMC} onChange={(e) => setSelectedAMC(e.target.value)} className="w-full p-3 rounded bg-zinc-900 border border-zinc-700">
//                             <option value="">--Select AMC--</option>
//                             {amcNames.map(amc => <option key={amc} value={amc}>{amc}</option>)}
//                         </select>
//                     </div>

//                     {/* Scheme Dropdown */}
//                     <div>
//                         <label className="block mb-1 font-semibold">Select Scheme</label>
//                         <select value={selectedScheme} onChange={handleSchemeChange} className="w-full p-3 rounded bg-zinc-900 border border-zinc-700">
//                             <option value="">--Select Scheme--</option>
//                             {(filteredSchemes.length > 0 ? filteredSchemes : schemes).map(s => (
//                                 <option key={s.id} value={s.id}>{s.name}</option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* ISIN Display */}
//                     <div>
//                         <label className="block mb-1 font-semibold">Scheme Code / ISIN</label>
//                         <div className="p-3 rounded bg-zinc-700 text-green-400">{schemeCode || "--"}</div>
//                     </div>

//                     {/* Amount */}
//                     <div>
//                         <label className="block mb-1 font-semibold">Order Amount</label>
//                         <input type="number" value={order_amount} onChange={(e) => setOrder_amount(e.target.value)} className="w-full p-3 rounded bg-zinc-900 border border-zinc-700" />
//                     </div>

//                     {/* Submit */}
//                     <div className="md:col-span-3 flex justify-center mt-6">
//                         <button type="submit" className="bg-green-500 px-10 py-3 rounded-xl font-bold hover:bg-green-600 transition">Submit Order</button>
//                     </div>
//                 </form>
//             </div>
//             <Footer />
//         </div>
//     );
// }

// export default OneTimeInvest;