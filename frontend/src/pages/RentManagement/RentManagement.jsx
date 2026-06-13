import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import "./RentManagement.css";

const RentManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const rentData = [
        {
            id: 1,
            resident: "Rahul Sharma",
            room: "A101",
            amount: "₹8,000",
            dueDate: "15-Jun-2026",
            status: "Paid",
        },
        {
            id: 2,
            resident: "Priya Patil",
            room: "A102",
            amount: "₹8,500",
            dueDate: "15-Jun-2026",
            status: "Pending",
        },
        {
            id: 3,
            resident: "Amit Kumar",
            room: "B201",
            amount: "₹7,500",
            dueDate: "15-Jun-2026",
            status: "Overdue",
        },
    ];

    const filteredData = rentData.filter((rent) =>
        rent.resident.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="rent-page">

                <div className="page-header">
                    <div>
                        <h1>Rent Management</h1>
                        <p>Manage rent collection and payment status</p>
                    </div>

                    <button className="collect-btn">
                        + Collect Rent
                    </button>
                </div>

                <div className="stats-container">

                    <div className="stat-card">
                        <h3>Total Collection</h3>
                        <span>₹3,50,000</span>
                    </div>

                    <div className="stat-card">
                        <h3>Pending Rent</h3>
                        <span>₹45,000</span>
                    </div>

                    <div className="stat-card">
                        <h3>Overdue Rent</h3>
                        <span>₹15,000</span>
                    </div>

                    <div className="stat-card">
                        <h3>Paid Residents</h3>
                        <span>105</span>
                    </div>

                </div>

                <div className="table-container">

                    <div className="table-header">

                        <input
                            type="text"
                            placeholder="Search Resident..."
                            className="search-box"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                    </div>

                    <table className="rent-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Resident</th>
                                <th>Room</th>
                                <th>Rent Amount</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredData.map((rent) => (
                                <tr key={rent.id}>
                                    <td>{rent.id}</td>
                                    <td>{rent.resident}</td>
                                    <td>{rent.room}</td>
                                    <td>{rent.amount}</td>
                                    <td>{rent.dueDate}</td>

                                    <td>
                                        <span
                                            className={`status ${rent.status.toLowerCase()}`}
                                        >
                                            {rent.status}
                                        </span>
                                    </td>

                                    <td>

                                        <button className="view-btn">
                                            View
                                        </button>

                                        <button className="edit-btn">
                                            Edit
                                        </button>

                                        <button className="collect-small-btn">
                                            Collect
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

export default RentManagement;