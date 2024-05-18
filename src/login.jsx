import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();

    async function loginUser() {
        login(`/api/auth/login`);
    }
    
    async function login(endpoint) {
        const username = document.querySelector('#username')?.value;
        const password = document.querySelector('#password')?.value;
        if (username.trim() === "" || password.trim() === "") {
            errorMsgEmpty();
            return;
        }
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response.ok) {
            localStorage.setItem("username", username);
            localStorage.setItem("registrationMessageDisplayed", "true");
            window.location.href = '/';
        } else {
            const body = await response.json();
            errorMsgIncorrect();
        }
    }
    
    return (
        <main className='login'>
            <h1>Login</h1>
            <p>Login or register to donate and save your campaigns!</p>
            <div id="login" className="input-box">
                <input type="text" autocomplete="on" id="username" placeholder="Username" />
                <input type="password" autocomplete="on" id="password" placeholder="Password" />
                <button className="poppins-semibold" onClick={() => loginUser()}>Login</button>
            </div>
            <br />
            <div id="register-btn" className="register poppins-semibold">
                <p>Don't have an account?</p>
                <button className="poppins-semibold" onClick={() => navigate('/register')}>Register</button>
            </div>
        </main>
    );
}