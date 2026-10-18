import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(express.raw({ type: ['audio/*', 'application/octet-stream'], limit: '25mb' }));
app.use(express.json());

// API to upload custom audio file
app.post('/api/upload-audio', (req, res) => {
  if (req.body && Buffer.isBuffer(req.body) && req.body.length > 0) {
    const audioDir = path.join(__dirname, 'audio');
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }
    fs.writeFileSync(path.join(audioDir, 'romantic.mp3'), req.body);
    return res.json({ success: true, message: 'Audio updated successfully!' });
  }
  return res.status(400).json({ error: 'No audio binary received' });
});

// Serve static files from root directory
app.use(express.static(__dirname));

// Explicit route handlers
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/flower', (_req, res) => {
  res.sendFile(path.join(__dirname, 'flower.html'));
});

// Fallback for any unknown route to index.html
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
