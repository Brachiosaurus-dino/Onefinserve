import { useState } from "react";
import { Link } from "react-router-dom";
function AdminPanel() {

    const [cmapfOpen, setCmapfOpen] = useState(false);
    const [tampfOpen, setTampfOpen] = useState(false);

    return (
        <div className="min-h-screen bg-zinc-900 text-white">

            {/* 🔷 Top Navbar */}
            <div className="flex items-center justify-between px-6 py-4 bg-zinc-800 border-b border-zinc-700">

                {/* Logo */}
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    OneFinServ
                </h1>

                {/* Nav Items */}
                <div className="flex items-center gap-6">
                    <button
                        to="/"
                        className="px-6 py-3  text-white font-semibold rounded-full shadow-lg "
                    >
                        Home
                    </button>

                    {/* CMAPF Dropdown */}
                    <div className="flex space-x-4">
                        {/* CMAPF Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setCmapfOpen(!cmapfOpen);
                                    setTampfOpen(false); // close the other dropdown if open
                                }}
                                className="px-4 py-2 text-white font-semibold rounded-md hover:bg-zinc-700 transition"
                            >
                                CMAPF ▾
                            </button>

                            {cmapfOpen && (
                                <div className="absolute right-0 mt-2 w-44 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg z-50">
                                    <div className="p-2 hover:bg-zinc-700 cursor-pointer rounded-t-lg">
                                        Import Funds
                                    </div>
                                    <div className="p-2 hover:bg-zinc-700 cursor-pointer rounded-b-lg">
                                        Import Nav
                                    </div>
                                    <div className="p-2 hover:bg-zinc-700 cursor-pointer rounded-b-lg">
                                        Import Units
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* TAMPF Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setTampfOpen(!tampfOpen);
                                    setCmapfOpen(false); // close the other dropdown if open
                                }}
                                className="px-4 py-2 text-white font-semibold rounded-md hover:bg-zinc-700 transition"
                            >
                                TAMPF ▾
                            </button>

                            {tampfOpen && (
                                <div className="absolute right-0 mt-2 w-44 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg z-50">
                                    <div className="p-2 hover:bg-zinc-700 cursor-pointer rounded-t-lg">
                                        Import Funds
                                    </div>
                                    <div className="p-2 hover:bg-zinc-700 cursor-pointer rounded-b-lg">
                                        Import Nav
                                    </div>
                                    <div className="p-2 hover:bg-zinc-700 cursor-pointer rounded-b-lg">
                                        Import Units
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Home */}


                    {/* Logout */}
                    <div className="hidden xl:flex gap-4 items-center">

                        <Link
                            to="/logout"
                            className="px-6 py-3  bg-zinc-900 text-white font-semibold rounded-full shadow-lg hover:from-green-500 hover:to-green-700 transform hover:scale-115 transition-all duration-300"
                        >
                            Logout
                        </Link>
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
                        />
                    </svg>
                </div>
            </div>
            <div>
                <h1 className="text-2xl p-4 font-bold text-center">Welcome Admin</h1>
            </div>
            {/* 🔷 Main Layout */}
            <div className="flex  ">

                {/* 🧩 Main Panel */}
                <div className="w-[100%]">
                    <div className="h-full bg-zinc-800 rounded-xl p-6 shadow-lg">

                        <h1 className="text-2xl font-bold mb-4 text-green-400">
                            Dashboard
                        </h1>

                        <p className="text-zinc-300">
                            Welcome to your admin panel. Select a module from the navigation
                            or use the top menu.
                        </p>

                        {/* Example Cards */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="bg-zinc-700 p-4 rounded-lg">
                                <h3 className="text-blue-400 font-semibold">CMAPF</h3>
                                <p className="text-sm text-zinc-300">Manage CMAPF data</p>
                            </div>

                            <div className="bg-zinc-700 p-4 rounded-lg">
                                <h3 className="text-green-400 font-semibold">TAMPF</h3>
                                <p className="text-sm text-zinc-300">Analyze TAMPF metrics</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminPanel