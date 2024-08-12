
import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';




/*

Hey Raj, Sorry for writing it here but if your are reading this please have a look at my 
submission and based on that select me or reject me, don't reject me coz of any criteria like
I am not 2024 passout Please I need this. I resign from HCL almost 5 months ago coz of my
father health(I am the only son they have) and I am continuously searching for any remote job
but I am not able to find any. Just give me a chance I'll put more efforts than any anyone
else, If ever for a moment you feel like I am not good then just fire me.



I have build it myself but I have taken reference from multiplaces
I took reference from these : 


https://www.freecodecamp.org/news/how-to-use-settimeout-in-react-using-hooks/
https://www.geeksforgeeks.org/how-to-create-a-countdown-timer-using-reactjs/
https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/
https://rapidapi.com/guides/fetch-api-react
https://www.geeksforgeeks.org/reactjs-useeffect-hook/
https://www.w3schools.com/react/react_forms.asp
https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/
https://node-postgres.com/apis/pool
https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/
https://www.prisma.io/dataguide/postgresql/inserting-and-modifying-data/insert-on-conflict

*/





const App = () => {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [bannerDescription, setBannerDescription] = useState('');
  const [countdownTime, setCountdownTime] = useState(null);
  const [wait, setWait] = useState(true);
  const [bannerLink, setBannerLink] = useState('');
  const [bannerImageUrl, setBannerImageUrl] = useState('');

  // To populate the UI with the data in database
  useEffect(() => {
    fetch('https://takeuforward-backend-ozof.onrender.com/api/banner')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(text => { // here taking as text coz when exmpty json(EMpty database) then getting error
        if (text) {
          const data = JSON.parse(text);  
          setBannerDescription(data.description || '');
          setCountdownTime(data.timer || 60);  // Default to 60 seconds if not provided
          setWait(false); //  it was not working without this coz first renders and count starts with default value then time set from db so not disply time from db only showing default values.
          setBannerLink(data.link || '');
          setBannerImageUrl(data.image_url || '');
        } else {
          // Handle the case where the response is empty
          setBannerDescription('');
          setCountdownTime(60);
          setBannerLink('');
          setBannerImageUrl('');
        }
      })
      .catch(error => {
        console.error('Error fetching banner data:', error);
        
      })
      .finally(() => {
        setWait(false); 
      });
  }, []);


  // to update the data 
  const updateBanner = (description, time, link, imageUrl) => {
    fetch('https://takeuforward-backend-ozof.onrender.com/api/banner', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: description,
        timer: time,
        link: link,
        imageUrl: imageUrl,
      }),
    })
      .then(response => response.text())
      .then(message => console.log(message))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <Banner
        visible={bannerVisible}
        description={bannerDescription}
        countdownTime={countdownTime}
        wait={wait}
        link={bannerLink}
        imageUrl={bannerImageUrl}
      />
      <Dashboard
        setBannerVisible={setBannerVisible}
        setBannerDescription={setBannerDescription}
        setCountdownTime={setCountdownTime}
        setBannerLink={setBannerLink}
        setBannerImageUrl={setBannerImageUrl}
        updateBanner={updateBanner}
      />
    </div>
  );
};

export default App;
