const standingsRouter = require('express').Router()
const fetch = require('node-fetch')

const api_key = process.env.API_KEY
const baseURL = 'https://soccer.sportmonks.com/api/v2.0'
const { seasonID } = require('../utils/leagueManager')


standingsRouter.get('/', (req, res) => {
  const standings_endpoint = `/standings/season/${seasonID}`
  const api_token = `?api_token=${api_key}`

  const transform = data => data.data

  fetch(baseURL.concat(standings_endpoint, api_token))
    .then(data => data.json())
    .then(json => res.send(transform(json)))
})

module.exports = standingsRouter