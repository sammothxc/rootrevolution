import React from 'react';
import { useEffect } from 'react';

export function About() {
    useEffect(() => {
        displayQuote();
        return () => {
        };
    }, []);
    return (
        <main>
            <h1>About RootRevolution</h1>
            <div id="about" className="content-box">
                <img src="/placeholder-about.jpg" alt="About Picture"/>
                <div>
                    RootRevolution put simply is a seed crowdfunder- the farmer friendly 
                    fundraising website that the world has been waiting for. Inspired by 
                    my family members who always have leftover seeds and don't know what 
                    to do with them, RootRevolution is a crowdfunding-based website where 
                    users with a surplus of seeds can donate their unsused seeds towards 
                    any cause, whether it be a community-focused or a global movement. 
                    That way, you can participate and be a part of something bigger 
                    without having to donate costly supplies or spend lots of money. 
                    RootRevolution connects you with anyone who has a need for seed, from 
                    solo-sowers and school gardens to larger community and global 
                    humanitarian organizations so that they can get the supplies they 
                    need to make a difference in any way from simply teaching valuable 
                    agricultural lessons or fighting hunger by providing food for those 
                    who need it most.
                </div>
                <br />
                <hr />
                <br />
                <div id="carbon">
                </div>
            </div>
        </main>
    );
}

function displayQuote(data) {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#carbon');
  
        const quoteEl = document.createElement('div');
        quoteEl.classList.add('quote');
        const authorEl = document.createElement('div');
        authorEl.classList.add('author');
  
        quoteEl.textContent = `"${data.content}"`;
        authorEl.textContent = `- ${data.author}`;
  
        containerEl.appendChild(quoteEl);
        containerEl.appendChild(authorEl);
    });
}