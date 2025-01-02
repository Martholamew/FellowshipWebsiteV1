import apiservice from "./apiservice.js";
import endpoints from "./endpoints.js";

function createMovieTable() {
    apiservice.get(endpoints.getAllRatingsWithUser)
        .then(responseText => {
            const movieCategories = {};
            const userNames = new Set();

            // Group ratings by category and store all user ratings for each movie
            responseText.forEach(entry => {
                // Group movies by category
                if (!movieCategories[entry.category]) {
                    movieCategories[entry.category] = [];
                }

                // Check if the movie already exists in the category
                let movie = movieCategories[entry.category].find(m => m.title === entry.movieTitle);

                // If the movie doesn't exist, add a new entry for it
                if (!movie) {
                    movie = {
                        title: entry.movieTitle,
                        posterURL: entry.posterURL,
                        userRatings: {}
                    };
                    movieCategories[entry.category].push(movie);
                }

                // Add the rating for the current user
                movie.userRatings[entry.userName] = entry.rating;

                // Collect unique user names
                userNames.add(entry.userName);
            });

            // Convert userNames to an array for consistent ordering
            const userNamesArray = Array.from(userNames);

            // Populate the table
            const tableBody = document.querySelector("tbody");
            const headerRow = document.getElementById("header-row");

            // Create the header row with 'Category', 'Movie Name', and user ratings columns
            headerRow.innerHTML = ""; // Clear previous header row if any

            const thCategory = document.createElement("th");
            thCategory.textContent = "Category";
            headerRow.appendChild(thCategory);

            const thMovie = document.createElement("th");
            thMovie.textContent = "Movie Name";
            headerRow.appendChild(thMovie);

            // Add user columns for ratings
            userNamesArray.forEach(userName => {
                const th = document.createElement("th");
                th.textContent = `${userName} Rating`;
                headerRow.appendChild(th);
            });

            // Populate rows for each category
            tableBody.innerHTML = ""; // Clear previous rows if any
            for (const category in movieCategories) {
                movieCategories[category].forEach(movie => {
                    const movieRow = document.createElement("tr");

                    // Add Category cell
                    const categoryCell = document.createElement("td");
                    categoryCell.textContent = category;
                    movieRow.appendChild(categoryCell);

                    // Add Movie Name
                    const movieCell = document.createElement("td");
                    movieCell.textContent = movie.title;
                    movieRow.appendChild(movieCell);

                    // Add ratings for each user
                    userNamesArray.forEach(userName => {
                        const ratingCell = document.createElement("td");

                        // Check if the current movie has a rating by the current user
                        const rating = movie.userRatings[userName];

                        // Display the rating or "No rating"
                        if (rating !== undefined) {
                            ratingCell.textContent = rating;
                        } else {
                            ratingCell.textContent = "No rating";
                        }

                        movieRow.appendChild(ratingCell);
                    });

                    tableBody.appendChild(movieRow);
                });
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}



// Call the function to create the table
createMovieTable();
