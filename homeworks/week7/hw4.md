## 1. 什麼是 DOM？
DOM 全名為 Document Object Model，顧名思義就是把文件中的每一項元素定義成物件的形式，最終形成一個樹狀結構，在這棵「樹」中，每一個元素都是一個節點。DOM 可以方便不同的瀏覽器按照同一個模型(規則)來編譯畫面；除此之外也可以透過它，讓我們使用 JS 來抓取文件中的元素，進而更改元素的風格、內容，甚至為元素加上事件監聽，為網頁增加互動性，並且存取資料。

## 2. 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
(1) 事件傳遞會從根節點開始向下到 target(⬇)，再從 target 逆向從子節點往根節點回傳(⬆)。一般而言，完整路徑為：Window ➝ Document ➝ HTML ➝ Body ➝ html tag(target) ➝ Body ➝ HTML ➝ Document ➝ Window 

(2) 冒泡：事件傳遞從 target ➝ 子節點 ➝ 根節點 的過程；捕獲：事件傳遞從根節點 ➝ 子節點 ➝ target 的過程。先捕獲、再冒泡(在 target 時不分捕獲或冒泡)


## 3. 什麼是 event delegation，為什麼我們需要它？
「代理」的意思為：非本人，我來代替你處理；因此事件代理是我們將事件的監聽掛在相對該元素(本人)的根節點(代替者)上，透過事件傳遞的機制，讓元素位於傳遞鏈上，只要元素接收到事件，就會透過冒泡階段將事件傳給根節點，當根節點監聽到該事件，就會觸發我們預先設定好的程式。

為什麼需要事件代理？把監聽掛在當事人身上就好了啊？當文件架構簡單、元素數量少時掛在元素當事人身上是 OK 的，但如果今天有數百、數千個元素當事人，為這一大群人每個人都加上監聽器是一件耗程式效能也耗心神的事情，因此我們可以運用事件代理，只需為少數元素加上監聽，透過事件冒泡的過程，就可以讓每一個元素執行我們設定的程式(call-back function)，達到預想的效果。

## 4. event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
(1) event.preventDefault()：把原本應該要做的事情取消，避免去做它。舉個 🌰：submit 按鈕應該要把東西送出去，若使用 event.preventDefault()，submit 不會執行將表單內容送出、checkbox 不給勾選、超連結點了之後也不會導到目標網址。

這裡要注意的是，即使元素被禁止執行原本該執行的行為，但背後的事件傳遞仍會進行，這個點擊事件會傳給在事件傳遞鏈上的每一個節點。

(2) event.stopPropagation()：整個事件傳遞的過程是從根元素傳到 target(捕獲)，再從 target 傳到根元素(冒泡)，如同一條傳遞鏈一樣，一個節點會傳給另一個節點，而 event.stopPropagation() 的作用為切斷某一節點的傳遞功能，讓這個事件不會被傳遞出去(不會捕獲也不會冒泡)，只會被本身這個節點執行。

(3) event.preventDefault VS event.stopPropagation()：
![](https://i.imgur.com/66xBDZc.png)
[圖片來源](https://bit.ly/3c4to3X)

如圖所示，藍色按鈕(&lt;a>)被包在外層的大灰框(&lt;div>)裡面，若按下藍色按鈕，透過事件傳遞機制，此點擊事件會冒泡到大灰框，因此會跳出兩次的檔案選擇欄。

若為藍色按鈕加上 event.preventDefault：
````
button.addEventListener('click', (event) => {
  event.preventDefault();
  fileUpload();
});
````
藍色按鈕僅不會執行原本的行為(超連結功能)，但事件仍會被傳遞到大灰框身上，所以還是會跳出兩次檔案選擇欄。

若為藍色按鈕加上 event.stopPropagation()：
````
button.addEventListener('click', event => event.stopPropagation());
````
藍色按鈕會執行原本的行為(超連結功能)，但事件不會被傳遞到大灰框身上，因此結果為：藍色按鈕本身自己執行一次打開檔案選擇欄，大灰框完全不會打開檔案選擇欄。