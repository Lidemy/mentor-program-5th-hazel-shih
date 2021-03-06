## 1. 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
(1) 雜湊與加密最大的差別在於，透過加密的密文可以被解密，但透過雜湊後的密文無法被解開，即使得知密文也無法知道原始的明文是什麼，因此相對於加密，雜湊的安全性比較高。

(2) 之所以密碼要經過雜湊才存入資料庫，主要目的是為了提升安全性。當資料庫存入的是密碼明文，若很不幸的某天資料庫外洩，則駭客不費一點力氣就可以得到使用者的帳戶資訊，甚至拿這組帳戶去別的網站嘗試，一舉攻破數個網站；當資料庫存入的是經過雜湊後的密文，即使資料庫外洩被駭客得知整段密文，駭客仍無法知道原始的密碼明文是什麼(正確來說是「比較難」知道)，因為密碼已經經過雜湊處理。

若今天是一個很有心的駭客，擁有一份自製的 rainbow table，可以透過比對常見明文密碼雜湊後的結果，加上數次的電腦計算與排列組合，可能就可以猜到明文或是利用「雜湊碰撞」得出有相同密文結果的一組字串，如此還是可以成功盜用使用者的帳戶。但雜湊碰撞的機率極小，電腦計算也需要經過非常龐大的次數(2017 年 GOOGLE 攻破 SHA-1 雜湊法可是經過九百萬兆次的計算呢 XD)，所以不需要太過於擔心雜湊的安全性，因為成功的機率可以說是幾乎不可能。

## 2. include、require、include_once、require_once 的差別
include 與 require 在 php 中皆是在檔案中引入其他檔案的功能，透過使用它們可以減少程式碼的重複，在改動程式碼僅需改變被引入的檔案，而不需要逐頁修改。兩者唯一的不同是當發生錯誤時(如找不到引入的檔案)，include 只會產生一個警告(warning)，並且程式會繼續執行，而 require 會產生重大錯誤(fatal error)，程式不會繼續執行，所以在引入一些比較重要的檔案時，如課堂中與資料庫連線的 conn.php 的檔案，使用 require 會比較好，不然資料庫沒有連線往下執行程式也沒有意義。

include_once 與 include、require_once 與 require 幾乎相同，唯一的不同是 include_once 與 require_once 會先檢查此檔案是否已經引入過將要被引入的檔案，如此可以避免重複引入，若引入的檔案中涉及變數改動，則重複引入可能導致錯誤，include_once、require_once 即可避免此類錯誤的發生。

## 3. 請說明 SQL Injection 的攻擊原理以及防範方法
SQL Injection 是在頁面中使用者可以輸入的地方(form)，透過輸入片段的資料庫指令，與開發者事先寫好的資料庫指令拼湊起來，變成一段完整的資料庫指令，當寫好片段指令並送出 form 的資料，而後端沒有進行驗證或防禦，這段惡意的資料庫指令便會被執行，可能導致資料庫外洩或使用者身份被偽造等情況發生。

防範方法為讓將要被存入資料庫的資料成為參數，讓 query 不會被當成指令，而是成為一段字串。透過資料庫支援的「prepared statement」，我們可以將 query 中寫入的資料(來自使用者的輸入)以 "?" 替代，再使用 "bind_param" 將成為參數的資料綁入 query 中，再被執行，如此可以確保整段 query 都是字串，即使駭客輸入惡意字串，query 不會立刻被執行，而是以字串的方式呈現，如此就可以避免 SQL Injection 的攻擊。

## 4. 請說明 XSS 的攻擊原理以及防範方法
XSS 攻擊就是在頁面中使用者可以輸入的地方(form)，透過輸入惡意的 html 或 JS 程式碼並送出這些字串後，若後端沒有進行資料驗證，直接讓程式執行，可能導致使用者 cookie 資訊被竊取、網頁畫面被更動、駭客置入惡意連結等情況發生。

防範方法為讓在網頁中顯示使用者輸入的資料處，以跳脫字元的方式來處理字串，即使駭客輸入惡意的 html 或 JS 程式碼，程式碼中的 "<"、">"、單引號等都會被解析成其他字元代替，而在網頁中顯現出來的樣子就會是字串，而不會是程式碼，如此可以避免 XSS 的攻擊。


## 5. 請說明 CSRF 的攻擊原理以及防範方法
現今網站多以 cookie / session 存取使用者資訊(如登入狀態、會員權限等)，透過 cookie / session 這個驗證，可以讓使用者在同個網站(網域)不被重複進行身份驗證(不需要重複登入)，讓網站去辨別每一位使用者。

而 CSRF 就是透過「在同個網域下，瀏覽器會自動幫使用者帶上 Cookie」這個機制，讓使用者在不知情的情況下，對網站執行一些動作。常見手法為駭客發送釣魚網站連結給使用者，而網站中藏匿看不見的網站連結(如將連結嵌在隱藏圖片裡)，如此就可以盜用使用者的 cookie / session 資訊，讓網站誤以為是該使用者執行請求，嚴重的話可能導致使用者資料被竄改、網銀網站金錢被轉出等問題。

目前 Chrome 與 Opera 瀏覽器有內建 SameSite，可以藉由使用者頁面是否經過跳轉等判別方法來得知發自伺服器的 request 是否為跨站請求，若是的話，則瀏覽器並不會主動帶上 Cookie，有效地避免 CSRF 的攻擊。

但上述的方法目前僅在 Chrome 與 Opera 瀏覽器有內建，在其他瀏覽器可能還是有遭受 CSRF 的風險，而且若後端什麼都不做僅依靠瀏覽器的內建機制，顯然是一種消極的做法，有幾種可以降低遭受 CSRF 攻擊風險的方法：

(1) 設定好 Cookie 的存活期間：由於 CSRF 是利用瀏覽器存 Cookie 的機制來冒充使用者身份，因此若後端設定隔一段時間清除帶有使用者資訊的 Cookie，就可以降低被 CSRF 攻擊的機會(當然，身為使用者的我們，也要養成瀏覽完畢就登出的好習慣才行～)

(2) 傳統的驗證碼驗證：對於使用者不安全的請求(如刪除、財務流動等)，後端應再多進行驗證。如許多電商網站對於使用者刷卡這項請求，會將驗證碼寄送到使用者手機，使用者必須輸入對應的驗證碼才能讓刷卡動作確實被執行，即使今天很不幸地被駭客 CSRF 假冒使用者刷卡，駭客也無法得知確切的手機驗證碼，因此多層驗證將降低 CSRF 的發生。但若網站中有過多此種輸入驗證碼的驗證方式，可能造成網站使用者體驗不佳，因此需要考量其使用時機。

(3) Synchronizer Token Pattern：後端預先在使用者送出請求的 form 中加入一個保密且唯一的 token(雜湊過更美味)，當使用者送出資料後，此 token 會被送到後端進行驗證，驗證通過後此請求才會順利被送出。有了這個 token，即使是來自 CSRF 的惡意請求，也會因沒有 token 而驗證失敗，無法成功發送此請求。
