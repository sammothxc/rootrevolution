import React from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { About } from './about/about';
import { Account } from './account/account';
import { Campaign } from './campaign/campaign';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';
import { Seedmap } from './seedmap/seedmap';
import { StartCampaign } from './start-campaign/start-campaign';
export default App;

function Header() {
    return (
        <header className="sticky-header">
            <div className='navbar-brand'>
                RootRevolution<sup>&reg;</sup>
                </div>
            <nav>
                <menu>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="seedmap">SeedMap</NavLink></li>
                    <li><NavLink to="about">About</NavLink></li>
                    <li id="accountLink"></li>
                    <li id="loginStatus"></li>
                </menu>
            </nav>
            <hr />
        </header>
    );
}

function Main() {
    useEffect(() => {
        menu();
        return () => {
        };
    }, []);

    const navigate = useNavigate();
    function menu() {
        let username = localStorage.getItem("username");
        const loginStatusElement = document.getElementById("loginStatus");
        const accountLinkElement = document.getElementById("accountLink");
        if (username) {
            // User is logged in, display username and logout button
            const logoutLink = document.createElement("a");
            logoutLink.textContent = "Logout";
            logoutLink.classList.add("p-login");
            loginStatusElement.appendChild(logoutLink);
            logoutLink.onclick = function(){
                localStorage.removeItem("username");
                localStorage.removeItem("welcomeMessageDisplayed");
                fetch(`/api/auth/logout`, {
                    method: 'delete',
                }).then(() => (window.location.href = '/'));
            };
            const userAccount = document.createElement("a");
            userAccount.textContent = username;
            userAccount.classList.add("p-login");
            accountLinkElement.appendChild(userAccount);
            userAccount.onclick = function(){
                navigate('/account');
            };
        } else {
            // User is not logged in, display login link
            const loginLink = document.createElement("a");
            loginLink.textContent = "Login";
            loginLink.classList.add("p-login");
            loginStatusElement.appendChild(loginLink);
            loginLink.onclick = function(){
                navigate('/login');
            };
        }
    }

    return (
        <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/about' element={<About />} />
            <Route path='/account' element={<Account />} />
            <Route path='/campaign' element={<Campaign />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/seedmap' element={<Seedmap />} />
            <Route path='/start-campaign' element={<StartCampaign />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

function Footer() {
    useEffect(() => {
        setInterval(updateSeedCounter, 2000);
        return () => {
        };
    }, []);

    function updateSeedCounter() {
        const seedCounterElement = document.getElementById("seedCounter");
        // Generate a random amount to increment the counter
        const incrementAmount = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
        // Get the current value of the counter and parse it as an integer
        let currentCount = parseInt(localStorage.getItem("seedCounter"));
        if (!currentCount) {
            // If the counter is not set, set it to 0
            currentCount = 0;
            localStorage.setItem("seedCounter", currentCount);
        }
        // Increment the counter by the random amount
        currentCount += incrementAmount;
        // Update the counter display
        localStorage.setItem("seedCounter", currentCount);
        seedCounterElement.textContent = currentCount + " Seeds Donated!";
    }

    return (
        <footer className="sticky-footer">
            <hr />
            <div className="content">
                <div className="footer-left">
                    <p>Sam Warr &copy;2024</p>
                    <p>Source: <a href="https://github.com/sammothxc/startup">GitHub</a></p>
                </div>
                <div className="footer-right poppins-semibold">
                    <span id="seedCounter">Seeds Donated Since 2024: Counting...</span>
                    <p id="user-count">Loading...</p>
                </div>
            </div>
        </footer>
    );
}

function NotFound() {
    return <main>404: Return to sender. Address unknown.</main>;
}

function App() {
    useEffect(() => {
        loadUserInfo();
        return () => {
        };
    }, []);

    async function loadUserInfo() {
        // Get the uinfo from the service
        const response = await fetch('/api/uinfo');
        const uinfo = await response.json();
    
        const {
            fullname,
            email,
            location,
            username,
            membersince,
            seedsdonated,
            seedsreceived
        } = uinfo;
    
        // Save the uinfo in case we go offline in the future
        localStorage.setItem('uinfo', JSON.stringify(uinfo));
    }

    return (
        <BrowserRouter>
            <Header />
            <Main />
            <Footer />
        </BrowserRouter>
    );
}

const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const ws = new WebSocket(`${protocol}://${window.location.host}/ws`);
ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    if (data.type === 'userCount') {
        document.getElementById('user-count').textContent = `Users Online: ${data.count}`;
    }
};