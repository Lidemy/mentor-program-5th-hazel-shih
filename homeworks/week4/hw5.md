## 請以自己的話解釋 API 是什麼
---
API(Application Interface)，全名為應用程式介面，從名稱來解析的話，就是當你需要「應用」他人撰寫的「程式」時，透過這個「介面」，讓你得以有權限去使用來自外部的資料；反之，也是當別人需要「應用」你撰寫的「程式」時，透過這個「介面」，讓他人有權限去使用你的資料，這是一個雙方的溝通，並不是單向的。

舉實際的例子來說，為什麼[天氣即時預報](https://apps.apple.com/tw/app/%E5%A4%A9%E6%B0%A3%E5%8D%B3%E6%99%82%E9%A0%90%E5%A0%B1/id1277710469)這個 app 上面能顯現這麼漂亮的天氣數據？該不會背後的那些工程師都邊打扣邊拿溫度計、風速儀在蒐集天氣資料吧？
![](https://i.imgur.com/4zqoESm.png)

當然不是啊～這些工程師是利用中央氣象局蒐集的資料，才能顯現出這樣精準又可信的數據。

你說為什麼他們可以使用中央氣象局的資料？

因為中央氣象局製作並且開放了 [API](https://opendata.cwb.gov.tw/dist/opendata-swagger.html)，API 上已經幫你整理好你可以用的資料，且氣象局網站中也有一份「API 文件」告訴你如何使用 API，以及你的使用權限，如此才能讓資料安全且有規範地被運用。當你在自己的程式中引入了這個 API，在有人需要氣象局的資料時，透過 API，氣象局的伺服器就會把你要的資料送來給你囉！


總而言之言而總之，API 是一個讓雙方可以交換資料的媒介啦 :P


## 請找出三個課程沒教的 HTTP status code 並簡單介紹
---
### 1. 429 Too Many Requests
Client 在短時間內發送過多的 request，讓伺服器覺得很異常，所以先不給你用。
![](https://i.imgur.com/zbHcOQ8.png)
### 2. 503 Service Unavailable
伺服器目前無法使用，通常是正在維護中或伺服器過載的暫時狀況。
![](https://i.imgur.com/MAScUYe.png)
### 3. 406 Not Acceptable
根據 Client 送出的請求中的 headers，某些內容不被伺服器接受 / 支援，這些內容如：內容類型 (Content-Type)、內容編碼 (Content-Encoding)、內容語言 (Content-Language)、內容位置 (Content-Location)等。
![](https://i.imgur.com/NcfNYpp.png)

** 狗狗圖片來源：https://httpstatusdogs.com/


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。
---

### 開始使用「呷扒霸」API

#### 一、呷扒霸 API 介紹：
呷扒霸美食平台提供資料與工具讓開發人員使用，您可以透過 API 來進行取得餐廳資料或修改餐廳資料等動作。

#### 二、開始使用 API 前的設置：
請先註冊成為平台「開發者」會員，經過信箱認證您的帳號後，系統將自動寄出您的「Client ID」。之所以會需要大家有 ID，是因為我們需要得知每一次發送請求的是來自哪位開發人員，有了這一層身份的認證將會確保大家使用 API 時更暢通無虞。


#### 三、您可以透過 API 進行以下動作：

API 的 endpoint：
`GET` https://api.jiababa.hazel

##### (一) 回傳所有餐廳資料
`GET` /restaurants
| 參數          | 說明                                   | 範例    |
| ------------- | -------------------------------------- | --- |
| limit         | 限制最多回傳的資料，預設為回傳全部筆數      | /restaurants?limit=10     |

##### (二) 回傳單一餐廳資料
`GET` /restaurants/id
| 參數 | 說明 | 範例     |
| ---- | ---- | -------- |
| 無   | 回傳 id 為 17 的餐廳資料   | /restaurants/17 |

##### (三) 刪除餐廳 
`DELETE` /restaurants/id
| 參數 | 說明 | 範例     |
| ---- | ---- | -------- |
| 無 | 透過您的 Client ID 取得授權，刪除 id 為 17 的餐廳資料          |/restaurants/17     |
＊您可以於「Request header (Client-ID: XXXXX)」夾帶您的 Client ID，以讓系統授權給您進行刪除動作

##### (四) 新增餐廳 
`POST` /restaurants
| 參數 | 說明 | 範例     |
| ---- | ---- | -------- |
| 無 | 透過您的 Client ID 取得授權，新增一筆新餐廳資料          |/restaurants    |
＊您可以於「Request header (Client-ID: XXXXX)」夾帶您的 Client ID，與「Request body」夾帶新餐廳的名稱(name: XXXX)，以讓系統授權給您進行新增動作


##### (五) 更改餐廳 
`PATCH` /restaurants/id
| 參數 | 說明 | 範例     |
| ---- | ---- | -------- |
| 無 | 透過您的 Client ID 取得授權，對 id 為 17 的餐廳資料進行更改          |/restaurants/17    |
＊您可以於「Request header (Client-ID: XXXXX)」夾帶您的 Client ID，與「Request body」夾帶餐廳的新名稱(name: XXXX)，以讓系統授權給您進行更改動作


#### 四、我們給您的 Response：

都是 application/json 形式的檔案！長醬子：

````
{
    "data": [
        {
            "name": "A-yi! I don't want to keep going",
            "restaurant_id": "88888",
            "is_live": true,
            "customer_per_month": "9487",
            "started_at": "2021-05-07"
        }
    ],
    "pagination": {}
}

````

大概是這樣，祝您使用 API 愉快喔 <3
