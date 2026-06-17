import React from "react";
import "./DashboardCards.css";

const DashboardCards = () => {

    const cards = [
        {
            title: "Total Residents",
            value: "120"
        },
        {
            title: "Total Rooms",
            value: "60"
        },
        {
            title: "Occupied Beds",
            value: "105"
        },
        {
            title: "Vacant Beds",
            value: "15"
        },
        {
            title: "Pending Rent",
            value: "₹52,000"
        },
        {
            title: "Open Complaints",
            value: "7"
        }
    ];

    return (
        <div className="cards-grid">

            {cards.map((card, index) => (

                <div className="dashboard-card" key={index}>
                    <h4>{card.title}</h4>
                    <h2>{card.value}</h2>
                </div>

            ))}

        </div>
    );
};

export default DashboardCards;