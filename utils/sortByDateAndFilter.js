function sortByDateAndFilter(matches, options) {
  const allDates = matches.map((match) => match.time.starting_at.date)
  const dates = new Set(allDates)

  const matchesByDate = []
  dates.forEach((date) => {
    if(options && options.filterDate === date) {
      if (options.filterOut === 'results') {
        const filtered = matches.filter((match) => {
          match.time.status === 'NS'
        })
        if (filtered.length) {
          matchesByDate.push(selectByDate(filtered, date))
        }
      }
      if (options.filterOut === 'fixtures') {
        const filtered = matches.filter((match) => {
          match.time.status !== 'NS'
        })
        if (filtered.length) {
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