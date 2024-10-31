import apiservice from "./apiservice.js";
import endpoints from "./endpoints.js";

//this is hardcoded, but should be pulled from the admin database
const users = new Array(252, 254, 253);

//will be populated by the initial call to get movies associated to users
const movieTitles = new Array();


document.addEventListener('DOMContentLoaded', () => {
    getMovieForUsers();
});

function setUserName(){
}

function getMovieForUsers() { // Execute first
        for (let i = 0; i < users.length; i++) {
            const apiPromise = apiservice.post(endpoints.movieByUser, users[i])
                .then(responseText => {
                    document.getElementById('movieTitle' + i).textContent = responseText.originalTitle;
                    document.getElementById("movieDescription" + i).textContent = responseText.overview;
                    document.getElementById("movieImage" + i).setAttribute('src', responseText.posterURL);
                    getPlayInformation(i,responseText.originalTitle)
                })
                .catch(error => {
                    console.error('Error fetching movie data:', error);
                    reject(error); // Reject the promise if any API call fails
                });
        }
    };

//get the playback info once we have queried for the rating_key
function getPlayInformation(index, movieTitle){        
        apiservice.get(endpoints.tautulliPlayCount+movieTitle).then(data => {
            const plays = document.createElement("h5");
            const playsContent = document.createTextNode("Number of plays "+data.response.data[3].total_plays);
            plays.appendChild(playsContent);
            
            const time = document.createElement("h5");
            const timeContent = document.createTextNode(secondsToHms(data.response.data[3].total_time));
            time.appendChild(timeContent);
            
            const element = document.getElementById("numberofplays"+index);//this seems not ideal
            element.appendChild(plays);
            element.appendChild(time);
        })    
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

