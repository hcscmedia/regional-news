# Regional News Backend

Backend API for the Regional News Website built with Node.js, Express, and MongoDB.

## Features

- RESTful API for news articles
- CRUD operations (Create, Read, Update, Delete)
- MongoDB integration with Mongoose
- Category filtering and search functionality
- Error handling and validation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or connection string)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/regional-news
NODE_ENV=development
```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Seed Database
```bash
npm run seed
```

## API Endpoints

### Get all news articles
```
GET /api/news
Query parameters: ?category=Politik&search=keyword
```

### Get single news article
```
GET /api/news/:id
```

### Create news article
```
POST /api/news
Body: { title, content, category, date }
```

### Update news article
```
PUT /api/news/:id
Body: { title, content, category, date }
```

### Delete news article
```
DELETE /api/news/:id
```

## Categories

- Politik
- Wirtschaft
- Sport
- Kultur
- Lokales
- Verschiedenes

## Response Format

All API responses follow this format:
```json
{
  "success": true,
  "data": { ... }
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error message"
}
```
