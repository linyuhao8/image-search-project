// server.js
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
// 設置環境變數
dotenv.config();

// 創建 Express 應用
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // 設置允許的來源
  })
);
// 路由：向 Unsplash API 發送請求並返回結果
app.get("/api/photos", async (req, res) => {
  try {
    let randomPage = () => {
      return Math.floor(Math.random() * 500);
    };
    let randomNum = randomPage();
    const searchQuery = req.query.keyword || ""; // 從 query 取得搜尋關鍵字
    console.log("Search Query:", searchQuery); // 輸出查詢參數
    console.log(randomNum);
    const url = searchQuery
      ? `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=15`
      : `https://api.pexels.com/v1/curated?page=${randomNum}&per_page=15`;

    const result = await axios.get(url, {
      headers: {
        Authorization: process.env.IMAGE_API_KEY,
      },
    });
    // 返回圖片數據
    res.status(200).json(result.data);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Error fetching images" });
  }
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
