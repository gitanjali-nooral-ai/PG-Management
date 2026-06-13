import React from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import "./Logout.css";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <AdminLayout>
            <div className="logout-page">

                <div className="logout-card">
                    <h2>Logout Confirmation</h2>

                    <p>
                        Are you sure you want to logout?
                    </p>

                    <div className="logout-buttons">

                        <button
                            className="cancel-btn"
                            onClick={() => navigate("/dashboard")}
                        >
                            Cancel
                        </button>

                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>
                </div>

            </div>
        </AdminLayout>
    );
};

export default Logout;