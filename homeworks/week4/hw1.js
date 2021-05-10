const request = require('request')

const baseUrl = 'https://lidemy-book-store.herokuapp.com/'

request(`${baseUrl}books?_limit=10`,
  (error, response, body) => {
    if (response.statusCode >= 500) { // 處理錯誤 5XX 的情況
      console.log('error', error)
      return
    } else if (response.statusCode >= 400) { // 處理錯誤 4XX 的情況
      console.log('error', error)
      return
    }
    // 針對來自外部的文件做小心處理(如果文件本不是 JSON 字串就會有問題)
    let books
    try {
      books = JSON.parse(body)
    } catch (exception) {
      console.log(exception)
    }
    for (let i = 0; i < books.length; i++) {
      console.log(`${books[i].id} ${books[i].name}`)
    }
  })
