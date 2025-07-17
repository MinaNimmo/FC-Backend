const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

app.post('/ask', async (req, res) => {
  const { prompt } = req.body;
  try {
    const chat = await openai.createChatCompletion({
      model: 'gpt-4.1-nano-2025-04-14',
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({ response: chat.data.choices[0].message.content.trim() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
