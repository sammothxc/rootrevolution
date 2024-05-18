import React from 'react';
import { useNavigate } from 'react-router-dom'; //implement

export function StartCampaign() {
    const navigate = useNavigate();
    return (
        <main>
            <h2>Start Campaign</h2>
            <p>Start your Campaign here!</p>
            <div id="register" className="input-box">
                <input type="text" id="c-name" placeholder="Campaign Name" />
                <input type="text" id="c-description" placeholder="Description" />
                <input type="text" id="c-location" placeholder="Location" />
                <input type="text" id="c-seeds" placeholder="Seed Types" />
                <input type="text" id="c-goal" placeholder="Goal" />
                <button className="poppins-semibold" onClick={() => navigate('/login')}>Create</button>
            </div>
        </main>
    );
}