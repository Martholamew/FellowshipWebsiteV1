import apiservice from "./apiservice.js";
import endpoints from "./endpoints.js";

const welcomeText = document.getElementById("welcomeText");

//these names should stay static. Could be moved to a constants file if need be, like the endpoints.js
const textNames = [
    "welcomeText",
    "movieGenre",
    "themeAffirmation"
]

document.addEventListener('DOMContentLoaded', () => {
    populateText();
});

function populateText(){
    for (const textName of textNames) {
        apiservice.get(endpoints.getTextByName+textName).then(data => {
            console.log(data.textValue);
            document.getElementById(textName).textContent=data.textValue;        
        });
    }   

}