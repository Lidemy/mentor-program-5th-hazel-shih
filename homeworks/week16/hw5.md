# week16 hw5
## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。
在一開始學習 JS 的時候，我對很多東西感到困惑，像是為什麼明明兩個物件長得一模一樣，但不相等？或者是在學習 DOM 時設置 click 事件，為什麼點擊後出現的反應不是預期中的結果？我記得當下的自己只是迅速地敲了關鍵字搜尋，看著 Stack Overflow 上的標準解答，「大致」理解後就把我的 code 改掉，只要是想像中的結果我就不再追究太多。

「如果下次遇到同樣的問題，我再用相同的辦法解就好了嘛！」這其實有點像我自己高中時期解數學題目的情形，第一次碰到問題，把解答看一看，大概理解後，之後都這麼寫，從來不會多去了解那些艱澀的名詞，以及這個解法的根源，畢竟當下的我可是正趕著解決當前的問題以完成其他目標。作用域？原型鍊？以後再說吧。哎，說來慚愧，總之自己真的就是這樣一路馬馬虎虎地學下去。

其實我很感謝老師設計的 week16 所有內容，逼大家去正視自己以前不去面對的債，真的對 JS 有更深一層的理解，也讓我覺得 JS 這個程式語言被設計得很巧妙、很合理、很剛好。我覺得最有趣的是 call stack、callback queue、event loop 那裏，讓我對於程式的執行序更了解，也因此能解答自己從前的那些問題，像是為什麼一旦執行到無窮迴圈，整個程式都動不了？setTimeout 設定 1 秒為什麼只是「最低的等待時間」？

另外其實我是第一次認識 hoisting 與 closure 這兩個詞，說真的，看了第一遍影片後我有一種「我在哪裡我是誰」的感覺，有點不知道自己看了什麼，所以我又把影片看了一遍也逼自己做點筆記，事後好像可以體會到老師說「任督二脈被打通」的感覺，可以很快理解主題與主題間都有關聯，像是 hoisting 與 closure 其實都與 EC、VO、AO、scopechain 有關係，只要把自己當 JS 引擎，列出每一個 function 的 EC、AO、scopechain，基本上就已經把最難的那關解決了(笑)

至於物件導向與 this 的部分，雖然算是知道如何操作與利用「轉換成 call() 寫法」來判別 this 的值，但因為現在碰到物件導向的機會比較少，或是說有碰到只是比較不複雜，因此較無法知道這些概念會實際用在哪邊，這部分可能就要等到遇到時再來深入理解(我又丟給下次的自己了)，畢竟我現在最重要的事情是趕進度(汗顏現在才在 16 週而已)XD 祝我好運ㄌ！



