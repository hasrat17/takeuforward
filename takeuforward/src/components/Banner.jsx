import React, { useState } from 'react';
import CountdownTimer from './CountdownTimer';

const Banner = ({ visible, description, link, imageUrl, countdownTime, wait }) => {
    const [celebrate, setCelebrate] = useState(false);

    const handleTimeUp = () => {
        setCelebrate(true);
    };

    if (!visible) return null;

    return (
        <div className={`banner ${celebrate ? 'celebrate' : ''}`}>
            {celebrate ? (
                <div className="celebration">
                    <h2>Congratulations!</h2>
                    <p>The countdown has ended!</p>
                </div>
            ) : (
                <>
                    {imageUrl && (
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <img src={imageUrl} style={{height:200, width:300}} alt="Banner" className="banner-image" />
                        </a>
                    )}
                    <h2>{description}</h2>

                    {/* here i am using that wait if to handle what to display in counter */}
                    {wait? null :<CountdownTimer timeLeft={countdownTime} onTimeUp={handleTimeUp} />} 
                </>
            )}
        </div>
    );
};

export default Banner;
