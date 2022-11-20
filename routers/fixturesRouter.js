const fixturesRouter = require('express').Router()
const fetch = require('node-fetch')
const sortByDateAndFilter = require('../utils/sortByDateAndFilter')

const api_key = process.env.API_KEY
const baseURL = 'https://soccer.sportmonks.com/api/v2.0'
const { leagueID, endDate } = require('../utils/leagueManager')

fixturesRouter.get('/', (req, res) => {
  let today = new Date().toISOString().slice(0, 10)
  
  const fixtures_endpoint = `/fixtures/between/${today}/${endDate}`
  const api_token = `?api_token=${api_key}`
  const query_params = `&leagues=${leagueID}&include=localTeam,visitorTeam`

  const transform = data => sortByDateAndFilter(data.data, { filterOut: 'results' })

  fetch(baseURL.concat(fixtures_endpoint, api_token, query_params))
  .then(data => data.json())
  .then(json => res.send(transform(json)))
})

module.exports = fixturesRouter