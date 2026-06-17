import React from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import "./Reports.css";

const Reports = () => {
    return (
        <AdminLayout>

            <div className="reports-page">

                <div className="page-header">
                    <div>
                        <h1>Reports & Analytics</h1>
                        <p>View PG performance and financial reports</p>
                    </div>

                    <button className="download-btn">
                        Download Report
                    </button>
                </div>

                <div className="report-cards">

                    <div className="report-card">
                        <h3>Occupancy Report</h3>
                        <p>Current occupancy percentage</p>
                        <span>85%</span>
                    </div>

                    <div className="report-card">
                        <h3>Rent Collection</h3>
                        <p>Total rent collected this month</p>
                        <span>₹3,50,000</span>
                    </div>

                    <div className="report-card">
                        <h3>Payment Report</h3>
                        <p>Successful payments</p>
                        <span>105</span>
                    </div>

                </div>

                <div className="table-container">

                    <h2>Monthly Report Summary</h2>

                    <table className="report-table">

                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Occupancy</th>
                                <th>Rent Collection</th>
                                <th>Payments</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr>
                                <td>January</td>
                                <td>80%</td>
                                <td>₹3,00,000</td>
                                <td>95</td>
                            </tr>

                            <tr>
                                <td>February</td>
                                <td>82%</td>
                                <td>₹3,20,000</td>
                                <td>100</td>
                            </tr>

                            <tr>
                                <td>March</td>
                                <td>85%</td>
                                <td>₹3,50,000</td>
                                <td>105</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>
    );
};

export default Reports;