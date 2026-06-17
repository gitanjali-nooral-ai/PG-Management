import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

const AdminLayout = ({ children }) => {
    return (
        <div className="dashboard-container">

            <Sidebar />

            <div className="dashboard-main">

                <Header />

                <div className="dashboard-content">
                    {children}
                </div>

            </div>

        </div>
    );
};

export default AdminLayout;