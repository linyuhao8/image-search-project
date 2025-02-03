const express = require("express");
const axios = require("axios");

const router = express.Router();

// 定義 API 路由：取得圖片
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // 取得 `page`，轉換為數字，若無則預設為 1
    console.log("Page Number:", page); // 輸出頁數

    // 決定要使用隨機圖片或搜尋結果
    const url = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;

    // 向 Pexels API 發送請求
    const result = await axios.get(url, {
      headers: {
        Authorization: process.env.IMAGE_API_KEY, // 使用環境變數中的 API 金鑰
      },
    });

    // 成功則返回 API 回應的圖片數據
    res.status(200).json(result.data);
  } catch (error) {
    // 錯誤處理
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Error fetching images" });
  }
});

module.exports = router;
