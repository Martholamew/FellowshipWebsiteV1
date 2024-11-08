import apiservice from "./apiservice.js";
import endpoints from "./endpoints.js";

//get all of the html elements we need
const dialog = document.getElementById('myDialog');
const movieOverview = document.getElementById('movieOverview');
const originalTitle = document.getElementById('originalTitle')
const confirmMovieText = document.getElementById('confirmMovieText');
const input = document.getElementById('search-input');
const resultsContainer = document.getElementById('results');
let movie = {};

document.getElementById("subheaderentermovie").textContent="Enter your movie selection, "+sessionStorage.getItem("userName");

document.getElementById('searchMovieForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Prevent the default form submission
   if(sessionStorage.getItem("userIs")){
        alert("please log in first");
   }
    else{
      console.log("user ID "+sessionStorage.getItem("userId"));
      const data = {
        userId: sessionStorage.getItem("userId"),
        originalTitle: movie.title,
        overview: movie.overview,
        posterURL: endpoints.tmdbPosterUrl+movie.poster_path
      };
      apiservice.post(endpoints.saveMovie, data).then(responseText => {
        if(responseText === true || responseText === "true") {
          alert("Thank you "+ userName+", your selection has been saved.");
        }
        else{
            alert("We couldn't save your selection. Fuck.");
        }
        location.reload();
      });
    }
});

// Function to display search results
function displayResults(results) {
  resultsContainer.innerHTML = ''; // Clear previous results
  // If there are no results
  if (results.length === 0) {
    resultsContainer.innerHTML = '<p>No results found</p>';
    return;
  }

  results=results.slice(0,10);//only display 10 movies
  // Display each result
  results.forEach(item => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');
    resultItem.textContent = item.title; 

    resultItem.addEventListener('click', function() {
      movie=item;
      input.value = item.title; // Set the input field to the selected result
      originalTitle.innerHTML = item.title;
      movieOverview.textContent = item.overview;
      moviePoster.src = endpoints.tmdbPosterUrl+item.poster_path;
      moviePoster.style.display = "block"; // Make sure the image is visible
      resultsContainer.innerHTML = ''; // Clear the results after selection
    }); 

    resultItem.addEventListener('mouseover', function() {
      resultItem.classList.add('highlighted'); // Add highlighted class
    });

    resultItem.addEventListener('mouseout', function() {
      resultItem.classList.remove('highlighted'); // Remove highlighted class
    });
    
    resultsContainer.appendChild(resultItem);
  });
}

// Listen for input changes
input.addEventListener('input', function() {
  const searchQuery = this.value.trim();
  // Only make a request if there's a query
  if (searchQuery.length > 0) {
    apiservice.get(endpoints.searchMovie+"/"+searchQuery).then(data => {
      displayResults(data.results);});
  } else {
    resultsContainer.innerHTML = ''; // Clear results if input is empty
  }
});