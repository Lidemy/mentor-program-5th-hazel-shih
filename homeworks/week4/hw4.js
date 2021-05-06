const request = require('request')

request(
  {
    url: 'https://api.twitch.tv/kraken/games/top',
    headers: {
      'Client-ID': '5h0cpu5wohpm88atbxwccndu8uzwrr',
      Accept: 'application/vnd.twitchtv.v5+json'
    }
  },
  (error, response, body) => {
    const data = JSON.parse(body)
    for (let i = 0; i <= 9; i++) {
      const viewersData = data.top[i].viewers
      const gameName = data.top[i].game.name
      console.log(`${viewersData} ${gameName}`)
    }
  }
)
