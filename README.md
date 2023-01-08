# 出勤管理系統-前端
本專案為前、後端分離開發專案，本專案為簡易出勤打卡網站
<br>
使用者可執行打卡、查看打卡記錄、修改密碼......等功能
<br>
管理者可執行更新公司資料、解鎖上鎖員工......等功能


## Features 產品功能
* 使用者/管理者輸入帳號及密碼登入系統
  * 使用者連續輸入錯誤5次以上,帳號會被上鎖無法再登入
* 使用者可以打卡
  * 第一次打卡為上班打卡,第二次含以後打卡為下班打卡
  * 一天打卡日為該時間區當日5:00A.M至隔日4:59A.M
  * 公司有使用Gps驗證時,未在公司地理位置400公尺內,無法打卡
  * 工作日未滿8小時為缺勤
* 使用者可修改密碼
* 使用者可在公司地理位置100公尺內,產生打卡用QRcode
* 使用者可使用當日產生的QRcode打卡
* 使用者可輸入日期區間,查看自己的打卡記錄
* 管理者可更新公司資料
* 管理者可解鎖已被上鎖的員工帳號

## Environment Setup 環境建置
* Vue.js
* Vuex
* Vue router
* Axios

## Installing 專案安裝流程
1. 打開您的終端機(terminal)，複製(clone)專案至本機
```
git clone https://github.com/deansyue/ams_frontend.git
```

2. 進入存放此專案資料夾
```
cd ams_frontend
```

3. 安裝npm套件
```
npm install
```

4. 使用腳本，即可啟動專案
```
npm run serve
```
5. 根據終端機(terminal)指示，使用網址 http://localhost:8080 查看網站

## 種子資料使用者
可使用種子資料新增的使用者操作本專案

### 管理者帳號：
```
admin
  account: admin
  password: tiadmin
```

### 使用者帳號：
```
user1
  account: user1
  password: titaner

user2
  account: user2
  password: titaner

user3
  account: user3
  password: titaner
```

## Related Links 相關連結
### 後端
[Github](https://github.com/deansyue/ams_backend)


## Contributor 專案開發人員
[deansyue](https://github.com/deansyue)