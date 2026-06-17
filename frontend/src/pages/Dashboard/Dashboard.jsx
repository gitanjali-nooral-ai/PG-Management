import React from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import DashboardCards from "../../components/Cards/DashboardCards";
import "./Dashboard.css";

const Dashboard = () => {
    return (
        <AdminLayout>

            <div className="dashboard-content">

                <h2>Dashboard Overview</h2>

                <DashboardCards />

                <div className="recent-activity">

                    <h3>Recent Activities</h3>

                    <table>
                        <thead>
                            <tr>
                                <th>Resident</th>
                                <th>Activity</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Rahul Sharma</td>
                                <td>Rent Paid</td>
                                <td>13 Jun 2026</td>
                            </tr>

                            <tr>
                                <td>Priya Patil</td>
                                <td>Complaint Submitted</td>
                                <td>12 Jun 2026</td>
                            </tr>

                            <tr>
                                <td>Amit Kumar</td>
                                <td>Room Allocated</td>
                                <td>11 Jun 2026</td>
                            </tr>
                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>
    );
};

export default Dashboard;