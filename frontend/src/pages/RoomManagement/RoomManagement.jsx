import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import "./RoomManagement.css";

const RoomManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const rooms = [
        {
            id: 1,
            roomNo: "A101",
            type: "2 Sharing",
            totalBeds: 2,
            occupiedBeds: 2,
            status: "Occupied",
        },
        {
            id: 2,
            roomNo: "A102",
            type: "3 Sharing",
            totalBeds: 3,
            occupiedBeds: 1,
            status: "Available",
        },
        {
            id: 3,
            roomNo: "B201",
            type: "Single",
            totalBeds: 1,
            occupiedBeds: 1,
            status: "Occupied",
        },
    ];

    const filteredRooms = rooms.filter((room) =>
        room.roomNo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="room-page">

                <div className="page-header">
                    <div>
                        <h1>Room Management</h1>
                        <p>Manage all rooms and occupancy details</p>
                    </div>

                    <button className="add-btn">
                        + Add Room
                    </button>
                </div>

                <div className="stats-container">

                    <div className="stat-card">
                        <h3>Total Rooms</h3>
                        <span>50</span>
                    </div>

                    <div className="stat-card">
                        <h3>Occupied Rooms</h3>
                        <span>35</span>
                    </div>

                    <div className="stat-card">
                        <h3>Available Rooms</h3>
                        <span>15</span>
                    </div>

                </div>

                <div className="table-container">

                    <div className="table-header">
                        <input
                            type="text"
                            placeholder="Search Room..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-box"
                        />
                    </div>

                    <table className="room-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Room No</th>
                                <th>Type</th>
                                <th>Total Beds</th>
                                <th>Occupied Beds</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredRooms.map((room) => (
                                <tr key={room.id}>
                                    <td>{room.id}</td>
                                    <td>{room.roomNo}</td>
                                    <td>{room.type}</td>
                                    <td>{room.totalBeds}</td>
                                    <td>{room.occupiedBeds}</td>

                                    <td>
                                        <span
                                            className={
                                                room.status === "Available"
                                                    ? "status available"
                                                    : "status occupied"
                                            }
                                        >
                                            {room.status}
                                        </span>
                                    </td>

                                    <td>
                                        <button className="view-btn">View</button>
                                        <button className="edit-btn">Edit</button>
                                        <button className="delete-btn">Delete</button>
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

export default RoomManagement;