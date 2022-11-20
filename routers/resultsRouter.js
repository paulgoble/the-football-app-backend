const resultsRouter = require('express').Router()
const fetch = require('node-fetch')
const sortByDateAndFilter = require('../utils/sortByDateAndFilter')

const api_key = process.env.API_KEY
const baseURL = 'https://soccer.sportmonks.com/api/v2.0'
const { leagueID, startDate } = require('../utils/leagueManager')

resultsRouter.get('/', (req, res) => {
  let today = new Date().toISOString().slice(0, 10)

  const results_endpoint = `/fixtures/between/${startDate}/${today}`
  const api_token = `?api_token=${api_key}`
  const query_params = `&leagues=${leagueID}&include=localTeam,visitorTeam`

  const transform = data => sortByDateAndFilter(data.data, { filterOut: 'fixtures' })

  fetch(baseURL.concat(results_endpoint, api_token, query_params))
    .then(data => data.json())
    .then(json => res.send(transform(json).slice().reverse()))
})

module.exports = resultsRouter