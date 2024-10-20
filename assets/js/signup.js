import apiservice from "./apiservice.js";
import endpoints from "./endpoints.js";

document.getElementById('dataform').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value
    };

   apiservice.post(endpoints.userSignUp, data).then(responseText => {
        var name =document.getElementById('name').value;
        if(responseText === true || responseText === "true"){
            alert("thanks for signing up "+ name);
            sessionStorage.setItem("registereduser", responseText);
            sessionStorage.setItem("userName", name)
        }
        else{
            alert("You've already signed up " + name)
        }
        
        //location.reload();

    })
    .catch((error) => {
        console.error('Error:', error);
    });
});