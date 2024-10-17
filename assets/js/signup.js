document.getElementById('dataform').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value
    };

    fetch('http://localhost:8080/userssignup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // Let the server know you're sending JSON
            'Accept': 'application/json'         // Expect JSON response from server
        },
        body: JSON.stringify(data)  // Send the object as a JSON string
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(responseText => {
        var name =document.getElementById('name').value;
        if(responseText=="true"){
            alert("thanks for signing up "+ name);
            sessionStorage.setItem("registereduser", responseText);
            sessionStorage.setItem("userName", name)
        }
        else{
            alert("You've already signed up " + name)
        }
        
        location.reload();

    })
    .catch((error) => {
        console.error('Error:', error);
    });
});