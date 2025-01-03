
const endpoints = {
    tmdbPosterUrl: "https://image.tmdb.org/t/p/original/",
    saveMovie: "currentmovie/savemovie",
    searchMovie:"tmdb/searchmovie",
    movieByUser: "currentmovie/moviebyuser",
    userLogin: "user/login",
    userSignUp: "user/register",
    tautulliPlayCount: "tautulli/playcount?movieTitle=",
    users: "user/allusers",
    textValues: "text/get",
    updateText: "text/updatetext",
    getTextByName: "text/textbyname?nameOfValue=",
    getDisplayOrder: "admin/getdisplayorder",
    updateDisplayOrder: "admin/updatedisplayorder",
    saveRating: "rating/saveRating",
    getRating: "rating/getRating",
    getAllRatingsWithUser: "rating/getAllRatingsWithUser"
};

export default endpoints;