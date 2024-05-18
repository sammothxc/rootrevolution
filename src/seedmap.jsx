import React from 'react';

export function Seedmap() {
    return (
        <main>
            <h1>Seed Map</h1>
            <div id="seedmap" className="content-box">
                <div>
                    Seed Map coming soon!
                </div>
                <div id="map" className="visual">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d58890.71827348603!2d-95.204144819453!3d30.05614138602145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1709206078013!5m2!1sen!2sus" width="100%" height="600" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div>
                    RootRevolution's Seed Map is a feature that is currently in development. 
                    This map will allow users to see where seeds have been donated and where 
                    they are needed most. This will allow users to see the impact of their 
                    donations and where they can help the most. This feature will be 
                    available soon, so stay tuned!
                </div>
            </div>
        </main>
    );
}