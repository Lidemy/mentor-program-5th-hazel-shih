const request = require('request')
const process = require('process')

const command = process.argv[2]
const baseUrl = 'https://lidemy-book-store.herokuapp.com'
if (command === 'list') {
  listBook(20)
} else if (command === 'read') {
  readBook(process.argv[3])
} else if (command === 'delete') {
  deleteBook(process.argv[3])
} else if (command === 'create') {
  createBook(process.argv[3])
} else if (command === 'update') {
  updateBook(process.argv[3], process.argv[4])
} else {
  console.log('你的指令輸入錯誤')
}

function listBook(bookCounts) {
  request(`${baseUrl}/books?_limit=${bookCounts}`,
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
}

function readBook(bookID) {
  request(`${baseUrl}/books/${bookID}`,
    (error, response, body) => {
      if (response.statusCode >= 500) { // 處理錯誤 5XX 的情況
        console.log('error', error)
        return
      } else if (response.statusCode >= 400) { // 處理錯誤 4XX 的情況
        console.log('error', error)
        return
      }
      let books
      try {
        books = JSON.parse(body)
      } catch (exception) {
        console.log(exception)
      }
      console.log(books.name)
    })
}

function deleteBook(bookID) {
  request.delete(`${baseUrl}/books/${bookID}`,
    (error, response, body) => {
      if (response.statusCode >= 500) { // 處理錯誤 5XX 的情況
        console.log('error', error)
        return
      } else if (response.statusCode >= 400) { // 處理錯誤 4XX 的情況
        console.log('error', error)
        return
      }
      console.log(`刪除ID為${bookID}的書籍成功！`)
    })
}

function createBook(bookName) {
  request.post({
    url: `${baseUrl}/books`,
    form: {
      name: bookName
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
    console.log(`為您新增書名為${bookName}的書籍成功`)
  })
}

function updateBook(bookID, bookName) {
  request.patch({
    url: `${baseUrl}/books/${bookID}`,
    form: {
      name: bookName
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
    console.log(`為您修改ID為${bookID}的書籍名稱至${bookName}成功！`)
  })
}
