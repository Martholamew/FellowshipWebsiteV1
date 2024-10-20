// apiService.js
const apiservice = {
    baseUrl: window.location.hostname === "localhost"
      ? "http://localhost:8080/"
      : "https://yourproductionurl.com/api",
  
    // GET request method
    get: function (endpoint) {
      return fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
      })
      .then(response => response.json())
      .catch(error => console.error("Error:", error));
    },
  
    // POST request method
    post: function (endpoint, data) {
      return fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send the payload (data)
      })
      .then(response => response.json())
      .catch(error => console.error("Error:", error));
    }
  };
  
  export default apiservice;
  