// apiService.js
const apiservice = {
    baseUrl: window.location.hostname === "localhost"
      ? "http://localhost:8080/"
      : "https://fellowshipbackend.onrender.com",
  
    // GET request method
    async get(endpoint) {      
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          method: "GET",
        });
          if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
  
        // Parse the JSON response
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error:", error);
        throw error; 
      }
    },
  
    // POST request method 
    async post(endpoint, data) {
      console.log("here is the endpoint "+endpoint);
      console.log("here is the data "+data);
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), 
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
  
        // Parse the JSON response
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        console.error("Error:", error);
        throw error; 
      }
    }
  };
  
  export default apiservice;
  