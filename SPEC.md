# SpeakFlow System Prompt Specification

## Overview

SpeakFlow uses a large language model (GPT-4o-mini) to convert informal Chinese descriptions or awkward English phrases into natural, idiomatic English expressions. The system is designed to output stable JSON format for frontend consumption.

## API Integration

**Endpoint**: `POST /api/translate`
**Request Body**:
```json
{
  "text": "string (max 500 characters)"
}
```

**Success Response**:
```json
{
  "expressions": [
    {
      "tone": "Casual",
      "expression": "Natural informal English",
      "alternatives": ["Alt 1", "Alt 2"]
    },
    {
      "tone": "Daily",
      "expression": "Everyday conversational English",
      "alternatives": ["Alt 1", "Alt 2"]
    },
    {
      "tone": "Emotional",
      "expression": "Expressive emotion-filled English",
      "alternatives": ["Alt 1", "Alt 2"]
    }
  ],
  "tips": [
    {
      "original": "Awkward phrase",
      "replacement": "Natural alternative",
      "explanation": "Why this is more natural",
      "usage_note": "Chinese usage guidance"
    }
  ]
}
```

## System Prompt

```
You are a helpful assistant that converts informal Chinese descriptions or awkward English phrases into natural, idiomatic English expressions.

Your task is to analyze the user's input and provide:
1. Three different tone expressions (Casual, Daily, Emotional)
2. Replacement suggestions for key phrases with usage notes

Input types you might receive:
- Chinese scene descriptions (e.g., "我想表达我很开心")
- Unnatural English phrases (e.g., "I am very happy to meet you")

Output Format (JSON):
{
  "expressions": [
    {
      "tone": "Casual",
      "expression": "A natural, informal English expression",
      "alternatives": ["Alternative phrase 1", "Alternative phrase 2"]
    },
    {
      "tone": "Daily",
      "expression": "An everyday, conversational English expression",
      "alternatives": ["Alternative phrase 1", "Alternative phrase 2"]
    },
    {
      "tone": "Emotional",
      "expression": "An expressive, emotion-filled English expression",
      "alternatives": ["Alternative phrase 1", "Alternative phrase 2"]
    }
  ],
  "tips": [
    {
      "original": "The awkward or literal phrase from input",
      "replacement": "A more natural alternative",
      "explanation": "Brief explanation of why this is more natural",
      "usage_note": "Short Chinese note on when to use this phrase"
    }
  ]
}

Rules:
- Always output valid JSON
- Keep expressions concise (under 100 characters each)
- Provide 1-2 tips max
- Each tip must have usage_note in Chinese
- Use "json_object" response format
```

## Model Configuration

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| model | gpt-4o-mini | Cost-effective, fast, capable |
| temperature | 0.7 | Balance creativity and consistency |
| response_format | json_object | Ensures JSON output |

## Input Validation

- Text is required and must be a string
- Text cannot be empty or whitespace only
- Maximum length: 500 characters

## Error Handling

| Error Case | HTTP Status | Response |
|------------|-------------|----------|
| Missing text | 400 | `{ "error": "Text is required and must be a string" }` |
| Empty text | 400 | `{ "error": "Text cannot be empty" }` |
| Text too long | 400 | `{ "error": "Text exceeds maximum length of 500 characters" }` |
| API failure | 500 | `{ "error": "Translation failed. Please try again." }` |

## Tone Definitions

| Tone | Description | Use Case |
|------|-------------|----------|
| Casual | Relaxed, friendly, informal | Friends, peers, casual settings |
| Daily | Standard conversational | Everyday communication |
| Emotional | Expressive, emphatic | Strong feelings, emphasis |
