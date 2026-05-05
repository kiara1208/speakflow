const express = require('express');
const cors = require('cors');
const translateRoute = require('./routes/translate');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/translate', translateRoute);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`SpeakFlow server running on port ${PORT}`);
});
