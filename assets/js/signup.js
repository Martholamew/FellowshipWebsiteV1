import apiservice from "./apiservice.js";
import endpoints from "./endpoints.js";

document.getElementById('dataform').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value

    };
   apiservice.post(endpoints.userSignUp, data).then(responseText => {
        alert(responseText.message);
        if(responseText.userId!=0){
            sessionStorage.setItem("registereduser", responseText);
            sessionStorage.setItem("userName", responseText.name);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});