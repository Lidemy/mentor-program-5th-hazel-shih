# week13 hw4
## Webpack 是做什麼用的？可以不用它嗎？
在開發時我們可能會使用到 npm 的模組，透過語法`module.exports`和`require`來輸出或引用這些資源，但這僅限於開發環境在 node.js 上，因為瀏覽器不支援上述模組引用、輸出的語法。

而 webpack 正是為了解決此問題而生，它可以將開發時所使用的資源，如圖片、js、css 全部綁成一包，除此之外在綁綑的過程中也可以透過「loader」，事先對這些資源做處理，如使用 babel-loader 讓 js 的 ES6 語法變成 ES5，或使用 sass-loader 先幫我們的 css 做轉譯，最後再將這些處理後的資源全部打包。

經過上述的過程，我們不只可以一次將許多任務完成(轉譯 sass or JS)，最重要的是經過 webpack 的打包後，我們可以在瀏覽器上執行像是`module.exports`和`require`輸出或引用資源的語法，幫助我們可以順利在瀏覽器上使用到 npm 的模組。

那麼可以不用 Webpack 嗎？工具的使用端看開發需求而定，若今天開發完全都沒用到 npm 模組，或自己功力深厚可以實作出像 webpack 可以在瀏覽器執行資源引入的 function，當然可以不需要使用到 Webpack。

## gulp 跟 webpack 有什麼不一樣？
gulp 是一個任務管理工具，簡單來說是用 JS 為自己客製任務流程，讓我們多個任務可以一次完成。在 npm 上有非常多 gulp 針對各種任務的處理模組，透過引入這些資源，以及定義好要執行的每一個 function(工作流程)，我們便可以一次就將各種任務執行完畢，大大提高整體開發效率。

而 webpack 是一個資源打包工具，最主要是將開發時我們會用到的各種資源變成一包檔案，讓我們不只在 node.js 上，甚至在瀏覽器上，都可以順利地使用到各種資源。

雖然 webpack 在打包的過程中也會事先去處裡引入的資源，像是可以編譯 sass、編譯 JS 的新語法，但可執行的處理任務項目遠低於 gulp 可以做到的，反之，gulp 也無法做到如 webpack 將所有資源打包的功能。

因此，若今天你的需求只是想要管理開發任務，不希望自己還要一步一步去執行各種任務，gulp 是你的好朋友；若你的需求是整合各項開發檔案，並且在瀏覽器上可以順利使用各種資源，webpack 會是一個很好的工具。


## CSS Selector 權重的計算方式為何？
`<h1 class="title" id="comments__title">我是標題</h1>`
用上方簡單的例子，透過 id、class 都可以選到此 h1 tag，那最後瀏覽器渲染出的結果應該要依照 id 這個 CSS Selector 還是 class 呢？

哪個 CSS Selector 說了算在 W3C 的 CSS 規範中有明確的權重計算方式，而選擇器數量、選擇器種類都會影響到權重。

選擇器種類中權重由重到輕分別為：id > class、attribute、pseudo-classes > type selector、pseudo-elements
(先比選擇器種類，若種類大家都有則再比選擇器數量，若數量大家都相同則後來出現的選擇器，也就是檔案中排列較後面的，會蓋過前方的選擇器 style)

舉 `<a id="introduce" class="link" target="_blank" href="https://www.google.com.tw/">我是一個連結</a>
` 來說：

````
//編號一、權重為(1,0,0)
#introduce {
  color: red;
}

//編號二、權重為(0,3,0)
.link[target=_blank] {
  color: green;
}
````
雖然編號一只有一個 id 選擇器，但 id 選擇器的權重最大，且編號二無任何的 id 選擇器(即使他有兩個權重第二的選擇器)，因此最後的結果會是連結呈現紅字的情況。

但以上選擇器權重都敵不過以下兩者，分別為：

1. inline style
2. !important

回到上個例子，若為編號二加上 !important，就像是拿了免死金牌，不管其他人有多少個 id、多少個選擇器，都是他獲勝，因此最後連結是呈現綠色的情況。

````
.link[target=_blank] { 
  color: green !important;
}
````

