const resultsRouter = require('express').Router()
const fetch = require('node-fetch')
const sortByDateAndFilter = require('../utils/sortByDateAndFilter')

const api_key = process.env.API_KEY
const baseURL = 'https://soccer.sportmonks.com/api/v2.0'

let today = new Date().toISOString().slice(0, 10)

const { leagueID, startDate } = require('../utils/leagueManager')
const results_endpoint = `/fixtures/between/${startDate}/${today}`
const api_token = `?api_token=${api_key}`
const query_params = `&leagues=${leagueID}&include=localTeam,visitorTeam`

const transform = data => sortByDateAndFilter(data.data, {
  filterDate: today,
  filterOut: 'fixtures'
})

resultsRouter.get('/', (req, res) => {
  fetch(baseURL.concat(results_endpoint, api_token, query_params))
    .then(data => data.json())
    .then(json => res.send(transform(json).slice().reverse()))
})

module.exports = resultsRouter