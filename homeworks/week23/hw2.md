# week23 hw2
## 1. 為什麼我們需要 Redux？
當 App 的規模越來越大，或在更要求使用者體驗的開發環境下，前端的邏輯與介面的操作變得更複雜，需要處理更多資料與狀態，因此可能會遇到資料散落在各個元件導致管理困難，或是多個元件需要頻繁使用到同筆資料而必須要妥善處理資料流的情形。

當資料散落在各處或每個元件擁有自己的狀態要管理的時候，可能會導致最後渲染出的畫面不一致，也因為元件與狀態太多、元件間的資料更新來源增加，讓 debug 變得更花時間。

因此在 App 的規模大到一定程度，或是 App 中有許多 state 需要被有條理地管理時，Redux 就能派上用場，透過它將所有資料中心化的特性，讓元件的資料來源單一，並且減少畫面不一致的情況。若搭配 Redux DevTools 使用，可以讓 App 中的每一個事件被記錄下來，讓開發者可以更容易地 debug。

## 2. Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？
Redux 是用來管理 JS Apps 狀態的工具，許多前端框架可以搭配其使用（像是 React、Vue、Angular），甚至 vanilla JS 也可以。

開發者透過 Redux 建立一個可集中化管理資料的 "container"，當 App 中的元件需要資料時，便從這個 container 提取所需的資料，不需要不同元件中存取重複的資料，如此可以讓資料來源單一，讓結果具有一致性，也方便開發者 debug。

---

以下簡介 Redux 的各個元件跟資料流：

Action：
有點像 App 中紀錄 event 的單據，實際上是一個簡單的 object，通常擁有 type(一定要有) 與 payload(可有可無也可變換 property 名稱) 兩個 property，type 的 value 必須是字串，紀錄此 Action 的類別，而 payload 並無限制資料型態，任何關於此 Action 的額外資訊都可以放在這裡。

Action Creators：
人如其名，Action 製造機，是一個會回傳 Action 的 function。

Reducers：
是一個 pure function，以目前的 state 與 action 為參數，並回傳新的 state，可以將 Reducers 想像成 event listener，根據 action 的 type 來更新 state。

Store：
上述提到可以集中化管理資料的 container 是 store，可以把它想像成資料儲存中心，但實際上它就是個裝著 reducers 與許多 method 的大型物件。

Dispatch：
為 store 中的 method，藉由引入一個 action 為參數，來觸發 reducers 的運作。

Selectors：
是一個可以從 store 中提取特定資料的 function。

---

資料流：
當 App 中有 event 發生（如使用者點擊按鈕、滾動滑鼠、打字等），dispatch 會將描述此 event 的 action 送至 store，而 store 中的 reducers 收到 action 後，會根據目前的 state 與剛送到的 action 來更新 state，App 中的元件就可以根據新 state 來決定是否重新渲染或做其他處理。


## 3. 該怎麼把 React 跟 Redux 串起來？
使用 React Redux 提供的 hooks 或 connect API。

不管是 hooks 或 connect 都有的前置作業：
使用已訂閱 store 的 Provider tag 將 App 中的根元件包裹起來，確保所有 App 中的元件都可以使用到 store 的資源。

透過 connect（將 redux 綁定到 props）：
利用 connect 這個 function 把 store 與 components 關聯在一起，再透過 mapStateToProps、mapDispatchToProps 等 function 把 Redux 的 state、dispatch 綁定到 components 的 props，讓 components 能透過 dispatch 更新 state，以及使用 state 資料。

透過 hooks（透過一些 hook 讓 component 也能使用 redux 資源）：
利用 useSelector 這個 function 可以提取 store 中的特定資料，而 useDispatch 則可以讓 component 也能利用 dispatch 來觸發 store 中的 reducers 來更新 state。