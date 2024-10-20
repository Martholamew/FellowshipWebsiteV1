function logout(){
    sessionStorage.clear()
    alert("You've logged out. See you real soon");
    location.reload();
}