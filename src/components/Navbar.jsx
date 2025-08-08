import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand">Fortgeschrittene Webentwicklung</span>
                <div>
                    <Link to="/home" className="nav-link d-inline text-white me-3">
                        Home
                    </Link>
                    <Link to="/personen" className="nav-link d-inline text-white">
                        Personen
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;