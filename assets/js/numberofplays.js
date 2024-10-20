import apiservice from "./apiservice.js";
import endpoints from "./endpoints.js";

document.addEventListener('DOMContentLoaded', () => {
    const ratingKey1 = document.getElementById('param1').value;
    const ratingKey2 = document.getElementById('param2').value;
    const ratingKey3 = document.getElementById('param3').value;
    const ratingKeys = new Array(ratingKey1, ratingKey2, ratingKey3);

    for(let i=0;i<ratingKeys.length;i++){
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
});

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

