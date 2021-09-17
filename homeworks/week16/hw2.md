# week16 hw2
Q：請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

````
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
````
A：輸出
i: 0
i: 1
i: 2
i: 3
i: 4
5
(並在接下來的四秒內，每秒輸出一個 5)
5
5
5
5

---

1. 開始執行 call stack 中的 main thread。
2. `for 迴圈` 進入 call stack，準備執行第一圈迴圈。
3. i = 0，開始執行第一圈迴圈：
(1) `console.log('i: ' + i)` 進入 call stack，此時 i 為 0，因此印出 i: 0，將 `console.log('i: ' + i)` 從 call stack 移除。
(2) `setTimeout` 進入 call stack，將計時器委由瀏覽器執行，瀏覽器計時為 0*1000 = 0s，此時位於 call stack 的 `setTimeout` 執行完畢，pop 出 call stack。
(3) 由於計時時間為 0 秒，代表「盡快執行」，因此計時器僅會在瀏覽器停留極短暫的時間，計時完成後，把 `() => {console.log(i)}` 置於 callback queue。
(!) 補充說明，第 3-(3) 點是與第 4 點同步執行的，互不相干。
4. i = 1，開始執行第二圈迴圈：
(1) `console.log('i: ' + i)` 進入 call stack，此時 i 為 1，因此印出 i: 1，將 `console.log('i: ' + i)` 從 call stack 移除。
(2) `setTimeout` 進入 call stack，將計時器委由瀏覽器執行，瀏覽器計時為 1*1000 = 1s，此時位於 call stack 的 `setTimeout` 執行完畢，pop 出 call stack。
(3) 位在瀏覽器的計時器開始計時 1s。(1s 過後，自動把 `() => {console.log(i)}` 置於 callback queue。)
(!) 補充說明，第 4-(3) 點是與第 5 點同步執行的，互不相干。
5. i = 2，開始執行第三圈迴圈：
(1) `console.log('i: ' + i)` 進入 call stack，此時 i 為 2，因此印出 i: 2，將 `console.log('i: ' + i)` 從 call stack 移除。
(2) `setTimeout` 進入 call stack，將計時器委由瀏覽器執行，瀏覽器計時為 2*1000 = 2s，此時位於 call stack 的 `setTimeout` 執行完畢，pop 出 call stack。
(3) 位在瀏覽器的計時器開始計時 2s。(2s 過後，自動把 `() => {console.log(i)}` 置於 callback queue。)
(!) 補充說明，第 5-(3) 點是與第 6 點同步執行的，互不相干。
6. i = 3，開始執行第四圈迴圈：
(1) `console.log('i: ' + i)` 進入 call stack，此時 i 為 3，因此印出 i: 3，將 `console.log('i: ' + i)` 從 call stack 移除。
(2) `setTimeout` 進入 call stack，將計時器委由瀏覽器執行，瀏覽器計時為 3*1000 = 3s，此時位於 call stack 的 `setTimeout` 執行完畢，pop 出 call stack。
(3) 位在瀏覽器的計時器開始計時 3s。(3s 過後，自動把 `() => {console.log(i)}` 置於 callback queue。)
(!) 補充說明，第 6-(3) 點是與第 7 點同步執行的，互不相干。
7. i = 4，開始執行第五圈迴圈：
(1) `console.log('i: ' + i)` 進入 call stack，此時 i 為 4，因此印出 i: 4，將 `console.log('i: ' + i)` 從 call stack 移除。
(2) `setTimeout` 進入 call stack，將計時器委由瀏覽器執行，瀏覽器計時為 4*1000 = 4s，此時位於 call stack 的 `setTimeout` 執行完畢，pop 出 call stack。
(3) 位在瀏覽器的計時器開始計時 4s。(4s 過後，自動把 `() => {console.log(i)}` 置於 callback queue。)
(!) 補充說明，第 7-(3) 點是與第 8 點同步執行的，互不相干。
8. i = 5，不進入迴圈，現有的 main thread 執行完畢。
9. 眼尖的 Event Loop 發現 call stack 為空，開心地把 callback queue 中的 `() => {console.log(i)}` 移至 call stack 執行，執行時 call `console.log(i)` (此時的 i 是 5(由於 `() => {console.log(i)}` 的 scope 中找不到 i，因此往上一層的 for 迴圈 scope 存取 i)，因此印出 5。將 `console.log(i)` 從 call stack 中移除，隨後 `() => {console.log(i)}` 這個 function 也從 call stack 中移除。
10. 重複 9 步驟直到 callback queue 中的 `() => {console.log(i)}` 都被移至 call stack，而 call stack 中的 `console.log(i)` 也順利執行完畢。因此又再依序印出了四個 5。
11. callback queue 和 call stack 皆為空，任務完成，皆大歡喜。