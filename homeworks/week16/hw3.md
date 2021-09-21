# week16 hw3
Q：請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
````
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
````
A：依序印出：
undefined
5
6
20
1
10
100

---

1. 開始執行 global scope 的程式碼，產生 global EC，開始處理 global VO 的初始化動作：
````
global EC
global VO {
  fn: function,
  a: undefined
}
````
2. 將 a 賦值為 1
````
global EC
global VO {
  fn: function,
  a: 1
}
````
3. 執行 fn function，產生 fn function EC，開始處理 fn function AO 的初始化動作：
````
fn EC
fn AO {
  fn2: function,
  a: undefined
}
````
4. 此時 fn scope 的 a 為 undefined，因此最先印出 undefined。
5. 將 a 賦值為 5，並印出 a，此時印出的 a 是 5。
````
fn EC
fn AO {
  fn2: function,
  a: 5
}
````
6. a++ 後，此時的 a 為 6，下一行再次宣告 a 變數，但因為 fn 的 AO 裡已經有 a 的 property，因此對 a 不會有任何改動。
````
fn EC
fn AO {
  fn2: function,
  a: 6
}
````
7. 執行 fn2，產生 fn2 function EC，開始處理 fn2 function AO 的初始化動作（因為沒有任何參數代入、沒有 function 與 變數的宣告，因此 AO 裡沒有 property）：
````
fn2 EC
fn2 AO {
  
}
````
8. fn2 AO 裡沒有任何 a，因此往上一層找，找到 fn VO 裡有 a，a 為 6，印出 6。
7. fn2 AO 裡沒有任何 a 與 b，因此往上一層找，將 fn VO 裡的 a 賦值為 20，又 fn VO 裡也沒有 b，因此再往上一層 global VO 找，也沒有 b，將 b 設定為全域變數並賦值 100。
````
global EC
global VO {
  fn: function,
  a: 1,
  b: 100
}
````

````
fn EC
fn AO {
  fn2: function,
  a: 20
}
````
10. fn2 執行完畢，功德圓滿，fn2 EC 與 AO 消失，接下來印出 a，fn AO 裡的 a 值為 20，印出 20。
11. fn 執行完畢，功德圓滿，fn EC 與 AO 消失。
12. 印出 a，此時 global VO 裡的 a 為 1，因此印出 1。
13. 將 a 賦值為 10。
````
global EC
global VO {
  fn: function,
  a: 10,
  b: 100
}
````
14. 印出 a，此時 global VO 裡的 a 為 10，因此印出 10。
15. 印出 b，此時 global VO 裡的 b 為 100，因此印出 100。
16. 整個 call stack 執行完畢。