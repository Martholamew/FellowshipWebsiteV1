import apiservice from "./apiservice.js";
import endpoints from "./endpoints.js";

//this is hardcoded, but should be pulled from the admin database
const users = new Array(252, 253, 254);




document.addEventListener('DOMContentLoaded', () => {
    getMovieForUsers().then(getPlayInformation);
});

function setUserName(){
}

function getMovieForUsers() { // Execute first
    const promises = []; // Array to store all promises from the loop
    return new Promise((resolve, reject) => {

        for (let i = 0; i < users.length; i++) {
            const apiPromise = apiservice.post(endpoints.movieByUser, users[i]).then(responseText => {
                console.log(responseText.posterURL);
                document.getElementById('movieTitle'+i).textContent = responseText.originalTitle;
                document.getElementById("movieDescription"+i).textContent = responseText.overview;
                document.getElementById("movieImage"+i).setAttribute('src', responseText.posterURL);
            }).catch(error => {
                console.error('Error fetching movie data:', error);
                reject(error); // Reject the promise if any API call fails
            });
            promises.push(apiPromise); // Store the promise in the array
        }

        // Wait for all API calls to complete
        Promise.all(promises)
            .then(() => {
                resolve(); // Resolve the main promise after all API calls complete
            })
            .catch(error => {
                reject(error); // Reject the main promise if any error occurs
            });
    });
}

//i hit this after the main page loads so that i can use the titles to find the rating key and generate playback info
function getPlayInformation(){//execute second

    //this can be iterated over from the admin page once it is determined how many and which users to display
    let movieTitle1Element = document.getElementById('movieTitle0');
    let movieTitle2Element = document.getElementById('movieTitle1');
    let movieTitle3Element = document.getElementById('movieTitle2');
    const movieTitle1 = movieTitle1Element.textContent;
    const movieTitle2 = movieTitle2Element.textContent;
    const movieTitle3 = movieTitle3Element.textContent;
    const ratingKeys = new Array(movieTitle1, movieTitle2, movieTitle3);
    for(let i=0;i<ratingKeys.length;i++){
        console.log("this is the first one"+ratingKeys[i]);

        apiservice.get(endpoints.tautulliPlayCount+ratingKeys[i]).then(data => {
            const plays = document.createElement("h5");
            const playsContent = document.createTextNode("Number of plays "+data.response.data[3].total_plays);
            plays.appendChild(playsContent);
            
            const time = document.createElement("h5");
            const timeContent = document.createTextNode(secondsToHms(data.response.data[3].total_time));
            time.appendChild(timeContent);
            
            const element = document.getElementById("numberofplays"+i);//this seems not ideal
            element.appendChild(plays);
            element.appendChild(time);
        })
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

