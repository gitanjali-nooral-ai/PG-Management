import React from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import "./Settings.css";

const Settings = () => {
    return (
        <AdminLayout>
            <div className="settings-page">

                <div className="page-header">
                    <h1>Settings</h1>
                    <p>Configure PG Management System</p>
                </div>

                <div className="settings-card">

                    <div className="form-group">
                        <label>PG Name</label>
                        <input type="text" placeholder="Sunrise PG" />
                    </div>

                    <div className="form-group">
                        <label>PG Address</label>
                        <input type="text" placeholder="Pune, Maharashtra" />
                    </div>

                    <div className="form-group">
                        <label>Contact Number</label>
                        <input type="text" placeholder="9876543210" />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="admin@pg.com" />
                    </div>

                    <button className="save-btn">
                        Save Settings
                    </button>

                </div>

            </div>
        </AdminLayout>
    );
};

export default Settings;