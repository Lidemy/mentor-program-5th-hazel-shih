const request = require('request')
const process = require('process')

const searchCountry = process.argv[2]

request(`https://restcountries.eu/rest/v2/name/${searchCountry}`,
  (error, response, body) => {
    const data = JSON.parse(body)
    const statusCode = response && response.statusCode
    if (statusCode === 404) {
      console.log('找不到國家資訊')
    } else {
      const output = [
      `國家：${data[0].name}`,
      `首都：${data[0].capital}`,
      `貨幣：${data[0].currencies[0].code}`,
      `國碼：${data[0].callingCodes}`
      ].join('\n')
      console.log(output)
    }
  })
