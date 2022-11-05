const teamsRouter = require('express').Router()
const fetch = require('node-fetch')

const api_key = process.env.API_KEY
const baseURL = 'https://soccer.sportmonks.com/api/v2.0'

const api_token = `?api_token=${api_key}`
const query_params = `&include=squad,stats,fifaranking,coach`

const transform = data => data.data

teamsRouter.get('/:id', (req, res) => {
  const teamId = req.params.id

  fetch(baseURL.concat(`/teams/${teamId}`, api_token, query_params))
    .then(data => data.json())
    .then(json => res.send(transform(json)))
})

module.exports = teamsRouter