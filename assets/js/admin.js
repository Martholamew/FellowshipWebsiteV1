import apiservice from "./apiservice.js";
import endpoints from "./endpoints.js";

console.log("admin.js loaded");

const selectedText = document.getElementById("textSelect");
const nameOfValue = document.getElementById("nameOfValue");
const textValue = document.getElementById("textValue");
const textId =  document.getElementById("textId");


document.addEventListener('DOMContentLoaded', () => {
    populateUserDropdown();
    populateTextDropdown();
});


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('textValues');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const data = {
            nameOfValue: document.getElementById("nameOfValue").innerHTML,
            textValue: document.getElementById("textValue").value,
            id: document.getElementById("textId").textContent
        };

        apiservice.post(endpoints.updateText, data).then(responseText => {
            if (responseText === true) {
                alert("Change to text was made");
            }
        });
    });
});


// Add event listener for change on the text values drop down
selectedText.addEventListener("change", function() {
    // Get the selected option's text
    const selectedOption = JSON.parse(selectedText.options[selectedText.selectedIndex].value);
    // Display the selected option's text
    nameOfValue.textContent =  selectedOption.nameOfValue;
    textValue.textContent = selectedOption.textValue;
    textId.textContent = selectedOption.id;
});



// Populate the dropdown with usernames
function populateUserDropdown() {
    const dropdown = document.getElementById('usernameSelect');

    apiservice.get(endpoints.users).then(users => {
        // Clear the current options
        dropdown.innerHTML = '';

        // Add a default option
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Select a User';
        defaultOption.value = '';
        dropdown.appendChild(defaultOption);

        // Add each user as an option in the dropdown
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id; // Use user ID as value
            option.textContent = user.name; // Display username
            dropdown.appendChild(option);
        });
    });
}

    function populateTextDropdown() {

        const dropdown = document.getElementById('textSelect');
        apiservice.get(endpoints.textValues).then(textValues => {
            // Clear the current options
            dropdown.innerHTML = '';
    
            // Add a default option
            const defaultOption = document.createElement('option');
            defaultOption.textContent = 'Select a Text Value';
            defaultOption.value = '';
            dropdown.appendChild(defaultOption);
    
            // Add each user as an option in the dropdown
            textValues.forEach(text => {
                const option = document.createElement('option');
                option.value = JSON.stringify(text); // Use user ID as value
                option.textContent = text.nameOfValue; // Display username
                dropdown.appendChild(option);
            });
        });
}
