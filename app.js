const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Route handler for handling API requests with user input
app.get("/", async (req, res) => {
  try {
    const query = req.query.q; // Get the 'q' query parameter from the request URL
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/multi",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTgzOTAwNmFhMjc3MDBkYWViODFiM2Y0YTgzNDdhMyIsInN1YiI6IjYxNzdlMDQyZTlkYTY5MDA0MzQ2MTZlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wp_7YF3VDfg0Kc9bFrsF4oKSm7Ks0AME-PVeq2SB5GM",
      },
      params: {
        query: query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
