import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import ResidentManagement from "../pages/ResidentManagement/ResidentManagement";
import RoomManagement from "../pages/RoomManagement/RoomManagement";
import BedAllocation from "../pages/BedAllocation/BedAllocation";
import RentManagement from "../pages/RentManagement/RentManagement";
import BillManagement from "../pages/BillManagement/BillManagement";
import PaymentTracking from "../pages/PaymentTracking/PaymentTracking";
import Notifications from "../pages/Notifications/Notifications";
import Reports from "../pages/Reports/Reports";
import Profile from "../pages/Profile/Profile";
import ComplaintManagement from "../pages/ComplaintManagement/ComplaintManagement";
import Settings from "../pages/Settings/Settings";
import Logout from "../pages/Logout/Logout";



function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/residents" element={<ResidentManagement />} />

            <Route path="/rooms" element={<RoomManagement />} />

            <Route path="/bed-allocation" element={<BedAllocation />} />

            <Route path="/rent-management" element={<RentManagement />} />

            <Route path="/bill-management" element={<BillManagement />} />

            <Route path="/payment-tracking" element={<PaymentTracking />} />

            <Route path="/notifications" element={<Notifications />} />

            <Route path="/reports" element={<Reports />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/settings" element={<Settings />} />

            <Route path="/logout" element={<Logout />} />

            <Route path="/complaints" element={<ComplaintManagement />} />

        </Routes>
    );
}

export default AppRoutes;