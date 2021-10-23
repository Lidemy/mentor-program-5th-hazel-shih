# week22 hw2
## 1. 請列出 React 內建的所有 hook，並大概講解功能是什麼
(1) useState()：讓 App 中的狀態與 component 關聯在一起，當資料改變時，就會觸發畫面的改變。
```javascript=1
import React, { useState } from "react";

function App() {
  //mood 為 state, setMood 為改變 state 值的 setter, 將 "happy" 設為初始值
  const [mood, setMood] = useState("happy");
  //設定一個管理 click 事件的 function，當點擊事件被觸發，就會執行 setter 改變 mood 的值
  const handleClick = () => {
    if (mood === "happy") return setMood("sad");
    setMood("happy");
  };
  //當 mood 這個 state 改變，此 app component 會 re-render 讓畫面也跟著改變
  return <div onClick={handleClick}>{mood === "happy" ? "😊" : "😞"}</div>;
}
````

(2) useEffect()：在 component mount 以及 dependencies 改變時執行特定的 function。
在預設的情況下，傳入 useEffect 中的 function 會在每一次 component 被 render 後執行，另我們可以為 useEffect 傳入第二個參數(一個 array，array 中可以傳入不同的值，稱之 dependencies)，當 array 中的任何一項 dependency 有改動時，就會執行 useEffect 中的 function。

```javascript=1
import React, { useState, useEffect } from "react";

function App() {
  const [comments, setComments] = useState([]);
  //當畫面第一次被 render 後，執行「向 API 拿資料並更新 comments 」這個 function ，dependency array 中的值為空，代表之後沒有任何值改變，因此此 function 只會在 component 被第一次 render 後這個時機點執行
  useEffect(() => {
    fetch("COMMENTS_API").then((commentsData) => setComments(commentsData));
    //useEffect Cleanup：在 useEffect 中 return 一個 function，此 function 的執行時機為「此 component unmount 前」，此例中使用 clean up 的目的是避免 component 已被 unmount 但 fetch 仍在執行的 / state 還被修改的情況發生
        return () => {
      endTheFetch();
    };
  }, []);
  return (
    <section>
      {comments.map((comment) => {
        return <div>comment</div>;
      })}
    </section>
  );
}
````

(3) useContext()：與上層 component 共享資料，避免 prop drilling 的問題（prop 被過多 components 層層傳遞）。
```javascript=1
import React, { useState, useEffect, useContext, createContext } from "react";

//宣告一個 context object
const CommentsContext = React.createContext();

function App() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch("COMMENTS_API").then((commentsData) => setComments(commentsData));
  });
  return (
    <>
      <Header />
      {/* 將 comments、setComments 儲存於 context object，包夾在 Provider 內的 children components 都能使用到 CommentsContext 這個資源 */}
      <CommentsContext.Provider value={(comments, setComments)}>
        <CommentInput />
        <CommentsSection />
      </CommentsContext.Provider>
      <Footer />
    </>
  );
}

function CommentsSection() {
  //使用 useContext 將資料引入，就可以在此 component 內使用資料了
  const { comments, setComments } = useContext(CommentsContext);
  return <>
    {comments.map(comment => return <Comment>{comment}</Comment>)}
  </>
}
````

(4) useRef()：會回傳一個 reference（一個物件），可以透過 ref.current 來拿到此 reference 的值。值不會隨著 component re-render 而改變，且改變其值也不會造成 re-render。
常見使用情況為產出 element ID、計算次數、使用 DOM element 等。雖然 useRef 的值某方面來說也可以是 app 的狀態，但我們不會用 useState 來替代 useRef 的使用，原因是這些適合用 useRef 附載的資料並不會造成畫面上的更動，此外我們也不希望畫面時常無意義的 re-render，因此與畫面無相關的資料，用 useRef 是比較好的選擇。
```javascript=1
import React, { useEffect, useRef } from "react";

function App() {
//(1) 宣告一個 ref 變數
  const inputRef = useRef();
  //(3) 此 component mount 後，ref.current 的值就會是擁有 ref 屬性指向 ref 變數的 DOM element
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
    {/* (2) 將 ref 變數引用於目標 element 的 ref 屬性上 */}
      <input ref={inputRef} type="text" />
    </>
  );
}
````

(5) useReducer()：如同 useState()，useReducer() 也是一個管理狀態的 hook，但不同於 useState() 的是，useReducer() 不直接用 setter 來改變 state 的值，而是透過內建的 Dispatch function 引入 action（一個描述如何更新 state 的 object）後，再交由 reducer function 計算出新的狀態。
雖然 useReducer() 與 useState() 皆可用來更新 state，但 useReducer() 更實用於處理複雜的 state 上，除此之外官方文件也有提到，由於 useReducer() 是傳遞 dispatch function 而非一個 callback，因此可以避免因為 re-render 而重複宣告 callback 的問題，也不需要一直在程式中使用 useCallback 了。

(6) useMemo()：記住一個複雜函式的回傳值，僅在值不同時會再次 call function 計算（值相同的話就直接回傳結果），如此可以避免 re-render 時重複計算一樣的結果，減少效能的耗損。

(7) useCallback()：re-render 發生時，在 component 內宣告的函式也會被重新宣告一次，useCallback() 會回傳一個「記憶版函式」，並且根據 useCallback() 的第二個參數(dependencies)是否改變來決定是否重新宣告 function。

(8) useImperativeHandle()：可以針對一個 component 定義他要 expose 的屬性（有點像是 html 中，我們可以定義 data attribute 來記錄額外的資訊）。比方說一個 <CustomSubmitButton /> 可以定義一個 toggleDisabled function 屬性讓 <CustomSubmitButton /> 的父元件可以直接呼叫這個 function，來控制 <CustomSubmitButton /> 是否 disabled

(9) useLayoutEffect()：與 useEffect 功能類似但執行特定的 function 時機點不同，useLayoutEffect() 於 component render 後但在瀏覽器渲染出畫面前執行特定 function。
useLayoutEffect() 通常用來處理「需立即顯示的畫面」，如使用者登入後，位於網頁右上角的登入狀態不應再顯示「我要登入」，若 app 於瀏覽器渲染畫面後才抓取登入資料，會造成如上述說的「畫面閃動」（即先顯示我要登入，再馬上跳轉為登入成功字樣），因此這一類需立即顯示的資訊，適合用 useLayoutEffect() 處理。但要注意的是 useLayoutEffect() 是同步地執行特定 function，也就是整個 app 都會等待 useLayoutEffect() 執行完 function 後，瀏覽器才會渲染出畫面，因此在使用 useLayoutEffect() 時也要注意是否造成頁面卡頓過久的問題。

(10) useDebugValue()：與自訂 hook、react dev tools 搭配使用，在 useDebugValue() 內帶入參數並在自訂 hook 的 function 內呼叫，可在 react dev tools 印出帶入的參數，可以幫助開發者更清楚自訂 hook 的狀態，也方便 debug。


## 2. 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點
每一個 component 都有自己的 lifecycle，每一個 lifecycle 都會歷經三個階段：Mounting, Updating, Unmounting，以下簡介各階段會觸發的 method。

(1) Mounting
(1)-1 constructor()：constructor() 是最先被觸發的 method（component mount 到 DOM 上之前），目的是初始化 state 以及綁定值。
(1)-2 getDerivedStateFromProps()：在 component 被 render 到 DOM 上之前觸發，目的是根據 props 來設定新的 state。
(1)-3 render()：於初始化與設定 state 作業結束後觸發，目的是 return JSX 並將 html 輸出到 DOM 上。
(1)-4 componentDidMount()：在 component 一被 mount 到 DOM 上後觸發，通常用它來 API 串接或綁定 DOM 事件（因為我們已經確定這些 element 已經在 DOM 上了！）

(2) Updating
(2)-1 static getDerivedStateFromProps()：當 component 被 update 時觸發，根據 props 來設定新的 state。
(2)-2 shouldComponentUpdate()：一旦 static getDerivedStateFromProps() 被觸發，shouldComponentUpdate() 會接著被觸發，shouldComponentUpdate() 會回傳一個 boolean （預設是 true）來決定 component 是否要被 re-render。
(2)-3 render()：當 shouldComponentUpdate() 被觸發且其回傳值為 true 時被觸發，目的是 re-render html 有變動的部分輸出到 DOM 上。
(2)-4 getSnapshotBeforeUpdate：當 render() 被觸發後觸發，可以用它來存取 update 前 props 與 state 的值。
(2)-5 componentDidUpdate()：當 DOM 已更新完畢後被觸發，可以用它來針對更新後的 element 作處理。

(3) Unmounting
(3)-1 componentWillUnmount()：當 component 從 DOM 中被 destroy 前執行，通常用它來執行一些 clean up function。


## 3. 請問 class component 與 function component 的差別是什麼？
class component 與 function component 最大的差別在於，function component 內取到的值都是「當下」的值，而 class component 會取到「最新」的值。

class component 在每次 render 時，取得到的 props 或 state 都是最新的，因為 class 的 props 與 state 是以 `this.props` 和 `this.state` 來取得，而 this 在每一次 render 後是與渲染前不同的，因此拿到的 props 和 state 會與渲染前不同，是「非常新」的版本。

而 function component 在每次 render 都會被 call 一次，可以想像被 call 的當下整個 component 是 A 版本，傳進 component 內的 props 是 A-props、在 component 內宣告的函式也是 A-函式，但若現在 function component re-render 了，則一切的一切都會變成 B 版本、B-props、B-函式（除非你用 useCallback 啦）。

因此若我們在 A 版的 function component 執行了一項 request（假設是三秒後把某個 prop 印出來好了），在三秒內我們又飛快地變動其 parent component，則此 function component 就會同時被 re-render 火速變身 B 版本的 function component，而此時三秒後的印出結果還會是 A-prop，因為執行 request 的當下它抓到的是當下的 A-prop。今非昔比，當下拿到是什麼就是什麼，沒什麼好討價還價的。


## 4. uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？
兩者通常用來處理 form data，差異在於 component 的資料是否被 React 控制。
uncontrolled component 類似於一般的 HTML element，其 data 是被 DOM 本身管理的(element 本身可以保有自己的資料狀態)，我們可以透過 access 該 element 來取得其值，如下例中，我們透過 useRef 來取得 input 這個 element，可直接用 inputRef.current.value 來取得 input 的值，值的變動只和使用者的輸入有關且不受 React 的管理。
````javascript=1
import React, { useRef } from "react";

function App() {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} type="text" />
        <input type="submit" />
      </form>
    </>
  );
}
````

controlled component 的資料被其 parent component 管理(資料來自於 parent component 的 state 或 props)，如下例中，input 的資料來自於 App component 中的 state，當 state 有更動，input 的值也會跟著變動。因此，當畫面要與資料同步變動時，使用 controlled component 是比較好的選擇，因為我們可以透過 state 一有改動就 render 的機制來達成畫面同步更動的目標。
```javascript=1
import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };
  return <input type="text" value={value} onChange={handleChangeValue} />;
}
````