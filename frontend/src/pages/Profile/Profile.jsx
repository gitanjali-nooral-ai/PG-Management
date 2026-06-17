import React from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import "./Profile.css";

const Profile = () => {
    return (
        <AdminLayout>
            <div className="profile-page">

                <div className="page-header">
                    <h1>My Profile</h1>
                    <p>Manage your account information</p>
                </div>

                <div className="profile-card">

                    <div className="profile-image">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Admin"
                        />
                    </div>

                    <div className="profile-details">
                        <div className="profile-row">
                            <label>Name</label>
                            <span>Admin User</span>
                        </div>

                        <div className="profile-row">
                            <label>Email</label>
                            <span>admin@pg.com</span>
                        </div>

                        <div className="profile-row">
                            <label>Mobile</label>
                            <span>9876543210</span>
                        </div>

                        <div className="profile-row">
                            <label>Role</label>
                            <span>Administrator</span>
                        </div>

                        <div className="button-group">
                            <button className="edit-btn">
                                Edit Profile
                            </button>

                            <button className="password-btn">
                                Change Password
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </AdminLayout>
    );
};

export default Profile;