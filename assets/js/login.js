import apiservice from "./apiservice.js";
import endpoints from "./endpoints.js";

document.getElementById('dataform').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    const data = {
        userName  : document.getElementById('name').value,
        password: document.getElementById('password').value
    };
    apiservice.post(endpoints.userLogin,data).then(responseText => {
        alert(responseText.message);
        const token = responseText.token; 
        console.log(responseText);
        if(token!=null){
          const decodedToken = parseJwt(token);
          sessionStorage.setItem("jwtToken", token); 
          sessionStorage.setItem("userId", decodedToken.userId); 
          sessionStorage.setItem("userName", decodedToken.userName); 

        }
    })
});

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
    );
    return JSON.parse(jsonPayload);
}