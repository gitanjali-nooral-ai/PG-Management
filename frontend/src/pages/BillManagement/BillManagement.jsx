import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import "./BillManagement.css";

const BillManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const bills = [
        {
            id: 1,
            resident: "Rahul Sharma",
            room: "A101",
            amount: "₹8,500",
            billDate: "01-Jun-2026",
            dueDate: "15-Jun-2026",
            status: "Paid",
        },
        {
            id: 2,
            resident: "Priya Patil",
            room: "A102",
            amount: "₹9,000",
            billDate: "01-Jun-2026",
            dueDate: "15-Jun-2026",
            status: "Pending",
        },
        {
            id: 3,
            resident: "Amit Kumar",
            room: "B201",
            amount: "₹7,500",
            billDate: "01-Jun-2026",
            dueDate: "15-Jun-2026",
            status: "Overdue",
        },
    ];

    const filteredBills = bills.filter((bill) =>
        bill.resident.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="bill-page">

                <div className="page-header">
                    <div>
                        <h1>Bill Management</h1>
                        <p>Generate and manage resident bills</p>
                    </div>

                    <button className="generate-btn">
                        + Generate Bill
                    </button>
                </div>

                <div className="stats-container">

                    <div className="stat-card">
                        <h3>Total Bills</h3>
                        <span>120</span>
                    </div>

                    <div className="stat-card">
                        <h3>Paid Bills</h3>
                        <span>95</span>
                    </div>

                    <div className="stat-card">
                        <h3>Pending Bills</h3>
                        <span>20</span>
                    </div>

                    <div className="stat-card">
                        <h3>Overdue Bills</h3>
                        <span>5</span>
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

                    <table className="bill-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Resident</th>
                                <th>Room</th>
                                <th>Amount</th>
                                <th>Bill Date</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredBills.map((bill) => (
                                <tr key={bill.id}>
                                    <td>{bill.id}</td>
                                    <td>{bill.resident}</td>
                                    <td>{bill.room}</td>
                                    <td>{bill.amount}</td>
                                    <td>{bill.billDate}</td>
                                    <td>{bill.dueDate}</td>

                                    <td>
                                        <span
                                            className={`status ${bill.status.toLowerCase()}`}
                                        >
                                            {bill.status}
                                        </span>
                                    </td>

                                    <td>
                                        <button className="view-btn">
                                            View
                                        </button>

                                        <button className="edit-btn">
                                            Edit
                                        </button>

                                        <button className="download-btn">
                                            Download
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

export default BillManagement;