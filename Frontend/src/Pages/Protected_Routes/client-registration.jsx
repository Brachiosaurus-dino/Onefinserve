
import React, { useState } from "react";
import Navbar from "../components/navabr";
import Footer from "../components/footer";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { FaBolt, FaShoppingCart, FaChartLine, FaMousePointer } from "react-icons/fa";
import axios from "axios";

const columnsData = [
    { icon: <FaBolt />, title: "Instant KYC", text: "Paperless Setup", link: "/check_kyc_status" },
    { icon: <FaShoppingCart />, title: "One Click Buy", text: "Instant Buying", link: "/mutual-funds/one-time-investment" },
    { icon: <FaChartLine />, title: "Top Mutual Fund", text: "Find For You", link: "/latest-funds-list" },
    { icon: <FaMousePointer />, title: "Topup Investment", text: "Easy Navigation", link: "/mutual-funds/mutual-top" },
];

function Otr_startInvsest() {

    const navigate = useNavigate()
    const [formdata, setFormdata] = useState({
        firstApplicantPanNo: "",
        tax_status: "",
        holdingNature: "",
        phFirstName: "",
        phMiddleName: "",
        phLastName: "",
        firstApplicantDOB: null,
        firstApplicantGendar: "",
        firstApplicantOccupation: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        email: "",
        indian_mobile_no: "",
        nominee_1_name: "",
        nominee_1_relationship: "",
        nominee_per_1: "",
        nomineeIdentifyType1: "",
        nomineeIdentifyNo1: "",
        nomineeDOB1: null,
        nomineeEmail1: "",
        nomineeMobile1: "",
        bankAccTypeMfd: "",
        ifsc_code_1: "",
        micrNoMfd: "",
        bankName: "",
        chequeName: "",
        bankAccNoMfd: "",
        defaultBankMfd: "",
    })

    const [page, setPage] = useState(1);
    const states = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
        "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
        "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
        "West Bengal",

        "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
    ];
    const familyRelations = ["Father", "Mother", "Father-in-law", "Mother-in-law", "Brother", "Sister",
        "Brother-in-law", "Sister-in-law", "Husband", "Wife", "Son", "Daughter", "Grandfather", "Grandmother",
        "Grandson", "Granddaughter", "Uncle", "Aunt", "Nephew", "Niece", "Cousin"
    ];
    const identity = ["AADHAAR", "DRIVING LICENSE", "PAN", "OCI/PASSPORT"];

    const inputClass =
        "w-full h-12 p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400";

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const FORM_data = {
                ...formdata,

                // convert DOBs properly
                firstApplicantDOB: formdata.firstApplicantDOB
                    ? formdata.firstApplicantDOB.toISOString().split("T")[0]
                    : null,

                nomineeDOB1: formdata.nomineeDOB1
                    ? formdata.nomineeDOB1.toISOString().split("T")[0]
                    : null,
            };

            const res = await axios.post(
                "http://localhost:5000/api/formdata",
                FORM_data
            );

            console.log(res.data);
            alert("Data Submitted Successfully ✅");
            navigate('/investment')

        } catch (err) {
            if (err.response) {
                const data = err.response.data;

                // Zod validation errors
                if (data.errors) {
                    const messages = Object.values(data.errors)
                        .map((field) => field?._errors?.[0])
                        .filter(Boolean)
                        .join("\n");

                    alert(messages);
                }
                // Other backend errors
                else if (data.message) {
                    alert(data.message);
                }
                // Fallback
                else {
                    alert("Something went wrong");
                }

            } else {
                alert("Network error. Please try again.");
            }
        }
    };



    return (
        <div className="bg-zinc-900 min-h-screen text-white">

            {/* Navbar */}
            <Navbar />

            {/* Top Cards */}
            <section className="pt-32 pb-10">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {columnsData.map((col, index) => (
                            <div key={index} className="text-center sm:text-left">
                                <div className="relative p-4 bg-zinc-800 rounded-2xl inline-block mb-3">
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
                                    <Link to={col.link}>
                                        {React.cloneElement(col.icon, { className: "text-green-400 w-8 h-8" })}
                                    </Link>
                                </div>
                                <h3 className="font-bold">{col.title}</h3>
                                <p className="text-sm text-zinc-400">{col.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="flex justify-center pb-16 px-4">
                <div className="w-full max-w-5xl bg-zinc-800 p-8 rounded-2xl shadow-xl">

                    {/* Heading */}
                    <h2 className="text-3xl text-left md:text-5xl font-bold  mb-6">
                        One Time Registration
                    </h2>

                    {/* ================= STEP 1 ================= */}
                    {page === 1 && (
                        <form className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            <div>
                                <label className="block text-white font-semibold mb-1">Primary Holder First Name</label>
                                <input
                                    type="text"
                                    name="phFirstName"
                                    value={formdata.phFirstName}
                                    onChange={(e) => setFormdata(prev => ({ ...prev, phFirstName: e.target.value }))}
                                    placeholder="Enter First Name"
                                    className="w-full h-12 p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                                />
                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-1">Primary Holder Middle Name</label>
                                <input
                                    type="text"
                                    name="phMiddleName"
                                    value={formdata.phMiddleName}
                                    onChange={(e) => setFormdata(prev => ({ ...prev, phMiddlename: e.target.value }))}
                                    placeholder="Enter Middle Name"
                                    className="w-full p-3 h-12 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                                />
                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-1">Primary Holder Last Name</label>
                                <input
                                    type="text"
                                    name="phLastName"
                                    value={formdata.phLastName}
                                    onChange={(e) => setFormdata(prev => ({ ...prev, phLastName: e.target.value }))}
                                    placeholder="Enter Last Name"
                                    className="w-full p-3 h-12 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                                />
                            </div>

                            {/* Row 2 */}
                            <div className="relative w-full md:w-full">
                                <label className="block text-white font-semibold mb-1">Date of Birth</label>
                                <DatePicker
                                    selected={formdata.firstApplicantDOB}
                                    onChange={(date) =>
                                        setFormdata(prev => ({
                                            ...prev,
                                            firstApplicantDOB: date
                                        }))
                                    }
                                    placeholderText="DD/MM/YYYY"
                                    dateFormat="dd/MM/yyyy"
                                    showYearDropdown
                                    scrollableYearDropdown
                                    yearDropdownItemNumber={100}
                                    className="w-full h-12 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400 text-center"
                                />
                                {/* Arrow icon for visual consistency */}

                            </div>

                            <div className="relative w-full">
                                <label className="block text-white font-semibold mb-1">Gender</label>
                                <select
                                    name="firstApplicantGendar"
                                    value={formdata.firstApplicantGendar}
                                    onChange={(e) => setFormdata(prev => ({ ...prev, firstApplicantGendar: e.target.value }))}
                                    className="w-full h-12 p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none"

                                >
                                    <option value="" disabled>Select Gender</option>
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                    <option value="trans">transgender</option>
                                    <option value="other">other</option>
                                </select>
                                <div className="pointer-events-none pt-7 absolute inset-y-0 right-3 flex items-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="relative w-full">
                                <label className="block text-white font-semibold mb-1">Occupation</label>
                                <select
                                    name="firstApplicantOccupation"
                                    value={formdata.firstApplicantOccupation}
                                    onChange={(e) => setFormdata(prev => ({ ...prev, firstApplicantOccupation: e.target.value }))}
                                    className="w-full h-12 p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none"

                                >
                                    <option value="" disabled>Select Occupation</option>
                                    <option value="teacher">TEACHER</option>
                                    <option value="business">BUSINESS</option>
                                    <option value="services">SERVICES</option>
                                    <option value="professional">PROFESSIONAL</option>
                                    <option value="agriculture">AGRICULTURE</option>
                                    <option value="retired">RETIRED</option>
                                    <option value="housewife">HOUSEWIFE</option>
                                    <option value="student">STUDENT</option>
                                    <option value="others">OTHERS</option>
                                </select>
                                <div className="pointer-events-none pt-7 absolute inset-y-0 right-3 flex items-center">
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
                                        ></path>
                                    </svg>
                                </div>
                            </div>

                            <div>
                                <label className="block text-white font-semibold mb-1">PAN No.</label>
                                <input
                                    name="firstApplicantPanNo"
                                    value={formdata.firstApplicantPanNo}
                                    onChange={(e) => setFormdata(prev => ({ ...prev, firstApplicantPanNo: e.target.value }))}
                                    type="text"
                                    placeholder="Enter PAN No"
                                    className="w-full h-12 p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                                />
                            </div>

                            {/* Submit Button full width */}
                            <div className="md:col-span-3 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setPage(2)}
                                    className="lg:w-1/5 w-full bg-green-500  hover:bg-green-600 text-white font-bold p-3 rounded-lg transition"
                                >
                                    Address Details 🡆
                                </button>
                            </div>
                        </form>
                    )}

                    {/* ================= STEP 2 ================= */}
                    {page === 2 && (
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-white font-semibold mb-1" aria-required>Addresss Line 1</label>
                                <input
                                    name="address_1"
                                    value={formdata.address_1}
                                    onChange={(e) => setFormdata(prev => ({ ...prev, address_1: e.target.value }))}
                                    placeholder="Address Line 1" className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-1">Address Line 2</label>
                                <input
                                    name="address_2"
                                    value={formdata.address_2}
                                    onChange={(e) => setFormdata(prev => ({ ...prev, address_2: e.target.value }))}
                                    placeholder="Address Line 2" className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-1">Address Line 3</label>
                                <input placeholder="Address Line 3" className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-1">City</label>
                                <input
                                    name="city"
                                    value={formdata.city}
                                    onChange={(e) => setFormdata(prev => ({ ...prev, city: e.target.value }))}
                                    placeholder="City" className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-1">State</label>
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
                                        name="state"
                                        value={formdata.state}
                                        onChange={(e) => setFormdata(prev => ({ ...prev, state: e.target.value }))}
                                        className="w-full pl-4 pr-3 h-12 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none"

                                    >
                                        <option value="" disabled>State</option>
                                        {states.map((state, i) => (
                                            <option key={i} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-1">Pincode</label>
                                <input
                                    name="pincode"
                                    value={formdata.pincode}
                                    onChange={(e) => setFormdata(prev => ({ ...prev, pincode: e.target.value }))}
                                    placeholder="Pincode" className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-1">Country</label>
                                <input
                                    name="country"
                                    value={formdata.country}
                                    onChange={(e) => setFormdata(prev => ({ ...prev, country: e.target.value }))}
                                    className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formdata.email}
                                    onChange={(e) => setFormdata(prev => ({ ...prev, email: e.target.value }))}
                                    placeholder="Enter email"
                                    className="w-full p-3 h-12 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                                />
                            </div>

                            <div className="md:col-span-3 flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setPage(1)}
                                    className="bg-gray-500 px-6 py-3 font-bold rounded-lg"
                                >
                                    ← Back
                                </button>

                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-600 px-6 py-3 font-bold rounded-lg"
                                    onClick={() => setPage(3)}
                                >
                                    Nominee Details 🡆
                                </button>
                            </div>
                        </form>
                    )}
                    {page === 3 && (
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-white font-semibold mb-1" aria-required>Nominee Name</label>
                                <input
                                    name="nominee_1_name"
                                    value={formdata.nominee_1_name}
                                    onChange={(e) => setFormdata(prev => ({ ...prev, nominee_1_name: e.target.value }))}
                                    placeholder="Address Line 1" className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-1 ">Nominee Relation</label>
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
                                        name="nominee_name_1"
                                        value={formdata.nominee_1_relationship}
                                        onChange={(e) => setFormdata(prev => ({ ...prev, nominee_1_relationship: e.target.value }))}
                                        className="w-full pl-4 pr-3 h-12 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none"

                                    >
                                        <option value="" disabled>Nominee relation</option>
                                        {familyRelations.map((relation, i) => (
                                            <option key={i} value={relation}>{relation}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-1">Nominee Percentage(%)</label>
                                <input
                                    name="nominee_per_1"
                                    value={formdata.nominee_per_1}
                                    onChange={(e) => setFormdata(prev => ({ ...prev, nominee_per_1: e.target.value }))}
                                    placeholder="Nominee Percentage(%)" className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-1">Nominee Identity Type</label>
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
                                        name="nomineeIdentifyNo1"
                                        value={formdata.nomineeIdentifyNo1}
                                        onChange={(e) => setFormdata(prev => ({ ...prev, nomineeIdentifyNo1: e.target.value }))}
                                        className="w-full pl-4 pr-3 h-12 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none"

                                    >
                                        <option value="" disabled>Nominee relation</option>
                                        {identity.map((show, i) => (
                                            <option key={i} value={show}>{show}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="relative w-full md:w-full">
                                <label className="block text-white font-semibold mb-1">Date of Birth</label>
                                <DatePicker
                                    selected={formdata.nomineeDOB1}
                                    onChange={(date) =>
                                        setFormdata(prev => ({
                                            ...prev,
                                            nomineeDOB1: date
                                        }))
                                    }
                                    placeholderText="DD/MM/YYYY"
                                    dateFormat="dd/MM/yyyy"
                                    showYearDropdown
                                    scrollableYearDropdown
                                    yearDropdownItemNumber={100}
                                    className="w-full h-12 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400 text-center"
                                />
                                {/* Arrow icon for visual consistency */}

                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-1">Country</label>
                                <input
                                    name=""
                                    value={formdata.nomi}
                                    className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-1">Nominee Email</label>
                                <input
                                    name="nomineeEmail1"
                                    value={formdata.nomineeEmail1}
                                    onChange={(e) => setFormdata(prev => ({ ...prev, nomineeEmail1: e.target.value }))}
                                    type="email"
                                    placeholder="Enter email"
                                    className="w-full p-3 h-12 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                                />
                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-1">Nominee Mobile Number</label>
                                <input
                                    name=".nomineeMobile1"
                                    value={formdata.nomineeMobile1}
                                    onChange={(e) => setFormdata(prev => ({ ...prev, nomineeMobile1: e.target.value }))}
                                    type="number"
                                    placeholder="Enter Mobile Number"
                                    className="w-full p-3 h-12 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                                />
                            </div>

                            <div className="md:col-span-3 flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setPage(2)}
                                    className="bg-gray-500 px-6 py-3 font-bold rounded-lg"
                                >
                                    ← Back
                                </button>

                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-600 px-6 py-3 font-bold rounded-lg"
                                    onClick={() => setPage(4)}
                                >
                                    Bank Details 🡆
                                </button>
                            </div>
                        </form>
                    )}
                    {page === 4 && (
                        <form onSubmit={handleSubmit} >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="relative w-full">
                                    <label className="block text-white font-semibold mb-1">Account Type</label>
                                    <select
                                        name="bankAccTypeMfd"
                                        value={formdata.bankAccTypeMfd}
                                        onChange={(e) =>
                                            setFormdata(prev => ({ ...prev, bankAccTypeMfd: e.target.value }))
                                        }
                                        className="w-full h-12 p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none"
                                    >
                                        <option value="" disabled>Select Account Type</option>
                                        <option value="SAVING">SAVING</option>
                                        <option value="CURRENT">CURRENT</option>
                                    </select>

                                    <div className="pointer-events-none pt-7 absolute inset-y-0 right-3 flex items-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-1">NEFT/Ifsc Code</label>
                                    <input
                                        name="ifsc_code_1"
                                        value={formdata.ifsc_code_1}
                                        onChange={(e) => setFormdata(prev => ({ ...prev, ifsc_code_1: e.target.value }))}
                                        placeholder="NEFT/Ifsc Code" className={inputClass} />
                                </div>
                                <div>
                                    <label className="block text-white font-semibold mb-1">MICR No.</label>
                                    <input
                                        name="micrNoMfd"
                                        value={formdata.micrNoMfd}
                                        onChange={(e) => setFormdata(prev => ({ ...prev, micrNoMfd: e.target.value }))}
                                        placeholder="Micr No." className={inputClass} />
                                </div>


                                <div>
                                    <label className="block text-white font-semibold mb-1">Bank Name</label>
                                    <input
                                        name="bankName"
                                        value={formdata.bankName}
                                        onChange={(e) => setFormdata(prev => ({ ...prev, bankName: e.target.value }))}
                                        placeholder="Bank Name" className={inputClass} />
                                </div>
                                <div>
                                    <label className="block text-white font-semibold mb-1">Cheaque Name</label>
                                    <input
                                        name="chequeName"
                                        value={formdata.chequeName}
                                        onChange={(e) => setFormdata(prev => ({ ...prev, chequeName: e.target.value }))}
                                        placeholder="Cheaque Name" className={inputClass} />
                                </div>
                                <div>
                                    <label className="block text-white font-semibold mb-1">Account No.</label>
                                    <input
                                        name="bankAccNomfd"
                                        value={formdata.bankAccNoMfd}
                                        onChange={(e) => setFormdata(prev => ({ ...prev, bankAccNoMfd: e.target.value }))}
                                        placeholder="Account No." className={inputClass} />
                                </div>
                                <div className="relative w-full">
                                    <label className="block text-white font-semibold mb-1">Default Bank</label>
                                    <select
                                        name="defaultBankMfd"
                                        value={formdata.defaultBankMfd}
                                        onChange={(e) =>
                                            setFormdata(prev => ({
                                                ...prev,
                                                defaultBankMfd: e.target.value === "true"  // convert string to boolean
                                            }))
                                        }
                                        className="w-full h-12 p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none"
                                    >
                                        <option value="" disabled>Select Option</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                    <div className="pointer-events-none pt-7 absolute inset-y-0 right-3 flex items-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <p className="pt-5 text-sm text-center">🛈 IFSC Code should be First 4 alphabetic + 0 + Last 6 alphanumeric.</p>

                            <div className="md:col-span-3 pt-6 flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setPage(3)}
                                    className="bg-gray-500 px-6 py-3 font-bold rounded-lg"
                                >
                                    ← Back
                                </button>

                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-600 px-8 py-3 font-bold rounded-lg"
                                >
                                    Submit
                                </button>
                            </div>

                        </form>

                    )}
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Otr_startInvsest;