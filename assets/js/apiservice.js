const apiservice = {
    baseUrl: window.location.hostname === "localhost"
      ? "http://localhost:8080/"
      : "https://fellowshipbackend.onrender.com/", 
  
    // GET request method
    async get(endpoint) {      
      try {
        const gettoken = sessionStorage.getItem("jwtToken"); // Or from sessionStorage if stored there
        console.log("tokie time "+gettoken)
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          method: "GET",
          headers: {                 // Use the headers object to add headers
              "Authorization": `Bearer ${gettoken}`,
              "Content-Type": "application/json",
            },
            credentials: 'include'
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
      try {
        const posttoken = sessionStorage.getItem("jwtToken"); 
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${posttoken}`
          },
          body: JSON.stringify(data), 
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
          const responseData = await response.json();
          return responseData;
      
      } catch (error) {
        console.error("Error:", error);
        throw error; 
      }
    }
  };

 
  
export default apiservice;
  