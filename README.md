REST API to shorten URLs, built with Node.js, TypeScript, Express, PostgreSQL, Prisma and Zod.

[Português](README.pt-BR.md)

## Requirements

- Node.js 22 or newer
- Docker

## Getting started

1. Install dependencies: `npm install`
2. Copy the env file: `cp .env.example .env`
3. Start the database: `docker compose up -d`
4. Run migrations: `npx prisma migrate dev`
5. Generate the Prisma client: `npx prisma generate`
6. Start the server: `npm run dev`

The server runs on `http://localhost:3000`.

The credentials in `.env.example` and `docker-compose.yml` are for local development only.

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/urls | Create a short URL |
| GET | /:shortCode | Redirect to the original URL |
| GET | /api/urls/:shortCode | Get URL info |
| GET | /api/urls | List all URLs |
| DELETE | /api/urls/:shortCode | Delete a URL |
Interactive docs are available at `http://localhost:3000/docs` after starting the server.

## Example

```bash
curl -X POST http://localhost:3000/api/urls \
  -H "Content-Type: application/json" \
  -d '{"originalUrl":"https://www.google.com"}'
```

Response:

```json
{
  "originalUrl": "https://www.google.com",
  "shortCode": "aB32xK",
  "shortUrl": "http://localhost:3000/aB32xK"
}
```
