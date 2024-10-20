import apiservice from "./apiservice.js";
import endpoints from "./endpoints.js";

const data = {
    userId: 102
};

document.addEventListener('DOMContentLoaded', () => { 
    apiservice.post(endpoints.movieByUser,data).then(responseText => {
        console.log(responseText);
    })
})