const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/analyze', async (req, res) => {
  console.log("📩 Request received");
  try {
    const { query, dataPreview } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    const prompt = `Data: ${JSON.stringify(dataPreview)}\nQuestion: ${query}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ insight: response.text() });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("🚀 Server live on Port 5000"));