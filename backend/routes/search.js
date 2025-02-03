const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  const { q, page } = req.query; // 讀取查詢參數

  // 檢查是否有搜尋關鍵字和頁數
  if (!q || !page) {
    return res.status(400).json({ message: "Missing query parameters" });
  }

  try {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      q
    )}&page=${page}&per_page=15`;
    // 向 Pexels API 發送請求
    const result = await axios.get(url, {
      headers: {
        Authorization: process.env.IMAGE_API_KEY, // 使用環境變數中的 API 金鑰
      },
    });

    // 返回結果給前端
    console.log(result.data);
    res.json(result.data);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/test", (req, res) => {
  res.send("hello");
});
module.exports = router;
