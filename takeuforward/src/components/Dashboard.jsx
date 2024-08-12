import React, { useState } from 'react';

const Dashboard = ({
    setBannerVisible,
    setBannerDescription,
    setCountdownTime,
    setBannerLink,
    setBannerImageUrl,
    updateBanner,
}) => {
    const [description, setDescription] = useState('');
    const [time, setTime] = useState();
    const [link, setLink] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleUpdate = () => {

        // to update in database calling this function with all the input values and setting all values to null
        updateBanner(description, time, link, imageUrl);
        setDescription('');
        setTime();
        setLink('');
        setImageUrl('');
    };

    return (
        <div className="dashboard">
            <form action='/' onSubmit={handleUpdate}>
            <h3>Dashboard Controls</h3>
            <button onClick={() => setBannerVisible(prev => !prev)}>Toggle Banner</button>
            
                <div>

                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Timer (seconds):</label>
                    <input
                        required
                        type="number"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <div>
                    <label>Link URL:</label>
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <button >Save Changes</button>
            </form>
        </div >
    );
};

export default Dashboard;
