require('dotenv').config()
const { codes } = require('./countryCodes.js')
const express = require('express')
const axios = require('axios')
const app = express()

app.get('/news', async (req, res) => {
    console.log(req.body)
    try {
        const url = `https://newsdata.io/api/1/news?apikey=
                        ${process.env.NEWS_DATA_API_KEY}
                        &country=${'us'}
                        &language=en
                        &full_content=1
                        &image=1
                        &prioritydomain=top
                        `
        const response = await axios.get(url);
        res.json(response.data)
    } catch {
        res.status(500).json({error: 'unable to fetch results'})
    }
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})