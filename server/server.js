require('dotenv').config()
const express = require('express')
const app = express()

app.get('/news', (req, res) => {
    const url = 'https://newsapi.org/v2/everything?' +
          'q=Apple&' +
          'from=2024-03-25&' +
          'sortBy=popularity&' +
          `apiKey=${process.env.NEWS_API_KEY}`;
    const newsReq = new Request(url)
    fetch(newsReq)
        .then(response => console.log(response))
        .catch(error => res.status(500).json({foo: 'bar'}))
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})