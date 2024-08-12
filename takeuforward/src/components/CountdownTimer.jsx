import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ timeLeft, onTimeUp }) => {
    const [time, setTime] = useState(timeLeft);

    useEffect(() => {
        if (time <= 0) {
            onTimeUp();
            return;
        }

        const intervalId = setInterval(() => {
            setTime(time - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [time, onTimeUp]);

    if (time <= 0) {
        return <span>Time's up!</span>;
    }

    const formatTime = (time) => {
        const days = parseInt( time / (24 * 3600)); 
        time = time % (24 * 3600); 
        const hours = parseInt(time / 3600); 
        time %= 3600; 
        const minutes = parseInt(time / 60); 
        time %= 60; 
        const seconds = time;
        // const minutes = Math.floor(time / 60);
        // const seconds = time % 60;
        return `${days} Day : ${hours} Hours : ${minutes} Minutes: ${seconds < 10 ? '0' : ''}${seconds} Seconds`;
    };

    return <div className="countdown-timer">{formatTime(time)}</div>;
};

export default CountdownTimer;
