# week16 hw4
Q：請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
````
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
````
A：
2
2
undefined

---

1. obj.inner.hello() 可以看成 obj.inner.hello.call(obj.inner)，因此這裡的 this 為 obj.inner，其 value 為 2。
2. obj2.hello() 可以看成 obj2.hello.call(obj2)，因此這裡的 this 為 obj2，又 obj2 === obj.inner，因此其 value 為 2。
3. hello() 可以看成 hello.call()(因為 hello 前面沒有東西)，此時的 this 會因環境不同而有所不同，會是一個全域物件，而全域物件(window or global)的值會是 undefined。