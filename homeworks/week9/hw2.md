## 1. 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
VARCHAR 最多可存取長度為 65,535 的字串，並且可以設定它的存取字串長度(length default)；TEXT 比起 VARCHAR 能存取長度更長的字串，最多可存取 2^16-1 個字元的字串，但無法去設定它的存取字串長度。

## 2. Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？
(1) Cookie 是一個小型文字檔案，通常是在 user 造訪網站或點擊廣告時被建立，用於記錄 user 的瀏覽資訊(如登入資訊、興趣偏好)，如此可以讓 user 有更好的網路使用體驗(如可以順利地使用網站中的會員功能、容易看到與興趣相符的廣告或內容推薦)。
(2) 當瀏覽器發出 HTTP request 給 server 後，server 會將 cookie 設定好，夾帶在 HTTP response header 中，此時這個 cookie 就存在瀏覽器內，待之後 user 瀏覽此網站的其他網頁後，瀏覽器會幫我們將 cookie 帶在 request header 中，如此 server 收到這個 request 看到 request header 中的 cookie 資訊後，就會知道是特定使用者在造訪網站了。

## 3. 我們本週實作的留言板，你能夠想到什麼潛在的問題嗎？
沒有去驗證使用者透過表單傳來的留言內容，若使用者傳來一段惡意的 JS code 或 html，留言板 server 因為沒有驗證就執行了這段 code，輕則影響網站畫面，重則可能會有其他留言板使用者資料被竊取的問題。



