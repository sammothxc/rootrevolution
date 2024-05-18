import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        regCheck();
        welCheck();
        return () => {
        };
    }, []);

    return (
        <main>
            <h1>Your SeedFeed</h1>
            <hr />
            <div id="user-based">
                <h3>Your Community in Provo</h3>
                <hr className="seedfeed"/>
                <div id="local" className="grid">
                    <div className='c-box'>
                        <div>Neighborhood Veggie Garden</div>
                        <img src="/placeholder-campaign.jpg" alt="Campaign Picture" width="125" />
                        <button className="poppins-semibold c-button" onClick={() => navigate('/campaign')}>View</button>
                    </div>
                    <div className='c-box'>
                        <div>Carrot garden for Provo Elderly Care Center</div>
                        <img src="/placeholder-campaign.jpg" alt="Campaign Picture" width="125" />
                        <button className="poppins-semibold c-button" onClick={() => navigate('/campaign')}>View</button>
                    </div>
                    <div className='c-box'>
                        <div>Sarah's Planting Club</div>
                        <img src="/placeholder-campaign.jpg" alt="Campaign Picture" width="125" />
                        <button className="poppins-semibold c-button" onClick={() => navigate('/campaign')}>View</button>
                    </div>
                    <div className='c-box'>
                        <div>Foster Elementary 4th Grade Garden</div>
                        <img src="/placeholder-campaign.jpg" alt="Campaign Picture" width="125" />
                        <button className="poppins-semibold c-button" onClick={() => navigate('/campaign')}>View</button>
                    </div>
                </div>
                <h3>Saved</h3>
                <hr className="seedfeed"/>
                <div id="saved" className="grid">
                    <div className='c-box'>
                        <div>Saved Campaign 1</div>
                        <img src="/placeholder-campaign.jpg" alt="Campaign Picture" width="125" />
                        <button className="poppins-semibold c-button" onClick={() => navigate('/campaign')}>View</button>
                    </div>
                    <div className='c-box'>
                        <div>Saved Campaign 2</div>
                        <img src="/placeholder-campaign.jpg" alt="Campaign Picture" width="125" />
                        <button className="poppins-semibold c-button" onClick={() => navigate('/campaign')}>View</button>
                    </div>
                    <div className='c-box'>
                        <div>Saved Campaign 3</div>
                        <img src="/placeholder-campaign.jpg" alt="Campaign Picture" width="125" />
                        <button className="poppins-semibold c-button" onClick={() => navigate('/campaign')}>View</button>
                    </div>
                </div>
                <h3>Seeds you may have</h3>
                <hr className="seedfeed"/>
                <div id="seed-match" className="grid">
                    <div className='c-box'>
                        <div>Neighborhood Veggie Garden</div>
                        <img src="/placeholder-campaign.jpg" alt="Campaign Picture" width="125" />
                        <button className="poppins-semibold c-button" onClick={() => navigate('/campaign')}>View</button>
                    </div>
                    <div className='c-box'>
                        <div>Carrot garden for Provo Elderly Care Center</div>
                        <img src="/placeholder-campaign.jpg" alt="Campaign Picture" width="125" />
                        <button className="poppins-semibold c-button" onClick={() => navigate('/campaign')}>View</button>
                    </div>
                    <div className='c-box'>
                        <div>Sarah's Planting Club</div>
                        <img src="/placeholder-campaign.jpg" alt="Campaign Picture" width="125" />
                        <button className="poppins-semibold c-button" onClick={() => navigate('/campaign')}>View</button>
                    </div>
                    <div className='c-box'>
                        <div>Foster Elementary 4th Grade Garden</div>
                        <img src="/placeholder-campaign.jpg" alt="Campaign Picture" width="125" />
                        <button className="poppins-semibold c-button" onClick={() => navigate('/campaign')}>View</button>
                    </div>
                    <div className='c-box'>
                        <div>[Rose] 911 Rose seeds for 9/11 community memorial</div>
                        <img src="/placeholder-campaign.jpg" alt="Campaign Picture" width="125" />
                        <button className="poppins-semibold c-button" onClick={() => navigate('/campaign')}>View</button>
                    </div>
                    <div className='c-box'>
                        <div>[Carrot] Carrot garden for Elderly Care Center</div>
                        <img src="/placeholder-campaign.jpg" alt="Campaign Picture" width="125" />
                        <button className="poppins-semibold c-button" onClick={() => navigate('/campaign')}>View</button>
                    </div>
                    <div className='c-box'>
                        <div>[Pepper] 50,000 Pepper seeds to feed Town after natural disaster</div>
                        <img src="/placeholder-campaign.jpg" alt="Campaign Picture" width="125" />
                        <button className="poppins-semibold c-button" onClick={() => navigate('/campaign')}>View</button>
                    </div>
                    <div className='c-box'>
                        <div>[Tomato] 1000 Tomato seeds for local Elementary School</div>
                        <img src="/placeholder-campaign.jpg" alt="Campaign Picture" width="125" />
                        <button className="poppins-semibold c-button" onClick={() => navigate('/campaign')}>View</button>
                    </div>
                </div>
            </div>
        </main>
    );
}

function welCheck() {
    let welcomeMessageDisplayed = JSON.parse(localStorage.getItem("welcomeMessageDisplayed"));
    let registered = JSON.parse(localStorage.getItem("registered"));
    let username = localStorage.getItem("username");
    if (!welcomeMessageDisplayed && username && registered) {
        setTimeout(() => {
            welcomeMessageShow(username);
        }, 500);
    }
}

function regCheck() {
    const registrationMessageDisplayed = JSON.parse(localStorage.getItem("registrationMessageDisplayed"));
    const registered = JSON.parse(localStorage.getItem("registered"));
    if (!registrationMessageDisplayed && registered) {
        setTimeout(() => {
            registrationMessageShow();
        }, 500);
    } else {
    }
}

function registrationMessageShow() {
    const registrationMessage = document.createElement("p");
    registrationMessage.textContent = "Registration successful! Welcome to RootRevolution!";
    registrationMessage.classList.add("banner-message");
    registrationMessage.classList.add("poppins-semibold");
    document.body.insertBefore(registrationMessage, document.body.firstChild);
    // Set flag in local storage to indicate registration message has been displayed
    localStorage.setItem("registrationMessageDisplayed", "true");
    // Remove the registration message after animation completes
    setTimeout(() => {
        registrationMessage.remove();
    }, 4000); // 4000 milliseconds = 4 seconds
}

function welcomeMessageShow(username) {
    const welcomeMessage = document.createElement("p");
    welcomeMessage.textContent = "Welcome back, " + username + "!";
    welcomeMessage.classList.add("banner-message");
    welcomeMessage.classList.add("poppins-semibold");
    document.body.insertBefore(welcomeMessage, document.body.firstChild);
    
    // Set flag in local storage to indicate welcome message has been displayed
    localStorage.setItem("welcomeMessageDisplayed", "true");

    // Remove the welcome message after animation completes
    setTimeout(() => {
        welcomeMessage.remove();
    }, 4000); // 4000 milliseconds = 4 seconds
}