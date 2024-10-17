document.getElementById('dataform').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value
    };

    fetch('http://localhost:8080/userslogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
            alert("Thanks for loggin in "+ name);
            sessionStorage.setItem("userName", name)
        }
        else{
            alert("You havent signed up "+name+ ", how about you do?")
        }
        sessionStorage.setItem("registereduser", responseText);
        location.reload();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});