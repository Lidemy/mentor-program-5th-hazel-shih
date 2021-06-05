## 1. 什麼是 Ajax？
是執行非同步 JavaScript 與發送請求給 Server(與 Server 進行資料交換)的方法的統稱。若執行同步 JavaScript，每次 Client 端發送請求給 Server 時，必須等待 Server 讀取請求並且傳送 response 回來後，程式碼才會繼續執行，其他 JavaScript 程式碼就像下圖的阿北，只能在一旁靜靜等待，無法執行任何動作。
![](https://i.imgur.com/acEKq6F.jpg)

執行同步 JavaScript 會對使用者體驗造成很大的影響，舉例來說，當用戶在網頁中點擊「瀏覽更多」，必須等待 Server 將 response 傳給 Client 後，才能看到整個完好的畫面，也就是說空的可能不只是「瀏覽更多」區塊，也許畫面的其他部分都無法成功載入，即使點擊畫面中的其他元素也不會有任何反應。

這時候就需要 Ajax 的幫忙，透過執行非同步 JavaScript 或發送非同步請求給 Server，我們就可以不要像阿北一樣乾等 Server 給我們 Response，可以先執行與此 response 無關的所有程式碼，像是其他畫面、其他 request，等到 Server 的 response 後，我們預先寫好處理 response 的程式碼也會立即被執行，如此可以減少用戶的等待時間、畫面不需要反覆重新整理，就可以得到我們想要的資訊。

## 2. 用 Ajax 與我們用表單送出資料的差別在哪？
使用表單送出資料後，Server 會將 response 傳給瀏覽器，瀏覽器會將 response 渲染出來，如此會導致畫面的重整(換頁)，假設今天我們只是想要向 Server 獲取一些資料(Method = GET)，即使是微小的變動仍會導致畫面重整，如此也會對使用者體驗帶來負面影響。

若使用 Ajax 送出資料，當瀏覽器送出 request 給 Server，Server 接收到後，會將 response 傳給瀏覽器，但此時的瀏覽器並不會將 response 渲染出來，反而會將 response 傳給瀏覽器上的 JavaScript，我們可以透過 JavaScript 對 response 做儲存、處理，如此就不會導致煩人的換頁，還能立即針對 response 做後續的處理與應用。

## 3. JSONP 是什麼？
由於透過瀏覽器發送 request 會因同源政策，而產生跨網域的問題，而 JSONP 就是運用不受同源政策約束的 &lt;script src="..."></script&gt;，讓我們可以將 JavaScript 寫在 script 標籤中 url 的位置，便可以在不同源的狀況下存取跨網域 API。

## 4. 要如何存取跨網域的 API？
(1) 發送請求的 Client 端與 API 網站同源(兩者具有相同協定、同埠口、同主機位置)
(2) Server 回傳的 response header 中有加上 Access-Control-Allow-Origin，也就是遵循 Cross-Origin Resource Sharing (跨來源資源共享) 的規範，註明接受哪些 request header、Method，像是若有註明 Access-Control-Allow-Origin:*，即代表任何來源皆可存取 API。

## 5. 為什麼我們在第四週時沒碰到跨網域的問題，這週（觀看 JS102 影片的時候）卻碰到了？
第四週所學習到的是用 JavaScript 透過自己的電腦，直接發 request 給 Server，而 Server 也會直接把 response 傳回電腦，中間並不會經過其他媒介(作業系統除外)；但本週學習的是透過瀏覽器發送 request 給 Server，瀏覽器本身因為安全性考量預設有同源政策，因此瀏覽器會將 Server 回傳的 response 擋下來，不會傳給 JavaScript，除非 Client 與 API 網站同源，或是 response header 中有註明 Access-Control-Allow-Origin，否則我們是無法拿到 response。總而言之，因為是透過預設有同源政策的瀏覽器發 request，所以才會有跨網域的問題。