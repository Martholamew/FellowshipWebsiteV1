 // Function to perform the GET request
 async function getNumberOfPlays(div,ratingKey) {
    const url = 'https://fellowshipbackend.onrender.com/astautulli/playcount?ratingKey='+ratingKey; 

    try {
        const response = await fetch(url); // Making the GET request
        if (!response.ok) { // Check if the response is successful
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse the JSON data
        console.log(data);
        
        document.getElementById(div).innerHTML = "Number of plays "+data.response.data[3].total_plays+secondsToHms(data.response.data[3].total_time);;

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
    return "</br>"+hDisplay + mDisplay + sDisplay ; 
}

