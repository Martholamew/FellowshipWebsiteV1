import apiservice from "./apiservice.js";
import endpoints from "./endpoints.js";

//get all of the html elements we need
const dialog = document.getElementById('myDialog');
const movieOverview = document.getElementById('movieOverview');
const originalTitle = document.getElementById('originalTitle')
const confirmationDialog = document.getElementById('confirmationDialog');
const overlay = document.getElementById('overlay');
const confirmMovieText = document.getElementById('confirmMovieText');

//handling the movies that we get back
let movies=[];
let currentIndex = 0;

//eventlisteners for all of the buttons on the page
document.getElementById('nextItem').addEventListener('click', nextMovie);
document.getElementById('previousitem').addEventListener('click', previousMovie);
document.getElementById('showConfirmDialog').addEventListener('click', showConfirmDialog);
document.getElementById('closeDialog').addEventListener('click', closeDialog);
document.getElementById('confirmSave').addEventListener('click', save);
document.getElementById('cancelSave').addEventListener('click', cancel);

const userName=sessionStorage.getItem("userName");

document.getElementById("subheaderentermovie").textContent="Enter your movie selection, "+userName;

document.getElementById('searchMovieForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Prevent the default form submission
   if(userName==null){
        alert("please log in first");
   }
    else{
        // Get the movie name from the input
        const movieName = document.getElementById('movieInput').value;

        // Fetch the movie data
        apiservice.get(endpoints.searchMovie+"/"+movieName).then(data => {
            openDialog(data);});
    }
});

function openDialog(movieData) {
  movies=Array.from(movieData.results);
  currentIndex = 0; // Reset to the first item
  displayCurrentItem();
  dialog.showModal();
}

function nextMovie(){
    currentIndex++; // Move to the next index
  if (currentIndex < movies.length) {
      displayCurrentItem();
  } else {
      currentIndex = 0; // Reset the index
      displayCurrentItem();
  }
};

function previousMovie(){
  currentIndex--; // Move to the previous index
if (currentIndex < movies.length && currentIndex > 0) {
    displayCurrentItem();
} else {
    currentIndex = 0; //reset the index
    displayCurrentItem();
}
};


function closeDialog() {
  dialog.close();
}

function displayCurrentItem() {
  originalTitle.innerHTML = movies[currentIndex].title;
  movieOverview.textContent = movies[currentIndex].overview;
  moviePoster.src = endpoints.tmdbPosterUrl+movies[currentIndex].poster_path;
  moviePoster.style.display = "block"; // Make sure the image is visible
}


function showConfirmDialog(){
  closeDialog();
  overlay.style.display = 'block'; // Show the dark overlay
  confirmationDialog.style.display = 'flex'; // Show the confirmation dialog
  confirmMovieText.innerHTML=="User, are you sure "+movies[currentIndex].title+" is your pick of the week?";

};

// Function to close the confirmation dialog
function cancel(){
  overlay.style.display = 'none'; // Hide the overlay
  confirmationDialog.style.display = 'none'; // Hide the confirmation dialog
};

// Function to confirm deletion (for demo purposes, it just closes the confirmation)
function save(){
  overlay.style.display = 'none'; // Hide the overlay
  confirmationDialog.style.display = 'none'; // Hide the confirmation dialog
  const data = {
    userId: sessionStorage.getItem("userId"),
    originalTitle: movies[currentIndex].title,
    overview: movies[currentIndex].overview,
    posterURL: endpoints.tmdbPosterUrl+movies[currentIndex].title
  };
  apiservice.post(endpoints.saveMovie, data).then(responseText => {
    if(responseText === true || responseText === "true") {
      alert("we did it");
    }
    else{
        alert("We couldn't save your selection. Fuck.");
    }
    location.reload();
  });

};
