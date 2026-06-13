import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <aside className="sidebar">

            <h2>PG Admin</h2>

            <ul>

                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>

                <li>
                    <Link to="/residents">Resident Management</Link>
                </li>

                <li>
                    <Link to="/rooms">Room Management</Link>
                </li>

                <li>
                    <Link to="/bed-allocation">Bed Allocation</Link>
                </li>

                <li>
                    <Link to="/rent-management">Rent Management</Link>
                </li>

                <li>
                    <Link to="/bill-management">Bill Management</Link>
                </li>

                <li>
                    <Link to="/payment-tracking">Payment Tracking</Link>
                </li>

                <li>
                    <Link to="/notifications">Notifications</Link>
                </li>

                <li>
                    <Link to="/reports">Reports</Link>
                </li>

                <li>
                    <Link to="/profile">Profile</Link>
                </li>

            </ul>

        </aside>
    );
};

export default Sidebar;