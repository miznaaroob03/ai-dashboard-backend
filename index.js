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
    const model = generativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Data: ${JSON.stringify(dataPreview)}\nQuestion: ${query}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ insight: response.text() });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});