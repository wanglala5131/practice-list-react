# 運動菜單網站 (practice-list)

這是一個可以讓使用者建立自己的**練習項目**與**菜單**的網站，適用於系/校隊或喜歡安排運動計畫的朋友。
相關的連結如下：

1. [網站連結](https://wanglala5131.github.io/practice-list-react/)
2. [後端/資料庫 GitHub](https://github.com/wanglala5131/practice-lists)
3. [vue 版本 GitHub(2020 年製作)](https://github.com/wanglala5131/practice-list-vue)

## 功能

- 使用者可登入/註冊，目前不需要信箱驗證
- 可建立運動項目 (名稱、描述、限制、圖片、類別)，目前只能將項目封存，無法刪除，詳細原因可進部落格查看
- 可自行建立運動類別與項目類型
- 可將項目先排入暫定清菜單中，自行選擇是否要更改項目順序與填寫組數/備註
- 已送出的菜單仍可以進行編輯、刪除、是否已使用的狀態

## 測試帳號與密碼

| 帳號                | 密碼    |
| ------------------- | ------- |
| `user1@example.com` | `user1` |
| `user2@example.com` | `user2` |
| `user3@example.com` | `user3` |

## 畫面與使用介紹

#### 首頁

![](https://i.imgur.com/t5OW0A4.jpg)

#### 暫定清單

![](https://i.imgur.com/nz3Z3nx.jpg)

#### 已排清單

![](https://i.imgur.com/xUt6Vxu.jpg)

#### 設定頁

![](https://i.imgur.com/05Fh9Mf.jpg)

## 環境

- react 18.2.0 -前端框架
- typescript 4.7.4
- styled-components 5.3.5 -CSS-In-JS 函式庫
- styled-icons -icon
- SweetAlert -Confirm/Toast 訊息
- react-sortablejs -拖曳套件
- formik & yup -表單驗證函式庫
- react-modal -彈窗
