import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Papa from "papaparse";
import { Link } from "react-router-dom";

function MutualCarousel() {
    const [sheetData, setSheetData] = useState([]);
    const marqueeRef = useRef(null);

    // Fetch CSV data from Google Sheets
    useEffect(() => {
        const url =
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vQCWKcPNj_6JhFnrJPO34inDkUMUdoTZGo1dBJpiOzl_A4mXzYqi2OjCvWB8sS-SEb1rb_y0K0upxHc/pub?output=csv";

        axios
            .get(url)
            .then((res) => {
                const parsed = Papa.parse(res.data, { header: true });
                const formatted = parsed.data.filter((row) => row["Scheme Name"]).map((row) => ({
                    title: row["Scheme Name"],
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

    // Smooth infinite marquee animation
    useEffect(() => {
        const marquee = marqueeRef.current;
        if (!marquee) return;

        let start = 0;
        const speed = 0.8; // pixels per frame
        let animationFrame;

        const step = () => {
            start -= speed;
            // Reset after half width (duplicated content)
            if (Math.abs(start) >= marquee.scrollWidth / 2) {
                start = 0;
            }
            marquee.style.transform = `translateX(${start}px)`;
            animationFrame = requestAnimationFrame(step);
        };

        animationFrame = requestAnimationFrame(step);

        return () => cancelAnimationFrame(animationFrame);
    }, [sheetData]);

    return (
        <div>
            <section className="py-10 bg-zinc-800 text-zinc-100">
                <div className="max-w-7xl mx-auto p-4">
                    <h2 className="text-4xl font-bold mb-8 text-center font-roboto">
                        Top Mutual Funds
                    </h2>

                    {/* Responsive marquee */}
                    <div className="relative overflow-x-hidden">
                        <div
                            ref={marqueeRef}
                            className="flex gap-2 sm:gap-6 flex-nowrap"
                        >
                            {[...sheetData, ...sheetData].map((fund, idx) => (
                                <div
                                    key={idx}
                                    className="shrink-0 min-w-45 sm:w-125 bg-zinc-900 p-2 sm:p-6 rounded-2xl shadow-lg flex flex-col"
                                >
                                    {/* Title */}
                                    <h3 className="text-[12px] sm:text-2xl font-semibold break-words sm:min-h-22">
                                        {fund.title}
                                    </h3>

                                    {/* NAV */}
                                    <p className="text-[10px] md:text-[15px] sm:text-md font-bold mt-1 sm:mt-6">
                                        NAV:{" "}
                                        <span className="font-light text-[10px] sm:text-base">
                                            ₹ {fund.number}
                                        </span>
                                    </p>

                                    {/* Returns */}
                                    <div className="grow pb-3">
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-3 mt-1 sm:mt-4">
                                            {fund.durations.map((d, i) => (
                                                <div
                                                    key={i}
                                                    className="bg-zinc-700 p-1 sm:p-3 rounded-lg text-center overflow-hidden"
                                                >
                                                    <p className="font-semibold text-[10px] sm:text-sm whitespace-nowrap">
                                                        {d.period}
                                                    </p>
                                                    <p className="text-green-400 text-[9px] sm:text-xs break-words">
                                                        {d.percent}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <Link
                                        to="/mutual-funds/one-time-investment"
                                        className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-2xl"
                                    >
                                        Invest Now
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <Link to='/latest-funds-list'>
                            <button className="px-8 sm:px-7 py-4 sm:py-3 cursor-pointer bg-gradient-to-r from-green-500 to-green-700 text-white font-bold uppercase rounded-full shadow-lg text-[10px] sm:text-base">
                                See More Funds
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MutualCarousel;

// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import Papa from "papaparse";
// import { Link } from "react-router-dom";

// function MutualCarousel() {
//     const [sheetData, setSheetData] = useState([]);
//     const marqueeRef = useRef(null);

//     useEffect(() => {
//         const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQCWKcPNj_6JhFnrJPO34inDkUMUdoTZGo1dBJpiOzl_A4mXzYqi2OjCvWB8sS-SEb1rb_y0K0upxHc/pub?output=csv";
//         axios.get(url).then((res) => {
//             const parsed = Papa.parse(res.data, { header: true });
//             const formatted = parsed.data.filter((row) => row["Scheme Name"]).map((row) => ({
//                 title: row["Scheme Name"],
//                 number: row["Current Nav"],
//                 durations: [
//                     { period: "1Y", percent: row["1 yr Return"] },
//                     { period: "2Y", percent: row["2 yr Return"] },
//                     { period: "3Y", percent: row["3 yr Return"] },
//                     { period: "5Y", percent: row["5 yr Return"] },
//                 ],
//             }));
//             setSheetData(formatted);
//         }).catch((err) => console.error("Error fetching CSV:", err));
//     }, []);

//     useEffect(() => {
//         const marquee = marqueeRef.current;
//         if (!marquee) return;
//         let start = 0;
//         const speed = 0.8;
//         let animationFrame;
//         const step = () => {
//             start -= speed;
//             if (Math.abs(start) >= marquee.scrollWidth / 2) start = 0;
//             marquee.style.transform = `translateX(${start}px)`;
//             animationFrame = requestAnimationFrame(step);
//         };
//         animationFrame = requestAnimationFrame(step);
//         return () => cancelAnimationFrame(animationFrame);
//     }, [sheetData]);

//     return (
//         <section className="py-10 bg-zinc-800 text-zinc-100">
//             <div className="max-w-7xl mx-auto p-4">
//                 <h2 className="text-4xl font-bold mb-8 text-center">Top Mutual Funds</h2>
//                 <div className="relative overflow-x-hidden">
//                     <div ref={marqueeRef} className="flex gap-2 sm:gap-6 flex-nowrap">
//                         {[...sheetData, ...sheetData].map((fund, idx) => (
//                             <div key={idx} className="shrink-0 min-w-45 sm:w-125 bg-zinc-900 p-2 sm:p-6 rounded-2xl flex flex-col">
//                                 <h3 className="text-[12px] sm:text-2xl font-semibold break-words sm:min-h-22">{fund.title}</h3>
//                                 <p className="text-[10px] md:text-[15px] sm:text-md font-bold mt-1 sm:mt-6">
//                                     NAV: <span className="font-light">₹ {fund.number}</span>
//                                 </p>
//                                 <div className="grow pb-3">
//                                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-3 mt-1">
//                                         {fund.durations.map((d, i) => (
//                                             <div key={i} className="bg-zinc-700 p-1 rounded-lg text-center">
//                                                 <p className="font-semibold text-[10px]">{d.period}</p>
//                                                 <p className="text-green-400 text-[9px]">{d.percent}</p>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                                 {/* Updated Link with state */}
//                                 <Link
//                                     to="/mutual-funds/one-time-investment"
//                                     state={{ fundData: fund }}
//                                     className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-2xl text-center hover:bg-green-600 transition"
//                                 >
//                                     Invest Now
//                                 </Link>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default MutualCarousel;