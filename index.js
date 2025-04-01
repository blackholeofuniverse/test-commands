const express = require('express')

const app = express()

const PORT = 3000

app.get('/', (req, res) => {
    res.send("Hello there!")
})

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})