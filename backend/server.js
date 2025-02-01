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

const photosRoute = require("./routes/photos");
app.use("/api/photos",photosRoute)

// 啟動伺服器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
