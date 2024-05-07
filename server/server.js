require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());

app.get("/news", async (req, res) => {
  try {
    const url = `https://newsdata.io/api/1/news?apikey=
                        ${process.env.NEWS_DATA_API_KEY}
                        &country=${req.query.country}
                        &language=en      
                        &image=1
                        &category=top,politics
                        `;
    const response = await axios.get(url);
    console.log(url);
    res.json(response.data);
  } catch {
    res.status(500).json({ error: "unable to fetch results" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
