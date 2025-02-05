---
### English README
---

# Image Search Website

This is an image search website built using React and Next.js for the frontend, with an Express backend. It integrates with the Pexels API to display random images or search results. The frontend sends API requests to retrieve images while maintaining a **frontend-backend separation**.

## Features

### 1. **Homepage**

- On first load at `http://localhost:3000`, the homepage requests images from the Pexels API based on a randomly generated page number. Each request fetches **15 images per page** in JSON format.
- Clicking "Load More" will generate a new random page number (ensuring no duplicates) and fetch additional random images, appending them to the bottom of the page.
- Users can search for images, which redirects them to the search page.
- The frontend computes a random page number and sends a GET request to `http://localhost:5001/random?page=1`. The backend processes this route and returns the images.

### 2. **Search Page**

- When a user searches for images, the page redirects to `http://localhost:3000/search?q={keyword}`.
- The backend extracts the keyword from the URL and requests images from the Pexels API.
- The frontend automatically computes the page number and sends a GET request to `http://localhost:5001/search?q=keyword&page=1`, returning the first set of search results.
- Clicking "Load More" increments the page number by 1, fetching additional images.

### 3. **Masonry Layout**

- Initially, the layout used CSS for the waterfall grid. It has now been replaced with `react-masonry-css`, ensuring that images remain in order even after dynamically adding more, and fully supporting **responsive design (RWD)**.

### 4. **Additional Pages**

- **Homepage**
- **Search results page** (only accessible after searching)
- **Privacy Policy page**
- **About Us page**

---

## API Routes

The backend provides two API routes for image requests:

- **Random Images:**

  - Endpoint: `http://localhost:5001/random`
  - Returns 15 random images based on a randomly generated page number.

- **Search Images:**
  - Endpoint: `http://localhost:5001/search?q={keyword}`
  - Fetches images based on the provided search keyword.

---

## Technologies Used

### **Frontend:**

- Next.js
- React
- Axios
- Tailwind CSS (for responsive design)
- `react-masonry-css` (for masonry grid layout)
- `dotenv` (for environment variable management)

### **Backend:**

- Express
- CORS
- `dotenv` (for environment variable management)

### **Security:**

- API keys are **encrypted using `.env` files**.
- The **frontend only interacts with the backend**, which then communicates with the Pexels API. This structure ensures:
  - **Backend security** (API keys remain hidden)
  - **Frontend-backend separation**, making the project easier to maintain.

---

## Setup Instructions

1. Clone this repository.
2. Install dependencies for both the frontend and backend:

   ```bash
   cd image-search-project
   npm run dev

   cd backend
   node server.js
   ```

3. Add a new `.env` file under the backend datashelf and add the Pexels API key to it in the format `IMAGE_API_KEY=API key`, which will be handled automatically by the backend.

4. Start the frontend:

   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`.

5. Start the backend:

   ```bash
   npm start
   ```

   The backend will run on `http://localhost:5001`.

---

## About This Project

This project is a **personal side project** aimed at practicing **frontend-backend separation** and integrating third-party APIs (Pexels) to build a smooth image search experience. Through this project, I have gained deeper experience with **Next.js, Express, API integration, masonry grid layouts, and environment variable management (.env).**

### Current Features:

- Dynamic API-based image retrieval (random and search modes)
- Masonry-style image layout for a better user experience
- **Frontend-backend separation**, with the backend handling API requests and protecting API keys
- Implement **infinite scroll**

### Future Plans:

- Add a **user favorites feature**
- Integrate **more image sources**

This is an **open-source project**! If you're interested, feel free to contribute or share your ideas! 🎉

---

### 中文 README

# 圖片搜尋網站

這是一個使用 React 和 Next.js 建立的圖片搜尋網站，後端使用 Express。該網站與 Pexels API 整合，顯示隨機圖片或搜尋結果。前後端分離，前端發送 API 請求來獲取圖片。

## 功能

1. **首頁：**

   - 首次第一次載入時，`http://localhost:3000`首頁會根據隨機頁數請求 Pexels API，一次一頁 15 張，並將返回的 JSON 格式圖片顯示在頁面上。
   - 當使用者點擊「載入更多」時，會再計算隨機頁數（不會重複），載入更多隨機頁面的圖片，並繼續加入到頁面的下方。
   - 可以直接搜尋關鍵字，頁面將會跳轉到搜尋頁面。
   - 在前端計算亂碼頁數後會請求 get `http://localhost:5001/random?page=1`，後端會在處理這個路由並回傳資料。

2. **搜尋頁面：**

   - 當使用者在首頁進行搜尋時，會跳轉到 `http://localhost:3000/search?q={關鍵字}` 的網址。
   - 後端根據提供的連結的關鍵字請求 Pexels API ，前端會自動計算頁面，然後使用 get `http://localhost:5001/search?q=keyword&page=1`，並返回頁面的第一頁的 json 圖片資料。
   - 當使用者在搜尋頁面點擊「載入更多」時，頁碼會加 1，並會繼續載入更多圖片。

3. **瀑布流排版：**

   - 原本使用 CSS 實現的瀑布流排版，現在改為使用 `react-masonry-css`，這樣新增圖片後，圖片的順序不會亂掉，且響應式設計 (RWD) 沒有問題。

4. **頁面：**
   - 首頁。
   - 關鍵字頁面（需要在首頁搜尋後跳轉）。
   - 新增了 **隱私權政策** 頁面。
   - 新增了 **關於我們** 頁面。

## API 路由

後端有兩個主要的 API 路由來處理圖片請求：

- **隨機圖片：**

  - 路徑：`http://localhost:5001/random`
  - 根據隨機計算的頁數返回 15 張隨機圖片。

- **搜尋圖片：**
  - 路徑：`http://localhost:5001/search?q={關鍵字}`
  - 根據提供的關鍵字來搜尋圖片並返回結果。

## 使用的技術

- **前端：**

  - Next.js
  - React
  - Axios
  - Tailwind CSS (用於響應式設計)
  - react-masonry-css (用於瀑布流排版)
  - dotenv (用於環境變數)

- **後端：**

  - Express
  - CORS
  - dotenv (用於環境變數)

- **安全性：**
  - API 金鑰透過 `.env` 文件進行加密儲存。
  - 前端與後端分離，前端請求後端的 API 路由，然後由後端去處理與 Pexels API 的交互。這樣的架構不僅能達到前後端分離，還能保障 API 金鑰等敏感資料的安全，使得項目更容易維護。

## 設置

1. 克隆此存儲庫。
2. 安裝前端和後端的所有依賴：

   ```bash
   cd image-search-project
   npm run dev

   cd backend
   node server.js
   ```

3. 在backend資料架下新增 `.env` 文件，並將 Pexels API 金鑰加入其中，格式為`IMAGE_API_KEY=API key`，後端後將會自動處理。

5. 啟動前端：

   ```bash
   npm run dev
   ```

   前端將會在 `http://localhost:3000` 運行。

6. 啟動後端：

   ```bash
   npm start
   ```

   後端將會在 `http://localhost:5001` 運行。

## 關於本作品

本作品為本人開發的 Side Project，主要目的是練習 前後端分離架構，並整合第三方 API（Pexels）來打造一個流暢的圖片搜尋網站。這個專案幫助我更熟悉 Next.js、Express、API 整合、React Masonry 瀑布流排版、環境變數管理 (.env) 等技術。

目前的功能包含：

- 透過 API 動態獲取隨機圖片或搜尋圖片
- 瀑布流式排版
- 前後端分離架構，後端負責 API 轉發並保護 API 金鑰
- 無限滾動加載（Infinite Scroll）
- 關鍵字無效結果

未來可能會：
提供 用戶收藏功能
整合更多 圖片來源 API
這是一個開源專案，如果你對這個專案有興趣，歡迎提供建議或進行改進！🎉

---
