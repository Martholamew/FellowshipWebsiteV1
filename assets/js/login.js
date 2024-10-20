import apiservice from "./apiservice.js";
import endpoints from "./endpoints.js";

document.getElementById('dataform').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value
    };
    apiservice.post(endpoints.userLogin,data).then(responseText => {
        var name =document.getElementById('name').value;
       if(responseText.length!=0){
            alert("Thanks for loggin in "+ name);
            sessionStorage.setItem("userName", name);
            sessionStorage.setItem("userId", responseText.id);
        }
        else{
            alert("You havent signed up "+name+ ", how about you do?")
        }
    })
});