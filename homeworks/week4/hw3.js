const request = require('request')
const process = require('process')

const country = process.argv[2]
const baseUrl = 'https://restcountries.eu/rest/v2/name/'

request(`${baseUrl}${country}`,
  (error, response, body) => {
    if (response.statusCode >= 500) { // 處理錯誤 5XX 的情況
      console.log('error', error)
      return
    } else if (response.statusCode >= 400) { // 處理錯誤 4XX 的情況
      console.log('error', error)
      console.log('找不到國家資訊')
      return
    }
    let searchResult
    try {
      searchResult = JSON.parse(body)
    } catch (exception) {
      console.log(exception)
    }
    let output
    for (let i = 0; i < searchResult.length; i++) {
      output = [
        '============',
        `國家：${searchResult[i].name}`,
        `首都：${searchResult[i].capital}`,
        `貨幣：${searchResult[i].currencies[0].code}`,
        `國碼：${searchResult[i].callingCodes}`
      ].join('\n')
      console.log(output)
    }
  })
