import apiservice from "./apiservice.js";
import endpoints from "./endpoints.js";

document.addEventListener('DOMContentLoaded', async () => {
    const users = await getUserDisplayOrder(); // Wait for the users to be populated
    getMovieForUsersandGenerateHTML(users); // Then execute the function with the populated array
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
function getCurrentRatings(users){
    for (let i = 0; i < users.length; i++) {
        const apiPromise = apiservice.post(endpoints.getCurrentRatings, users[i])
            .then(responseText => {}

            )
        }
}

function getMovieForUsersandGenerateHTML(users) { //this is messy, should refactor
    // Loop through each user
    users.forEach(user => {
        // Get movie data for the user
        apiservice.post(endpoints.movieByUser, user)
            .then(responseText => {
                const movieTitle = responseText.originalTitle;
                const posterURL = responseText.posterURL;
                const movieId = responseText.id;
                const userId = sessionStorage.getItem("userId");

                const userMovie = {
                    userId: userId,
                    movieId: movieId
                };

                // Get the current rating for the movie
                apiservice.post(endpoints.getCurrentRatings, userMovie)
                    .then(ratingDTO => {
                        const ratingScore = ratingDTO ? ratingDTO : 0; // Default to 0 if no rating exists
                        // Create the movie container
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

                        // Create the rating label
                        const ratingLabel = document.createElement('label');
                        ratingLabel.textContent = 'Rate this movie:';
                        titleAndRatingDiv.appendChild(ratingLabel);

                        // Create the rating slider
                        const slider = document.createElement('input');
                        slider.type = 'range';
                        slider.min = '0';
                        slider.max = '5';
                        slider.step = '0.1';
                        slider.value = ratingScore; // Set the value to the fetched rating
                        slider.classList.add('slider');
                        slider.style.marginBottom = '10px';
                        slider.style.width = 'calc(100% - 20px)'; // Ensure it doesn't touch the right edge
                        slider.style.marginRight = '10px';

                        // Display the slider value
                        const sliderValue = document.createElement('div');
                        sliderValue.textContent = slider.value;
                        sliderValue.classList.add('slider-value');
                        slider.addEventListener('input', function() {
                            sliderValue.textContent = slider.value;
                        });

                        // Create the submit button for the rating
                        const submitButton = document.createElement('button');
                        submitButton.textContent = 'Submit Rating';
                        submitButton.onclick = function() {
                            const rating = slider.value;
                            if (userId) {
                                const ratingData = {
                                    userId: userId,
                                    movieId: movieId,
                                    rating: rating
                                };
                                apiservice.post(endpoints.saveRating, ratingData)
                                    .then(() => {
                                        alert(`Thank you for rating ${movieTitle} with a score of ${rating}`);
                                    })
                                    .catch(error => {
                                        console.error('Error submitting rating:', error);
                                        alert('Error submitting rating');
                                    });
                            } else {
                                alert('Please log in to submit a rating.');
                            }
                        };

                        // Append the slider and submit button to the title and rating div
                        titleAndRatingDiv.appendChild(slider);
                        titleAndRatingDiv.appendChild(sliderValue);
                        titleAndRatingDiv.appendChild(submitButton);

                        // Append poster and title/rating section to the movie container
                        movieContainer.appendChild(posterDiv);
                        movieContainer.appendChild(titleAndRatingDiv);

                        // Append the movie container to the movie list
                        document.getElementById('movie-list').appendChild(movieContainer);
                    })
                    .catch(error => {
                        console.error('Error fetching the rating:', error);
                        // You can choose to set a default rating value if no rating is found
                    });
            })
            .catch(error => {
                console.error('Error fetching movie data:', error);
            });
    });
}
