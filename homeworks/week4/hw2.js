const request = require('request')
const process = require('process')

const command = process.argv[2]

switch (command) {
  case 'list':
    // node hw2.js list // 印出前二十本書的 id 與書名
    request(
      'https://lidemy-book-store.herokuapp.com/books?_limit=20',
      (error, response, body) => {
        const data = JSON.parse(body)
        for (let i = 0; i <= 19; i++) {
          console.log(`${data[i].id} ${data[i].name}`)
        }
      }
    )
    break

  case 'read':
    // node hw2.js read 1 // 輸出 id 為 1 的書籍
    request(
      `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
      (error, response, body) => {
        const data = JSON.parse(body)
        console.log(data.name)
      }
    )
    break

  case 'delete':
    // node hw2.js delete 1 // 刪除 id 為 1 的書籍
    request.delete(
      `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
      console.log(`為您刪除 ID 為 ${process.argv[3]} 的書籍成功！`)
    )
    break

  case 'create':
    // node hw2.js create "I love coding" // 新增一本名為 I love coding 的書
    request.post({
      url: 'https://lidemy-book-store.herokuapp.com/books/',
      form: {
        id: process.argv[4],
        name: process.argv[3]
      }
    },
    console.log(`為您新增 ${process.argv[3]} 書籍成功！此書籍 ID 為：${process.argv[4]}`)
    )
    break

  case 'update':
    // node hw2.js update 1 "new name" // 更新 id 為 1 的書名為 new name
    request.patch({
      url: `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
      form: {
        id: process.argv[3],
        name: process.argv[4]
      }
    },
    console.log(`已將 id 為 ${process.argv[3]} 的書名更新為 ${process.argv[4]}！`)
    )
    break
}
