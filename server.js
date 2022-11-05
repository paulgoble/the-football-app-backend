require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const fixturesRouter = require('./routers/fixturesRouter')
const resultsRouter = require('./routers/resultsRouter')
const standingsRouter = require('./routers/standingsRouter')
const teamsRouter = require('./routers/teamsRouter')

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/fixtures', fixturesRouter)
app.use('/results', resultsRouter)
app.use('/standings', standingsRouter)
app.use('/teams', teamsRouter)

const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})