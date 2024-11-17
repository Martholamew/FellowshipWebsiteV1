import apiservice from "./apiservice.js";
import endpoints from "./endpoints.js";

const selectedText = document.getElementById("textSelect");
const nameOfValue = document.getElementById("nameOfValue");
const textValue = document.getElementById("textValue");
const textId =  document.getElementById("textId");


document.addEventListener('DOMContentLoaded', () => {
    populateUserDropdown();
    populateTextDropdown();
    getDisplayOrder();
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


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('textValues');
    form.addEventListener('displayOrders', function (event) {
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

function getDisplayOrder() {
    const displayOrder1 = document.getElementById('displayOrder1');
    const displayOrder2 = document.getElementById('displayOrder2');
    const displayOrder3 = document.getElementById('displayOrder3');
    const dropDowns = [displayOrder1, displayOrder2, displayOrder3];

    // First, populate each dropdown with user options
    apiservice.get(endpoints.users).then(users => {
        dropDowns.forEach(dropdown => {
            if (dropdown) {
                dropdown.innerHTML = '';
                const defaultOption = document.createElement('option');
                defaultOption.textContent = 'Select a User';
                defaultOption.value = '';
                dropdown.appendChild(defaultOption);

                users.forEach(user => {
                    const option = document.createElement('option');
                    option.value = String(user.id);  // Ensure value is a string
                    option.textContent = user.userName;
                    dropdown.appendChild(option);
                });
            }
        });

        // After dropdowns are populated, set the selected option based on displayOrders
        apiservice.get(endpoints.getDisplayOrder).then(displayOrders => {
            displayOrders.forEach((order, index) => {
                const dropdown = dropDowns[index];
                if (dropdown) {
                    const matchingOption = dropdown.querySelector(`option[value="${String(order.userId)}"]`);
                    if (matchingOption) {
                        matchingOption.selected = true;
                    }
                }
            });
        });
    });
}



// Populate the dropdown with usernames - i can use this for both assigning roles and assiging display order
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
            option.textContent = user.userName; // Display username
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
