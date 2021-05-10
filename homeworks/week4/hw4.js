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
    if (response.statusCode >= 500) { // 處理錯誤 5XX 的情況
      console.log('error', error)
      return
    } else if (response.statusCode >= 400) { // 處理錯誤 4XX 的情況
      console.log('error', error)
      return
    }
    let gameData
    try {
      gameData = JSON.parse(body)
    } catch (exception) {
      console.log(exception)
    }
    const topGames = gameData.top
    let viewersData
    let gameName
    for (let i = 0; i < topGames.length; i++) {
      viewersData = topGames[i].viewers
      gameName = topGames[i].game.name
      console.log(`${viewersData} ${gameName}`)
    }
  }
)
