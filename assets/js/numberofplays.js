 // Function to perform the GET request
 async function getNumberOfPlays(div,ratingKey) {
    const url = 'https://fellowshipbackend.onrender.com/tautulli/playcount?ratingKey='+ratingKey; 

    try {
        const response = await fetch(url); // Making the GET request
        if (!response.ok) { // Check if the response is successful
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse the JSON data

        const plays = document.createElement("h5");
        const playsContent = document.createTextNode("Number of plays "+data.response.data[3].total_plays);
        plays.appendChild(playsContent);

        const time = document.createElement("h5");
        const timeContent = document.createTextNode(secondsToHms(data.response.data[3].total_time));
        time.appendChild(timeContent);

        const element = document.getElementById(div);
        element.appendChild(plays);
        element.appendChild(time);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay ; 
}

