const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_FOOTBALL_KEY;
const API_BASE = 'https://v3.football.api-sports.io';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/fixtures', async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key is not configured. Add API_FOOTBALL_KEY in Render Environment settings.' });
  }
  try {
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Lagos' });
    const response = await fetch(`${API_BASE}/fixtures?date=${today}&timezone=Africa/Lagos`, {
      headers: { 'x-apisports-key': API_KEY }
    });
    const data = await response.json();
    if (!response.ok || data.errors && Object.keys(data.errors).length) {
      return res.status(502).json({ error: 'Football data provider returned an error. Check your API key and quota.' });
    }
    res.set('Cache-Control', 'public, max-age=30');
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: 'Could not reach the football data provider.' });
  }
});

app.get('/health', (_req, res) => res.json({ ok: true }));
app.listen(PORT, () => console.log(`Inevitable Predict running on port ${PORT}`));
