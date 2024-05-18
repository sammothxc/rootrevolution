import React from 'react';

export function Register() {
    
    // Register Control
    async function createUser() {
        create(`/api/auth/create`);
    }
    
    async function create(endpoint) {
        const username = document.querySelector('#username')?.value;
        const password = document.querySelector('#password')?.value;
        const fullname = document.querySelector("#fullname")?.value;
        const email = document.querySelector("#email")?.value;
        const location = document.querySelector("#location")?.value;
        if (username.trim() === "" || password.trim() === "" || fullname.trim() === "" || email.trim() === "" || location.trim() === "" || username.trim() === "" || password.trim() === "") {
            errorMsgEmpty();
            return;
        }
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');
        const todayDate = `${year}-${month}-${day}`;
        const seedsdonated = 0;
        const seedsreceived = 0;
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({
                username: username,
                password: password,
                fullname: fullname,
                email: email,
                location: location,
                membersince: todayDate,
                seedsdonated: seedsdonated,
                seedsreceived: seedsreceived
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response.ok) {
            localStorage.setItem("username", username);
            localStorage.setItem("registered", true);
            localStorage.setItem("registrationMessageDisplayed", false);
            window.location.href = '/';
        } else {
            errorMsgExisting();
        }
    }
    
    function errorMsgExisting() {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Account already exists.";
        errorMessage.classList.add("banner-message");
        errorMessage.classList.add("error-message");
        errorMessage.classList.add("slide-in");
        errorMessage.classList.add("poppins-semibold");
        document.body.insertBefore(errorMessage, document.body.firstChild);
        setTimeout(() => {
            errorMessage.remove();
        }, 4000);
    }
    
    function errorMsgEmpty() {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Please enter all info.";
        errorMessage.classList.add("banner-message");
        errorMessage.classList.add("error-message");
        errorMessage.classList.add("slide-in");
        errorMessage.classList.add("poppins-semibold");
        document.body.insertBefore(errorMessage, document.body.firstChild);
        setTimeout(() => {
            errorMessage.remove();
        }, 4000);
    }
    return (
        <main className='register'>
            <h1>Register</h1>
            <p>Register to donate and save your campaigns!</p>
            <div id="register" className="input-box">
                <input type="text" id="fullname" placeholder="Your Full Name" />
                <input type="text" id="email" placeholder="Your Email" />
                <input type="text" id="location" placeholder="Your City, State" />
                <input type="text" id="username" placeholder="Username" />
                <input type="password" id="password" placeholder="Password" />
                <button className="poppins-semibold" onClick={() => createUser()}>Register</button>
            </div>
        </main>
    );
}