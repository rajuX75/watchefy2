require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors())

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

// Route handler for handling API requests with user input
app.get("/", async (req, res) => {
  try {
    const query = req.query.q; // Get the 'q' query parameter from the request URL
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/multi",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
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
