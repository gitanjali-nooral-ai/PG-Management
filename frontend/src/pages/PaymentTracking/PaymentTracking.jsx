import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import "./PaymentTracking.css";

const PaymentTracking = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const payments = [
        {
            id: 1,
            resident: "Rahul Sharma",
            room: "A101",
            amount: "₹8,000",
            paymentDate: "13-Jun-2026",
            method: "UPI",
            status: "Success",
        },
        {
            id: 2,
            resident: "Priya Patil",
            room: "A102",
            amount: "₹8,500",
            paymentDate: "12-Jun-2026",
            method: "Cash",
            status: "Success",
        },
        {
            id: 3,
            resident: "Amit Kumar",
            room: "B201",
            amount: "₹7,500",
            paymentDate: "-",
            method: "-",
            status: "Pending",
        },
    ];

    const filteredPayments = payments.filter((payment) =>
        payment.resident.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="payment-page">

                <div className="page-header">
                    <div>
                        <h1>Payment Tracking</h1>
                        <p>Track and manage resident payments</p>
                    </div>

                    <button className="collect-btn">
                        + Record Payment
                    </button>
                </div>

                <div className="stats-container">

                    <div className="stat-card">
                        <h3>Total Payments</h3>
                        <span>₹3,50,000</span>
                    </div>

                    <div className="stat-card">
                        <h3>Successful</h3>
                        <span>105</span>
                    </div>

                    <div className="stat-card">
                        <h3>Pending</h3>
                        <span>15</span>
                    </div>

                    <div className="stat-card">
                        <h3>This Month</h3>
                        <span>₹80,000</span>
                    </div>

                </div>

                <div className="table-container">

                    <input
                        type="text"
                        placeholder="Search Resident..."
                        className="search-box"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <table className="payment-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Resident</th>
                                <th>Room</th>
                                <th>Amount</th>
                                <th>Payment Date</th>
                                <th>Method</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredPayments.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{payment.id}</td>
                                    <td>{payment.resident}</td>
                                    <td>{payment.room}</td>
                                    <td>{payment.amount}</td>
                                    <td>{payment.paymentDate}</td>
                                    <td>{payment.method}</td>

                                    <td>
                                        <span
                                            className={`status ${payment.status.toLowerCase()}`}
                                        >
                                            {payment.status}
                                        </span>
                                    </td>

                                    <td>
                                        <button className="view-btn">
                                            View
                                        </button>

                                        <button className="receipt-btn">
                                            Receipt
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

export default PaymentTracking;