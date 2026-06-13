import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import "./ResidentManagement.css";

const ResidentManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const residents = [
        {
            id: 1,
            name: "Rahul Sharma",
            room: "A101",
            bed: "B1",
            contact: "9876543210",
            rent: "₹8,000",
            status: "Active",
        },
        {
            id: 2,
            name: "Priya Patil",
            room: "A102",
            bed: "B2",
            contact: "9876543211",
            rent: "₹8,500",
            status: "Active",
        },
        {
            id: 3,
            name: "Amit Kumar",
            room: "B201",
            bed: "B1",
            contact: "9876543212",
            rent: "₹7,500",
            status: "Inactive",
        },
    ];

    const filteredResidents = residents.filter((resident) =>
        resident.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>

            <div className="resident-page">

                <div className="page-header">
                    <div>
                        <h1>Resident Management</h1>
                        <p>Manage all PG residents and occupancy details</p>
                    </div>

                    <button className="add-btn">
                        + Add Resident
                    </button>
                </div>

                <div className="stats-container">

                    <div className="stat-card">
                        <h3>Total Residents</h3>
                        <span>120</span>
                    </div>

                    <div className="stat-card">
                        <h3>Active Residents</h3>
                        <span>110</span>
                    </div>

                    <div className="stat-card">
                        <h3>Vacated Residents</h3>
                        <span>10</span>
                    </div>

                </div>

                <div className="table-container">

                    <div className="table-header">
                        <input
                            type="text"
                            placeholder="Search Resident..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-box"
                        />
                    </div>

                    <table className="resident-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Room</th>
                                <th>Bed</th>
                                <th>Contact</th>
                                <th>Rent</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredResidents.map((resident) => (
                                <tr key={resident.id}>
                                    <td>{resident.id}</td>
                                    <td>{resident.name}</td>
                                    <td>{resident.room}</td>
                                    <td>{resident.bed}</td>
                                    <td>{resident.contact}</td>
                                    <td>{resident.rent}</td>

                                    <td>
                                        <span
                                            className={
                                                resident.status === "Active"
                                                    ? "status active"
                                                    : "status inactive"
                                            }
                                        >
                                            {resident.status}
                                        </span>
                                    </td>

                                    <td>
                                        <button className="view-btn">
                                            View
                                        </button>

                                        <button className="edit-btn">
                                            Edit
                                        </button>

                                        <button className="delete-btn">
                                            Delete
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

export default ResidentManagement;