import { useState, useEffect } from "react";
import Navbar from "../components/navabr.jsx";

function Profile() {
    const [formData, setFormData] = useState({
        Name: "",
        address: "",
        dob: "",
        email: "",
        state: "Punjab",
        account: "",
        pan_no: "",
    });

    const [folios, setFolios] = useState([]);

    const panCard = sessionStorage.getItem("auth");

    /* ================= FETCH DATA ================= */
    useEffect(() => {
        const cleanPan = panCard?.replace(/"/g, "").trim();
        if (!cleanPan) return;

        const fetchData = async () => {
            try {
                // PROFILE DATA
                const profileRes = await fetch("http://localhost:5000/api/getfromdata", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ pan: cleanPan }),
                });

                const profileData = await profileRes.json();

                setFormData(prev => ({
                    ...prev,
                    pan_no: profileData.panNUM || "",
                    account: profileData.accNo || "",
                    Name: profileData.name || "",
                    email: profileData.email || "",
                    address: profileData.adress || "",
                    dob: profileData.ddob || "",
                }));

                // FOLIO DATA
                const folioRes = await fetch("http://localhost:5000/api/foliodatass", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ PanNum: cleanPan }),
                });

                const folioData = await folioRes.json();

                setFolios(folioData.success ? folioData.data : []);

            } catch (error) {
                console.error("❌ Error:", error);
            }
        };

        fetchData();
    }, [panCard]);

    /* ================= CALCULATIONS ================= */
    const totalInvested = folios.reduce(
        (sum, item) => sum + Number(item.COSTVALUE || 0),
        0
    );

    const totalValue = folios.reduce(
        (sum, item) => sum + Number(item.Value || 0),
        0
    );

    const totalUnits = folios.reduce(
        (sum, item) => sum + Number(item.Units || 0),
        0
    );

    const profit = totalValue > totalInvested ? totalValue - totalInvested : 0;
    const loss = totalInvested > totalValue ? totalInvested - totalValue : 0;

    /* ================= HANDLER ================= */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /* ================= UI ================= */
    return (
        <>
            <Navbar />

            <div className="pt-40 min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white flex items-center justify-center p-6">

                <div className="w-full max-w-4xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-8">

                    {/* HEADER */}
                    <div className="mb-10 text-center">
                        <h2 className="text-4xl font-extrabold">Profile Details</h2>
                        <p className="text-gray-300 mt-2">
                            Manage your personal and financial details
                        </p>
                    </div>

                    {/* PERSONAL INFO */}
                    <Section title="Personal Info">
                        <div className="grid md:grid-cols-2 gap-5">
                            <Input label="Full Name" name="Name" value={formData.Name} onChange={handleChange} />
                            <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
                            <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
                            <Input label="PAN Number" name="pan_no" value={formData.pan_no} onChange={handleChange} />
                        </div>

                        <div className="mt-5">
                            <label className="text-sm font-semibold mb-2 block">Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
                            />
                        </div>
                    </Section>

                    {/* FINANCIAL INFO */}
                    <Section title="Financial Info">
                        <div className="grid md:grid-cols-2 gap-5">

                            <Input
                                label="Total Invested"
                                value={`₹ ${totalInvested.toLocaleString()}`}
                                readOnly
                            />

                            <Input
                                label="Current Value"
                                value={`₹ ${totalValue.toLocaleString()}`}
                                readOnly
                            />

                            <Input
                                label="Profit"
                                value={`₹ ${profit.toLocaleString()}`}
                                readOnly
                                typeStyle="profit"
                            />

                            <Input
                                label="Loss"
                                value={`₹ ${loss.toLocaleString()}`}
                                readOnly
                                typeStyle="loss"
                            />

                            <Input
                                label="Total Units"
                                value={totalUnits}
                                readOnly
                            />

                            <Input
                                label="Account Number"
                                name="account"
                                value={formData.account}
                                onChange={handleChange}
                            />

                        </div>
                    </Section>

                </div>
            </div>
        </>
    );
}

/* SECTION */
function Section({ title, children }) {
    return (
        <div className="mb-10">
            <h3 className="text-2xl font-bold mb-5">{title}</h3>
            {children}
        </div>
    );
}

/* INPUT */
function Input({ label, name, value, onChange, type = "text", readOnly, typeStyle }) {
    const color =
        typeStyle === "profit"
            ? "text-green-400 border-green-500/40"
            : typeStyle === "loss"
            ? "text-red-400 border-red-500/40"
            : "text-white border-white/10";

    return (
        <div>
            <label className="text-sm font-semibold mb-2 block">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                className={`w-full p-3 rounded-xl bg-white/5 border ${color} outline-none`}
            />
        </div>
    );
}

export default Profile;