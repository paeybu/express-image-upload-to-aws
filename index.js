const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.send(process.env.ACCESS_KEY_ID))

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})
