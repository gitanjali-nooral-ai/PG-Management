import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import "./ComplaintManagement.css";

const ComplaintManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const complaints = [
        {
            id: 1,
            resident: "Rahul Sharma",
            category: "Electricity",
            description: "Fan not working",
            date: "13-Jun-2026",
            status: "Open",
        },
        {
            id: 2,
            resident: "Priya Patil",
            category: "Water",
            description: "Low water pressure",
            date: "12-Jun-2026",
            status: "In Progress",
        },
        {
            id: 3,
            resident: "Amit Kumar",
            category: "Cleaning",
            description: "Room cleaning issue",
            date: "11-Jun-2026",
            status: "Resolved",
        },
    ];

    const filteredComplaints = complaints.filter((item) =>
        item.resident.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="complaint-page">

                <div className="page-header">
                    <div>
                        <h1>Complaint Management</h1>
                        <p>Track and resolve resident complaints</p>
                    </div>

                    <button className="add-btn">
                        + Raise Complaint
                    </button>
                </div>

                <div className="stats-container">

                    <div className="stat-card">
                        <h3>Total Complaints</h3>
                        <span>45</span>
                    </div>

                    <div className="stat-card">
                        <h3>Open</h3>
                        <span>12</span>
                    </div>

                    <div className="stat-card">
                        <h3>Resolved</h3>
                        <span>33</span>
                    </div>

                </div>

                <div className="table-container">

                    <div className="table-header">
                        <input
                            type="text"
                            placeholder="Search Complaint..."
                            className="search-box"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <table className="complaint-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Resident</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredComplaints.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.resident}</td>
                                    <td>{item.category}</td>
                                    <td>{item.description}</td>
                                    <td>{item.date}</td>

                                    <td>
                                        <span
                                            className={`status ${item.status
                                                .replace(" ", "")
                                                .toLowerCase()}`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>

                                    <td>
                                        <button className="view-btn">
                                            View
                                        </button>

                                        <button className="edit-btn">
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>
        </AdminLayout>
    );
};

export default ComplaintManagement;