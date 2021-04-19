## 交作業流程

### 寫作業的前置作業
---

到 GitHub Classroom 建立自己的交作業 repository，然後要養成做每週作業前，先開「當週作業分支」`git branch weekN`，就可以開始寫作業了。

### 寫作業：
---

打開 mentor-program-5th 資料夾裡的 homeworks，找到當週資料夾，直接在 hwN.md 上編輯作業。

### 交作業
---

#### 待當周所有作業都完成後：
1. 切換到作業分支：`git checkout weekN`
2. 將作業的最新檔案納入新版本：`git commit -am "finish_weekN_HW"` (若有新增檔案，則須在 commit 前先用`git add .`將新的檔案加進版本控制)
3. 將作業分支更新到遠端：`git push origin weekN`
4. push 完後到 GitHub 頁面重整檢查，若 push 成功會出現 pull request 的綠色按鈕 (註：pull request 的意思是我想要把 weekN 分支 merge 到 main)
5. 按下綠色按鈕會到 Open a Pull Request 頁面，命好 PR 名稱和寫好 comment 後，按下 Create Pull Request
6. 待頁面跳轉後，複製該頁面網址(也就是當周交作業網址)，貼在學習系統 > 課程總覽 > 繳交作業 (藍色按鈕)，送出後即完成交作業動作

### 若交完作業發現作業內容有誤想修改？
---

送出 PR 後，可以到 Files changed 查看自己的作業內容，若內容有誤想修改，就到本地端直接開啟 hwN.md 檔案修改，修改後：
1. 將作業的最新檔案納入新版本：`git commit -am`
2. 將作業分支更新到遠端：`git push origin weekN`

作業就更新囉～
(註：不需要再重發 PR，當 push 出去最新的 branch 後，PR 的內容也會改變)
