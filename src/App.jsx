import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Personen from "./pages/Personen.jsx";

function App() {
    return (
        <Router>
            <Navbar />
            <div style={{ minHeight: "80vh", textAlign: "center", padding: "1rem" }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/personen" element={<Personen />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;