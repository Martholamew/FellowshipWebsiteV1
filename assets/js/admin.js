import apiservice from "./apiservice.js";
import endpoints from "./endpoints.js";


document.addEventListener('DOMContentLoaded', () => {
populateDropdown();
});


function fetchUsernames() {
    return new Promise((resolve) => {
        apiservice.get(endpoints.users).then(responseText => {
          const users=responseText;
          resolve(users);
        }).catch(error => {
            console.error('Error fetching movie data:', error);
            reject(error); // Reject the promise if any API call fails
        });
   });
}

// Populate the dropdown with usernames
function populateDropdown() {
    const dropdown = document.getElementById('usernameSelect');

    fetchUsernames().then(users => {
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
