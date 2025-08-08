import React, { useEffect, useState } from "react";

function Personen() {
    const [personen, setPersonen] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDropdownId, setOpenDropdownId] = useState(null);

    // Formular-Status
    const [form, setForm] = useState({
        name: "",
        vorname: "",
        firma: "",
        abteilung: ""
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchPersonen();
    }, []);

    const fetchPersonen = () => {
        setLoading(true);
        fetch("https://wiwa.uni-trier.de/personenapi/personen")
            .then((response) => {
                if (!response.ok) throw new Error("Fehler beim Laden der Personendaten.");
                return response.json();
            })
            .then((data) => {
                setPersonen(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaving(true);
        fetch("https://wiwa.uni-trier.de/personenapi/createperson", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
            .then((response) => {
                if (!response.ok) throw new Error("Fehler beim Speichern.");
                setForm({ name: "", vorname: "", firma: "", abteilung: "" });
                fetchPersonen();
            })
            .catch((err) => setError(err.message))
            .finally(() => setSaving(false));
    };

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    if (loading) return <p>Lade Personendaten…</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={{ padding: "1rem" }}>
            <h2>Personenliste</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                <input
                    type="text"
                    name="vorname"
                    placeholder="Vorname"
                    value={form.vorname}
                    onChange={handleChange}
                    required
                    className="form-control"
                    style={{ maxWidth: 150 }}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="form-control"
                    style={{ maxWidth: 150 }}
                />
                <input
                    type="text"
                    name="firma"
                    placeholder="Firma"
                    value={form.firma}
                    onChange={handleChange}
                    className="form-control"
                    style={{ maxWidth: 150 }}
                />
                <input
                    type="text"
                    name="abteilung"
                    placeholder="Abteilung"
                    value={form.abteilung}
                    onChange={handleChange}
                    className="form-control"
                    style={{ maxWidth: 150 }}
                />
                <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? "Speichern..." : "Speichern"}
                </button>
            </form>
            <table className="table table-bordered">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Vorname</th>
                    <th>Nachname</th>
                    <th>Firma</th>
                    <th>Abteilung</th>
                    <th>Aktionen</th>
                </tr>
                </thead>
                <tbody>
                {personen.map((p) => (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.vorname}</td>
                        <td>{p.name}</td>
                        <td>{p.firma}</td>
                        <td>{p.abteilung}</td>
                        <td style={{ position: "relative" }}>
                            <button
                                onClick={() => toggleDropdown(p.id)}
                                className="btn btn-secondary btn-sm"
                            >
                                Aktionen ▼
                            </button>
                            {openDropdownId === p.id && (
                                <div
                                    style={{
                                        position: "absolute",
                                        backgroundColor: "white",
                                        border: "1px solid #ccc",
                                        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                                        zIndex: 1,
                                        marginTop: "5px"
                                    }}
                                >
                                    <div style={{ padding: "8px", cursor: "pointer" }}>Details</div>
                                    <div style={{ padding: "8px", cursor: "pointer" }}>Bearbeiten</div>
                                    <div style={{ padding: "8px", cursor: "pointer", color: "red" }}>Löschen</div>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Personen;