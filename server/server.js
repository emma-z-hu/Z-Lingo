import "dotenv/config";
import cors from "cors";
import express from "express";

const app = express();
const PORT = process.env.PORT || 5500;

app.get('/', (req, res) => {
  res.send('Z-Lingo Backend Server');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
