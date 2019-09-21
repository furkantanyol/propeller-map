const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const { readdirSync } = require('fs')
const bodyParser = require('body-parser')

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

app.use(bodyParser.json())
app.listen(port, () => console.log(`Listening on port ${port}`))

app.use(express.static('./assets'))

app.post('/tiles_enum', (req, res) => {
  const { folderSrc } = req.body
  res.send({ zoomLevels: getDirectories(folderSrc) })
})
