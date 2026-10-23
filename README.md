# Inevitable Predict

## Deploy on Render
- Create a GitHub repository and upload `package.json`, `server.js`, and the `public` folder (including `public/index.html`).
- In Render, create a **Web Service** connected to this repository.
- Runtime: Node. Build command: `npm install`. Start command: `npm start`.
- In Render → Environment, add `API_FOOTBALL_KEY` with your API-Football key as its value. Keep this secret; never put it in HTML or GitHub.
- Deploy. Open the service URL.

The site fetches today's fixtures and scores through the server. Correct-score predictions and league standings are not yet implemented.
