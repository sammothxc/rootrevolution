import React from 'react';

export function Campaign() {
    return (
        <main className='campaign'>
            <h1>&lt;campaign name&gt;</h1>
            <h5>&lt;username&gt; in &lt;city, zip&gt;</h5>
            <img src="/placeholder-campaign.jpg" alt="Campaign Picture"/>
            <h3>&lt;campaign description&gt;</h3>
            <p>Seeds Requesting</p>
            <table>
                <thead>
                    <tr>
                        <th>Seed Type</th>
                        <th>Quantity Requesting</th>
                        <th>Donate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>&lt;seed type&gt;</td>
                        <td>&lt;number of seed&gt;</td>
                        <td><input type="number" id="seedQuantity1" min="1" max="10000000" value="1" /><button className="donate small" onClick={() => donateSeeds()}>Donate</button></td>
                    </tr>
                    <tr>
                        <td>&lt;seed type&gt;</td>
                        <td>&lt;number of seed&gt;</td>
                        <td><input type="number" id="seedQuantity2" min="1" max="10000000" value="1" /><button className="donate small" onClick={() => donateSeeds()}>Donate</button></td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}

function donateSeeds() {
    const seedType = 'Seed Type'; // Retrieve seed type from the row if needed
    const seedQuantity = document.getElementById('seedQuantity1').value; // Get the selected quantity
    // Call a function to send the donation data to the server
    let username = localStorage.getItem("username");
    if (!username) {
        msgBanner('Please login to donate seeds.', true);
        return;
    }
    sendDonation(seedType, seedQuantity);
}

function sendDonation(seedType, seedQuantity) {
    // Make a fetch request to send donation data to the server
    fetch('/api/donate', {
        method: 'post',
        body: JSON.stringify({
            seedType: seedType,
            seedQuantity: seedQuantity
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => {
        if (response.ok) {
            // Donation successful
            msgBanner('Thank you for your donation!');
            // You can update the UI to reflect the donation if needed
        } else {
            // Error handling for failed donation
            msgBanner('Failed to donate seeds. Please try again later.', true);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        msgBanner('Failed to donate seeds. Please try again later.', true);
    });
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