# SpeakFlow

A lightweight web application that helps users convert informal Chinese descriptions or awkward English phrases into natural, idiomatic English expressions.

## Tech Stack

- **Frontend**: React + Tailwind CSS + Vite
- **Backend**: Node.js (Vercel Serverless Functions)
- **API**: DeepSeek API

## Features

- **Input**: Chinese scene descriptions or unnatural English phrases
- **Output**: 3 different tone expressions (Casual, Daily, Emotional)
- **Tips**: Replacement suggestions with Chinese usage notes
- **One-click Copy**: Copy expressions with a single click

## Getting Started

### Prerequisites

- Node.js 18+
- DeepSeek API key

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
cd client && npm install
cd ../server && npm install
```

3. Configure environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your DeepSeek API key:

```
DEEPSEEK_API_KEY=your_api_key_here
```

### Local Development

```bash
# Start backend (server folder)
cd server
npm run dev

# Start frontend (client folder, separate terminal)
cd client
npm run dev
```

### Deployment to Vercel

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Login to Vercel:

```bash
vercel login
```

3. Deploy:

```bash
vercel --prod
```

4. Set environment variable `DEEPSEEK_API_KEY` in Vercel dashboard

## Project Structure

```
speakflow/
├── api/
│   └── translate.js     # Vercel Serverless Function
├── client/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── ...              # Vite config, Tailwind, etc.
├── vercel.json          # Vercel configuration
└── .env.example         # Environment variables template
```

## API

### POST /api/translate

**Request:**

```json
{
  "text": "我很开心"
}
```

**Response:**

```json
{
  "expressions": [
    {
      "tone": "Casual",
      "expression": "I'm so happy!",
      "alternatives": ["I'm over the moon!", "I'm thrilled!"]
    },
    {
      "tone": "Daily",
      "expression": "I'm really happy about it.",
      "alternatives": ["I'm pleased.", "I'm glad."]
    },
    {
      "tone": "Emotional",
      "expression": "I couldn't be happier!",
      "alternatives": ["This makes me so happy!", "I'm ecstatic!"]
    }
  ],
  "tips": [
    {
      "original": "我很开心",
      "replacement": "I'm so happy",
      "explanation": "'So' adds emphasis and feels more natural",
      "usage_note": "日常口语中常用，表达强烈但自然的开心"
    }
  ]
}
```

## License

MIT
