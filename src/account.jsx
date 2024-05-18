import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function Account() {
    const navigate = useNavigate();
    useEffect(() => {
        showUserInfo();
        return () => {
        };
    }, []);

    function showUserInfo() {
        const uinfo = JSON.parse(localStorage.getItem('uinfo'));

    
        const usernameElement = document.getElementById("username");
        const memberSinceElement = document.getElementById("member-since");
        const nameElement = document.getElementById("fullname");
        const emailElement = document.getElementById("email");
        const locationElement = document.getElementById("location");
        const seedsDonatedElement = document.getElementById("seeds-donated");
        const seedsReceivedElement = document.getElementById("seeds-received");
    
        const usernametxt = document.createElement("p");
        const memberSincetxt = document.createElement("p");
        const nametxt = document.createElement("p");
        const emailtxt = document.createElement("p");
        const locationtxt = document.createElement("p");
        const seedsDonatedtxt = document.createElement("p");
        const seedsReceivedtxt = document.createElement("p");
    
        usernameElement.textContent = uinfo.username;
        memberSinceElement.textContent = "Member Since: " + uinfo.membersince;
        nameElement.textContent = "Name: " + uinfo.fullname;
        emailElement.textContent = "Email: " + uinfo.email;
        locationElement.textContent = "Location: " + uinfo.location;
        seedsDonatedElement.textContent = "Seeds Donated: " + uinfo.seedsdonated;
        seedsReceivedElement.textContent = "Seeds Received: " + uinfo.seedsreceived;
    
        usernameElement.appendChild(usernametxt);
        memberSinceElement.appendChild(memberSincetxt);
        nameElement.appendChild(nametxt);
        emailElement.appendChild(emailtxt);
        locationElement.appendChild(locationtxt);
        seedsDonatedElement.appendChild(seedsDonatedtxt);
        seedsReceivedElement.appendChild(seedsReceivedtxt);
    }
    
    async function deleteAccount() {
        let attemptedDelete = localStorage.getItem("attemptedDelete");
        if (!attemptedDelete) {
            localStorage.setItem("attemptedDelete", 1);
            msgBanner('Are you sure you want to delete your account? Click the delete button 3 times to confirm.', true);
            return;
        } else {
            if (parseInt(attemptedDelete) <= 2) {
                localStorage.setItem("attemptedDelete", parseInt(attemptedDelete) + 1);
                return;
            } else {
                try {
                    const username = localStorage.getItem("username");
                    const response = await deleteUser(username);
                    console.log(response);
                    if (response === 200) {
                        // Account deletion successful
                        localStorage.clear();
                        navigate('/'); // Redirect to the homepage or login page
                    } else {
                        // Handle error response
                        console.error('Error deleting account:' + response);
                        msgBanner('Error deleting account', true);
                        // Display an error message to the user if necessary
                    }
                } catch (error) {
                    console.error('Error deleting account:', error.message);
                    msgBanner('Error deleting account', true);
                    // Display an error message to the user if necessary
                }
            }
        }
    }
    
    function msgBanner(msg, error = false) {
        const msgB = document.createElement("p");
        msgB.textContent = msg;
        msgB.classList.add("banner-message");
        msgB.classList.add("poppins-semibold");
        if(error) { msgB.classList.add("error-message"); }
        document.body.insertBefore(msgB, document.body.firstChild);
        setTimeout(() => {
            msgB.remove();
        }, 4000); // 4000 milliseconds = 4 seconds
    }
    
    async function deleteUser(username) {
        const response = await fetch(`/api/del/${username}`, {
            method: 'DELETE',
        });
        return response.status;
    }

    return (
        <main className='account'>
            <h1>Your Account</h1>
            <div id="account" className="content-box">
                <div id="account-info" className="account-info">
                    <h2 id="username"></h2>
                    <p id="member-since" className="date"></p>
                    <br />
                    <p id="fullname"></p>
                    <p id="email"></p>
                    <p id="location"></p>
                    <p id="seeds-donated"></p>
                    <p id="seeds-received"></p>
                    <button className="poppins-semibold" id="start-campaign" onClick={() => navigate('/start-campaign')}>Start Campaign</button>
                </div>
                <div id="profile-pic" className="profile-picture">
                    <img src="/placeholder-profile.jpg" className="img-container" alt="Profile Picture"/>
                </div> 
            </div>
            <br />
            <h2>Campaigns Run:</h2>
            <div id="campaigns" className="grid">
                <div className='c-box'>
                        <div>Your 1st Campaign</div>
                        <img src="/placeholder-campaign.jpg" alt="Campaign Picture" width="125" />
                        <button className="poppins-semibold c-button" onClick={() => navigate('/campaign')}>View</button>
                    </div>
                    <div className='c-box'>
                        <div>Your 2nd Campaign</div>
                        <img src="/placeholder-campaign.jpg" alt="Campaign Picture" width="125" />
                        <button className="poppins-semibold c-button" onClick={() => navigate('/campaign')}>View</button>
                    </div>
                    <div className='c-box'>
                        <div>Your 3rd Campaign</div>
                        <img src="/placeholder-campaign.jpg" alt="Campaign Picture" width="125" />
                        <button className="poppins-semibold c-button" onClick={() => navigate('/campaign')}>View</button>
                    </div>
            </div>
            <button className="delete-account-btn" onClick={() => deleteAccount()}>Delete Account</button>
         </main>
    );
}