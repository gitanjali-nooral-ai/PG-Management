import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import "./BedAllocation.css";

const BedAllocation = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const [allocations] = useState([
        {
            id: 1,
            resident: "Rahul Sharma",
            room: "A101",
            bed: "B1",
            date: "13-06-2026",
            status: "Allocated",
        },
        {
            id: 2,
            resident: "Priya Patil",
            room: "A102",
            bed: "B2",
            date: "12-06-2026",
            status: "Allocated",
        },
    ]);

    const filteredAllocations = allocations.filter(
        (item) =>
            item.resident.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.room.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="bed-page">

                <div className="page-header">
                    <div>
                        <h1>Bed Allocation</h1>
                        <p>Allocate residents to rooms and beds</p>
                    </div>

                    <button className="allocate-btn">
                        + Allocate Bed
                    </button>
                </div>

                {/* Statistics Cards */}

                <div className="stats-container">

                    <div className="stat-card">
                        <h3>Total Beds</h3>
                        <span>200</span>
                    </div>

                    <div className="stat-card">
                        <h3>Occupied Beds</h3>
                        <span>150</span>
                    </div>

                    <div className="stat-card">
                        <h3>Vacant Beds</h3>
                        <span>50</span>
                    </div>

                </div>

                {/* Bed Availability */}

                <div className="availability-section">

                    <div className="availability-card">
                        <h3>Available Rooms</h3>
                        <span>15</span>
                    </div>

                    <div className="availability-card">
                        <h3>Available Beds</h3>
                        <span>50</span>
                    </div>

                </div>

                {/* Table Section */}

                <div className="table-container">

                    <div className="table-header">
                        <input
                            type="text"
                            placeholder="Search Resident or Room..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-box"
                        />
                    </div>

                    <table className="allocation-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Resident</th>
                                <th>Room</th>
                                <th>Bed</th>
                                <th>Allocation Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredAllocations.length === 0 ? (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: "center" }}>
                                        No Allocations Found
                                    </td>
                                </tr>
                            ) : (
                                filteredAllocations.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.resident}</td>
                                        <td>{item.room}</td>
                                        <td>{item.bed}</td>
                                        <td>{item.date}</td>

                                        <td>
                                            <span className="allocated">
                                                {item.status}
                                            </span>
                                        </td>

                                        <td>
                                            <button className="view-btn">
                                                View
                                            </button>

                                            <button className="edit-btn">
                                                Change Bed
                                            </button>

                                            <button className="delete-btn">
                                                Vacate
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}

                        </tbody>

                    </table>

                </div>

            </div>
        </AdminLayout>
    );
};

export default BedAllocation;