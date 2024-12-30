import apiservice from "./apiservice.js";
import endpoints from "./endpoints.js";

document.addEventListener('DOMContentLoaded', async () => {
    const users = await getUserDisplayOrder(); // Wait for the users to be populated
    getMovieForUsers(users); // Then execute the function with the populated array
});

async function getUserDisplayOrder() {
    const users = new Array();

    // Wait for the API call to finish before processing the result
    const displayOrders = await apiservice.get(endpoints.getDisplayOrder);
    
    // Sort the displayOrders by displayOrder. we will match the main page order
    displayOrders.sort((a, b) => a.displayOrder - b.displayOrder);

    // Push the userId of each order into the users array
    displayOrders.forEach((order) => {
        users.push(order.userId);
    });

    return users; 
}

function getMovieForUsers(users) {
    for (let i = 0; i < users.length; i++) {
        const apiPromise = apiservice.post(endpoints.movieByUser, users[i])
            .then(responseText => {
                const movieTitle = responseText.originalTitle;
                const posterURL = responseText.posterURL;

                // Create a container for each movie
                const movieContainer = document.createElement('div');
                movieContainer.classList.add('movie-item');
                movieContainer.style.display = 'grid';
                movieContainer.style.gridTemplateColumns = '1fr 2fr';
                movieContainer.style.gap = '20px';
                movieContainer.style.marginBottom = '20px';

                // Create the poster image element
                const posterDiv = document.createElement('div');
                const posterImg = document.createElement('img');
                posterImg.src = posterURL;
                posterImg.alt = movieTitle;
                posterImg.style.width = '100%';
                posterImg.style.borderRadius = '8px';
                posterDiv.appendChild(posterImg);

                // Create the movie title and rating section
                const titleAndRatingDiv = document.createElement('div');
                titleAndRatingDiv.style.display = 'flex';
                titleAndRatingDiv.style.flexDirection = 'column';

                // Create the rating slider
                const ratingLabel = document.createElement('label');
                ratingLabel.textContent = 'Rate this movie:';
                titleAndRatingDiv.appendChild(ratingLabel);

                const slider = document.createElement('input');
                slider.type = 'range';
                slider.min = '0';
                slider.max = '5';
                slider.step = '0.1';
                slider.value = '2.5';
                slider.classList.add('slider');
                slider.style.marginBottom = '10px';
                slider.style.width = 'calc(100% - 20px)'; // Ensure it doesn't touch the right edge
                slider.style.marginRight = '10px'; // Add some right margin


                const sliderValue = document.createElement('div');
                sliderValue.textContent = slider.value;
                sliderValue.classList.add('slider-value');
                slider.addEventListener('input', function() {
                    sliderValue.textContent = slider.value;
                });

                titleAndRatingDiv.appendChild(slider);
                titleAndRatingDiv.appendChild(sliderValue);

                // Append poster and title/rating section to the movie container
                movieContainer.appendChild(posterDiv);
                movieContainer.appendChild(titleAndRatingDiv);

                // Append the movie container to the main movie list
                document.getElementById('movie-list').appendChild(movieContainer);
            })
            .catch(error => {
                console.error('Error fetching movie data:', error);
            });
    }
}
