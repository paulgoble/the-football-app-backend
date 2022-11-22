const e = require("express")

function sortByDateAndFilter(matches, options) {
  const allDates = matches.map((match) => match.time.starting_at.date)
  const dates = new Set(allDates)

  let today = new Date().toISOString().slice(0, 10)

  const matchesByDate = []

  dates.forEach((date) => {
    if(date === today) {
      const filtered = []

      if (options.filterOut === 'results') {
        matches.forEach((match) => {
          if (match.time.starting_at.date === date && match.time.status !== 'FT') {
            filtered.push(match)
          }
        })
        if (filtered.length > 0) {
          matchesByDate.push(selectByDate(filtered, date))
        }
      } else if (options.filterOut === 'fixtures') {
        matches.forEach((match) => {
          if (match.time.starting_at.date === date && match.time.status === 'FT') {
            filtered.push(match)
          }
        })
        if (filtered.length > 0) {
          matchesByDate.push(selectByDate(filtered, date))
        }
      }
    } else {
      matchesByDate.push(selectByDate(matches, date))
    }
  })
  return matchesByDate
}

function selectByDate (allMatches, date) {
  const matches = []
  allMatches.forEach((entry) => {
    if (entry.time.starting_at.date === date) {
      matches.push(entry)
    }
  })
  return { date, matches }
}

module.exports = sortByDateAndFilter