import Navbar from "../components/navabr"
import { FaBolt, FaShoppingCart, FaChartLine, FaMousePointer, FaMoneyBillWave, FaCalendarPlus, FaPlusCircle, FaGift } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";
import Footer from "../components/footer";
function Invest() {

  const columnsData = [
    { icon: <FaBolt />, title: "Instant KYC", text: "Paperless Setup" , link:"/check_kyc_status"},
    { icon: <FaShoppingCart />, title: "One Click Buy", text: "Instant Buying" , link:"/mutual-funds/one-time-investment"},
    { icon: <FaChartLine />, title: "Top Mutual Fund", text: "Find For You" , link:"/latest-funds-list"},
    { icon: <FaMousePointer />, title: "Topup Investment", text: "Easy Navigation" , link:"/mutual-funds/mutual-top"},
  ];

    const boxes = [
        { icon: <FaMoneyBillWave size={40} />, text: "One Time Investment", button: "Invest Now", link: "/mutual-funds/one-time-investment" },
        { icon: <FaCalendarPlus size={40} />, text: "Start SIP", button: "Start SIP" ,link:"/mutual-funds/mandate-registration"  },
        { icon: <FaPlusCircle size={40} />, text: "SIP Top-Up", button: "Topup Sip" ,link:"/mutual-funds/topUp"},
        { icon: <FaGift size={40} />, text: "New Fund Offer (NFO)", button: "View NFO",link :"/nfo-list" },
    ];

    return (
        <div className="bg-zinc-800 ">
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

            <section>
                <div className="max-w-6xl pb-5 bg-zinc-800 mx-auto p-6">
                    <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between gap-6">
                        {boxes.map((col, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center bg-gradient-to-br bg-zinc-900 p-6 rounded-3xl shadow-xl w-full sm:w-1/2 md:w-1/4 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                            >
                                {/* Icon */}
                                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-900 mb-4 transition group-hover:bg-green-800">
                                    <Link to={col.link}>
                                        {React.cloneElement(col.icon, {
                                            className: "text-green-400 w-10 h-10 transition duration-300 group-hover:text-green-300",
                                        })}
                                    </Link>
                                </div>

                                {/* Text */}
                                <p className="text-white font-ubuntu font-bold text-2xl mb-6 min-h-[60px]">{col.text}</p>

                                {/* Button */}
                                <Link
                                    to={col.link}
                                    className="mt-auto px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-500 hover:scale-105 transition transform duration-300"
                                >
                                    {col.button}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>

    )
}

export default Invest