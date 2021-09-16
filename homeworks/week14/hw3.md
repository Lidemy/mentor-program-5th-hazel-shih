## 1. 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
(1) DNS 是網域名稱系統，就像是網路世界的電話簿一樣，用來查詢主機的 IP 位置。為什麼會需要查詢 IP 呢？因為一般我們熟悉的有意義的 domain name 不是給電腦看的，所以需要將 domain name 轉成電腦看得懂的形式。舉例來說，當我們從 Google 瀏覽器搜尋列輸入網址(如：https://memes.tw/)後，瀏覽器並不是可以直接找到給我們迷因頁面的主機，必須先將 meme 網址傳給 DNS 伺服器，這時候 DNS 就會找到 domain name 為 https://memes.tw/ 的主機 IP 位置，將 IP 告訴瀏覽器後，瀏覽器會發送 request 給處理迷因頁面資訊的主機，最後這台主機將 response 回傳給瀏覽器，瀏覽器就可以呈現出迷因頁面了。

(2) Google 提供公開的 DNS，對 Google 的好處是可以蒐集使用者的上網記錄，以及一些網路行為數據，如此可以為 Google 在使用者體驗與廣告收益間打造緊密的生態系。像是 Google 制定了一套規則，可以為每一個網站評分，評分的依據將參考 DNS 蒐集的使用者網路數據，分數高的網站將獲得更前面的曝光版位，而商家業主為了讓自己的網站獲得更多曝光，便會向 Google 購買關鍵字廣告，如此為 Google 帶來龐大的廣告收益。

而由於 Google 會定期抓取(爬蟲)網頁的內容，並且將部分資訊紀錄於 DNS 的快取中，對於一般大眾的好處是，在頁面與頁面的請求間，我們可以獲得更快速的載入速度(因為快取的暫存資訊，讓 DNS 不用重新查詢資訊)，除此之外 Google 的 DNS 比起一般網路供應商的 DNS 系統穩定度更高，因此「無法載入」或「連線逾時」的狀況將會大幅下降，整體來說提升了使用者的網路體驗。


## 2. 什麼是資料庫的 lock？為什麼我們需要 lock？
(1) lock 像是一道資料庫的封鎖線，若 transactionA 有設定 lock，則代表當這個 transactionA 正在執行時，與此 transactionA 資料更動(像是寫入、刪除)有關的 row、key、page 甚至是一整個 table，都會被 lock 這個封鎖線拉起來，禁止其他 transaction 更動或讀取封鎖線內的資料(不過在 Shared Mode 下，是允許其他 transaction 讀取資料的)，其他 transaction 必須等待 transactionA 執行完成之後，此時 lock 封鎖線會被解除，transactionB 就可以放心地讀取、寫入或刪除到最新的資料，也不會發生兩 transaction 同時進行結果資料都錯的情況。

(2) 當兩個有關聯 / 會相互影響的 transaction 同時執行時，我們無法確保哪一個 transaction 會先被執行，或者是否成功，若完成順序不如預期或執行失敗，可能導致最後資料錯誤的情況發生，因此需要 lock 把與第一個 transaction 有關的資料封鎖，在第一個 transaction 完成前都不開放其他 transaction 使用這些被封鎖的資料，等到第一個 transaction 完成後，第二個 transaction 才可以拿到被封鎖的資料，如此就可以確定兩個 transaction 都可以獲取到正確的資料，以現實情況來說，可以避免像是「電商商品超賣」、「轉帳資料錯誤」等情況。


## 3. NoSQL 跟 SQL 的差別在哪裡？
SQL 為關聯式資料庫，使用這一類型的資料庫前必須先定義好資料庫的結構、欄位、儲存格式(schema)。SQL 的資料以 record(一般我們看到的 row) 集結成各種 table，而不同的 table 間具有關聯性，如一個電商購物網站的資料庫，裡面有顧客資料表格、商品資訊表格、訂單資訊表格等，我們可以清楚地知道各表關聯為：「顧客」買「商品」產生「訂單」，因此可以藉由表與表間同樣的欄來將各表關聯運用(像是 SQL 中的 join 用來合併資料表)。但由於 SQL 有明確的 schema，因此將無法針對各 record 做客製的更動，使用彈性相對低。

NoSQL 為非關聯式資料庫，它沒有固定的結構(schema-free)，各筆資料集結成 document 而非方方正正的 table，它可以用不同資料格式寫入(像是 text、json、XML 等等)，同時也能針對各筆資料做客製化的更動，使用彈性高。也因為 NoSQL schema-free、高度彈性的特性，讓它的資料關聯性相對 SQL 來說低很多。在實際使用面上，NoSQL 較常使用於複雜的資料，如內容管理系統(Content Management Systems)，像是一個社交論壇網站使用者發布的內容可能不只是純文字，也許帶有圖片、影片，這時沒有固定結構的 NoSQL 就可以很好地儲存這些複雜又動態的資料。


## 4. 資料庫的 ACID 是什麼？
為了確保 transaction 可以順利執行，資料庫系統有四個特性：

(1) 原子性(Atomicity)：
transaction 不可被分割，意即 transaction 中的所有 query 要嘛全部完成，要嘛全部不完成，若執行期間發生錯誤，則此 transaction 會被回滾到尚未執行的狀態。

(2) 一致性(Consistency)：
類似物理中質量守恆的概念，各個 transaction 執行前後不會破壞資料庫的完整性，所有資料的來往都符合規則。

(3) 隔離性(Isolation)：
確保當數個 transaction 同時執行時，彼此間互不干擾，防止 transaction 執行後發生資料不一致的問題。

(4) 持久性(Durability)：
transaction 執行完成後的資料將一直存在，不會因為系統故障而遺失。
