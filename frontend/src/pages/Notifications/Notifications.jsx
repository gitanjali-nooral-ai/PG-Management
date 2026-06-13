import React from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import "./Notifications.css";

const Notifications = () => {
    const notifications = [
        {
            id: 1,
            title: "Rent Due Reminder",
            message: "Rahul Sharma's rent is due tomorrow.",
            date: "13-Jun-2026",
            type: "warning",
        },
        {
            id: 2,
            title: "New Complaint",
            message: "WiFi issue reported in Room A102.",
            date: "12-Jun-2026",
            type: "danger",
        },
        {
            id: 3,
            title: "Payment Received",
            message: "₹8,000 payment received from Priya Patil.",
            date: "12-Jun-2026",
            type: "success",
        },
    ];

    return (
        <AdminLayout>
            <div className="notifications-page">

                <div className="page-header">
                    <h1>Notifications</h1>
                    <button className="clear-btn">
                        Clear All
                    </button>
                </div>

                <div className="notifications-list">

                    {notifications.map((item) => (
                        <div
                            key={item.id}
                            className={`notification-card ${item.type}`}
                        >
                            <h3>{item.title}</h3>
                            <p>{item.message}</p>
                            <span>{item.date}</span>
                        </div>
                    ))}

                </div>

            </div>
        </AdminLayout>
    );
};

export default Notifications;