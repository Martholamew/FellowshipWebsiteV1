// apiService.js
const apiservice = {
    baseUrl: window.location.hostname === "localhost"
      ? "http://localhost:8080/"
      : "https://fellowshipbackend.onrender.com",
  
    // GET request method
    async get(endpoint) {
      console.log(`${this.baseUrl}${endpoint}`);
      
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          method: "GET",
        });
  
        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
  
        // Parse the JSON response
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error:", error);
        // Implement proper error handling logic here (e.g., re-throw or return an error object)
        throw error; // You can return a value here depending on how you want to handle errors
      }
    },
  
    // POST request method (refactored with async/await)
    async post(endpoint, data) {
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Send the payload (data)
        });
  
        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
  
        // Parse the JSON response
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        console.error("Error:", error);
        // Implement proper error handling logic here
        throw error; // You can return an error object here instead of re-throwing
      }
    }
  };
  
  export default apiservice;
  