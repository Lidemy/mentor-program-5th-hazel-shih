# week16 hw1
Q：在 JavaScript 裡面，一個很重要的概念就是 Event Loop，是 JavaScript 底層在執行程式碼時的運作方式。請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
````
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
````
Q：程式碼會依序輸出：1 3 5 2 4。

----

1. 開始執行 call stack 中的 main thread。
2. 將 `console.log(1)` 置於 call stack 並執行，印出 1，將 `console.log(1)` 從 call stack 中移除。
3. 將 `setTimeout` 置於 call stack 執行，將計時器委由瀏覽器執行，此時位於 call stack 的 `setTimeout` 執行完畢，pop 出 call stack。由於計時時間為 0 秒，代表「盡快執行」，因此計時器僅會在瀏覽器停留極短暫的時間，計時完成後，把 `() => {console.log(2)}` 置於 callback queue。
4. 將 `console.log(3)` 置於 call stack 並執行，印出 3，將 `console.log(3)` 從 call stack 中移除。
5. 將 `setTimeout` 置於 call stack 執行，將計時器委由瀏覽器執行，此時位於 call stack 的 `setTimeout` 執行完畢，pop 出 call stack。由於計時時間為 0 秒，代表「盡快執行」，因此計時器僅會在瀏覽器停留極短暫的時間，計時完成後，把 `() => {console.log(4)}` 置於 callback queue(順位會在 `() => {console.log(2)}` 後面)。
6. 將 `console.log(5)` 置於 call stack 並執行，印出 5，將 `console.log(5)` 從 call stack 中移除。
7. 目前的 main thread 都執行完畢，call stack 為空。
8. 一直在監測 call stack 是否為空的 Event Loop 發現 call stack 已經空了，便把位於 callback queue 第一順位的 `() => {console.log(2)}` 置於 call stack 並執行，執行時 call `console.log(2)` 印出 2，將 `console.log(2)` 從 call stack 中移除，隨後 `() => {console.log(2)}` 這個 function 也從 call stack 中移除。
9. call stack 再次為空，Event Loop 將 callback queue 裡剩餘的 `() => {console.log(4)}` 置於 call stack 並執行，執行時 call `console.log(4)` 印出 4，將 `console.log(4)` 從 call stack 中移除，隨後 `() => {console.log(4)}` 這個 function 也從 call stack 中移除。
