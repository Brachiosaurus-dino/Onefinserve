// import React, { useEffect, useState } from "react";

// const FetchSchemes = () => {
//     const [schemes, setSchemes] = useState([]);
//     const [amcList, setAmcList] = useState([]);
//     const [selectedAMC, setSelectedAMC] = useState("");
//     const [filteredSchemes, setFilteredSchemes] = useState([]);

//     useEffect(() => {
//         fetch("/scheme-names.html")
//             .then((res) => res.text())
//             .then((htmlString) => {
//                 const parser = new DOMParser();
//                 const doc = parser.parseFromString(htmlString, "text/html");
//                 const options = Array.from(doc.querySelectorAll("option"));

//                 const schemeList = options
//                     .map((opt) => {
//                         const name = opt.textContent.trim();
//                         return {
//                             id: opt.value,
//                             name,
//                             amc: opt.id.toUpperCase(),
//                         };
//                     })
//                     .filter((scheme) => {
//                         const name = scheme.name.toUpperCase();
//                         const isGrowth =
//                             /GROWTH|REGULAR GROWTH|GROWTH PLAN/i.test(name);
//                         const isL0L1 = name.includes("-L0") || name.includes("-L1");
//                         // Keep only Growth schemes, exclude L0/L1
//                         return isGrowth && !isL0L1;
//                     });

//                 setSchemes(schemeList);

//                 // Unique AMC list
//                 const uniqueAMCs = [
//                     ...new Set(schemeList.map((s) => s.amc)),
//                 ].sort();
//                 setAmcList(uniqueAMCs);
//             })
//             .catch((err) => console.error("Error fetching HTML:", err));
//     }, []);

//     // Filter schemes by selected AMC
//     useEffect(() => {
//         if (selectedAMC) {
//             setFilteredSchemes(
//                 schemes.filter((s) => s.amc === selectedAMC)
//             );
//         } else {
//             setFilteredSchemes([]);
//         }
//     }, [selectedAMC, schemes]);

//     return (
//         <div style={styles.container}>
//             <header style={styles.header}>
//                 <h1>Mutual Fund Scheme Selector</h1>
//                 <p>Showing only Growth schemes (excluding L0/L1)</p>
//             </header>

//             <main style={styles.main}>
//                 <div style={styles.dropdownContainer}>
//                     <label style={styles.label}>Select AMC:</label>
//                     <select
//                         style={styles.select}
//                         value={selectedAMC}
//                         onChange={(e) => setSelectedAMC(e.target.value)}
//                     >
//                         <option value="">--Select AMC--</option>
//                         {amcList.map((amc) => (
//                             <option key={amc} value={amc}>
//                                 {amc}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div style={styles.dropdownContainer}>
//                     <label style={styles.label}>Select Scheme:</label>
//                     <select style={styles.select} disabled={!selectedAMC}>
//                         <option value="">--Select Scheme--</option>
//                         {filteredSchemes.map((scheme) => (
//                             <option key={scheme.id} value={scheme.id}>
//                                 {scheme.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {selectedAMC && filteredSchemes.length > 0 && (
//                     <div style={styles.infoBox}>
//                         <h3>Number of Schemes: {filteredSchemes.length}</h3>
//                         <p>
//                             AMC: <strong>{selectedAMC}</strong>
//                         </p>
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// };

// const styles = {
//     container: { padding: "20px", fontFamily: "Arial, sans-serif" },
//     header: { textAlign: "center", marginBottom: "30px" },
//     main: { display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" },
//     dropdownContainer: { width: "50%", minWidth: "300px", display: "flex", flexDirection: "column" },
//     label: { marginBottom: "8px", fontWeight: "bold" },
//     select: { padding: "8px", borderRadius: "4px", border: "1px solid #ccc" },
//     infoBox: { marginTop: "20px", padding: "15px", width: "60%", backgroundColor: "#dff9fb", borderRadius: "8px", textAlign: "center" },
// };

// export default FetchSchemes;


import React, { useEffect, useState } from "react";

const FetchSchemes = () => {
    const [schemes, setSchemes] = useState([]);
    const [selectedAMC, setSelectedAMC] = useState("");
    const [filteredSchemes, setFilteredSchemes] = useState([]);
    const [selectedScheme, setSelectedScheme] = useState("");
    const [schemeCode, setSchemeCode] = useState(""); // <-- New state

    const amcNames = [
        "360 ONE MUTUAL FUND",
        "360 ONE MUTUAL FUND SIF",
        "ABAKKUS INVESTMENT MANAGERS PVT LTD",
        "AXIS ASSET MGMT COMPANY",
        "BAJAJ FINSERV ASSET MANAGEMENT LIMITED",
        "BANDHAN MUTUAL FUND",
        "BANDHAN MUTUAL FUND SIF",
        "BANK OF INDIA MUTUAL FUND",
        "BARODA BNP PARIBAS ASSET MANAGEMENT INDIA PVT LTD",
        "BIRLA SUNLIFE AMC",
        "CANARA ROBECO ASSET MGMT",
        "DSP INVESTMENT MANAGERS FUND",
        "EDELWEISS ASSET MGMT CO LTD",
        "EDELWEISS ASSET MGMT CO LTD SIF",
        "FRANKLIN TEMPLETON AMC",
        "GROWW MUTUAL FUND",
        "HDFC AMC",
        "HELIOS CAPITAL ASSET MANAGEMENT INDIA PVT LTD",
        "HSBC MUTUAL FUND",
        "ICICI PRUDENTIAL MUTUAL FUND",
        "INVESCO ASSET MGMT",
        "ITI MUTUAL FUND",
        "ITI MUTUAL FUND SIF",
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
        "SBI AMC SIF",
        "SHRIRAM ASSET MANAGEMENT COMPANY LIMITED",
        "SUNDARAM MUTUAL FUND",
        "TATA AMC",
        "TATA MUTUAL FUND SIF",
        "TAURUS ASSET MGMT CO LTD",
        "TRUST MUTUAL FUND",
        "UNION MUTUAL FUND",
        "UTI ASSET MANAGMENT CO LTD",
        "WEALTH COMPANY ASSET MANAGEMENT PVT LTD",
        "WHITEOAK CAPITAL ASSET MANAGEMENT LIMITED"
    ];

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
            setSchemeCode(""); // reset code when AMC changes
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
        setSchemeCode("");
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

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Mutual Fund Selector</h1>

            <div style={styles.dropdownWrapper}>
                <div style={styles.dropdownBox}>
                    <label style={styles.label}>Select AMC</label>
                    <select
                        style={styles.select}
                        value={selectedAMC}
                        onChange={(e) => setSelectedAMC(e.target.value)}
                    >
                        <option value="">--Select AMC--</option>
                        {amcNames.map((amc) => (
                            <option key={amc} value={amc}>{amc}</option>
                        ))}
                    </select>
                </div>

                <div style={styles.dropdownBox}>
                    <label style={styles.label}>Select Scheme</label>
                    <select
                        style={styles.select}
                        value={selectedScheme}
                        onChange={handleSchemeChange}
                    >
                        <option value="">--Select Scheme--</option>
                        {filteredSchemes.map((scheme) => (
                            <option key={scheme.id} value={scheme.id}>{scheme.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {selectedScheme && (
                <p style={{ marginTop: "20px", fontSize: "16px", color: "#333" }}>
                    Selected Scheme ID: <strong>{selectedScheme}</strong>
                </p>
            )}

            {schemeCode && (
                <p style={{ marginTop: "10px", fontSize: "16px", color: "#333" }}>
                    Scheme Code: <strong>{schemeCode}</strong>
                </p>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "40px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh"
    },
    title: {
        marginBottom: "40px",
        color: "#0d3b66"
    },
    dropdownWrapper: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
        maxWidth: "600px",
        alignItems: "center",
    },
    dropdownBox: {
        display: "flex",
        flexDirection: "column",
        width: "100%"
    },
    label: {
        marginBottom: "8px",
        fontWeight: "bold",
        fontSize: "14px"
    },
    select: {
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontSize: "14px",
        width: "100%",
        fontFamily: "Arial, sans-serif"
    }
};

export default FetchSchemes;