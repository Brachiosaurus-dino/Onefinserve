import { useState, useEffect } from "react"
import axios from "axios"
import Papa from "papaparse";

function Data() {

    const [sheet, setSheet] = useState([])

    useEffect(() => {
        const fetchData = () => {
            const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0XaXS0wfVTzMsRP7ZJEEO0djtLvUSFgqDYj1I1v3Kufg-S3xm0Dx-7Hn-ujhm-dfemWk0QTTSmoK4/pub?output=csv"

            axios.get(url).then((res) => {
                const parsed = Papa.parse(res.data, { header: true })
                console.log(parsed)
                setSheet(parsed.data);
            })
        }

        fetchData()

        const interval = setInterval(fetchData, 5000)

        return () => clearInterval(interval);

    }, [])

    return (
        <>
            <div className="p-4 bg-zinc-900 text-white">
                <h2 className="text-lg font-bold mb-2">Sheet Data</h2>
                <table className="min-w-full border border-zinc-700">
                    <thead>
                        <tr className="bg-zinc-800">
                            <th className="border border-zinc-700 p-2 text-left">folio_chk</th>
                            <th className="border border-zinc-700 p-2 text-left">inv_name</th>
                            <th className="border border-zinc-700 p-2 text-left">sch_name</th>
                            <th className="border border-zinc-700 p-2 text-left">clos_bal</th>
                            <th className="border border-zinc-700 p-2 text-left">rupee_bal</th>
                            <th className="border border-zinc-700 p-2 text-left">pan_no</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sheet.map((row, idx) => (
                            <tr key={idx} className="hover:bg-zinc-700">
                                <td className="border border-zinc-700 p-2">{row["foliochk"]}</td>
                                <td className="border border-zinc-700 p-2">{row["inv_name"]}</td>
                                <td className="border border-zinc-700 p-2">{row["sch_name"]}</td>
                                <td className="border border-zinc-700 p-2">{row["clos_bal"]}</td>
                                <td className="border border-zinc-700 p-2">{row["rupee_bal"]}</td>
                                {row["pan_no"] || row["joint1_pan"] || row["joint2_pan"] || row["guard_pan"] || ""}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Data