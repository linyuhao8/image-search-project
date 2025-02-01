const express = require("express");
const axios = require("axios");

const router = express.Router();

// 定義 API 路由：取得圖片
router.get("/", async (req, res) => {
  try {
    // 產生隨機頁數（1 到 500 之間）
    let randomPage = () => {
      return Math.floor(Math.random() * 500);
    };
    let randomNum = randomPage(); // 取得隨機頁碼

    // 從查詢參數獲取搜尋關鍵字，若無則設為空字串
    const searchQuery = req.query.keyword || "";
    console.log("Search Query:", searchQuery); // 輸出查詢參數
    console.log("Random Page:", randomNum); // 輸出隨機頁碼

    // 決定要使用隨機圖片或搜尋結果
    const url = searchQuery
      ? `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=15`
      : `https://api.pexels.com/v1/curated?page=${randomNum}&per_page=15`;

    //如果已經有亂數 將亂數儲存 然後不要給與重複的數
    //如果已經有搜尋 將頁數在加1

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
