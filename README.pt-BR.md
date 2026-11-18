# URL Shortener API

[English](README.md)

API REST para encurtar URLs, feita com Node.js, TypeScript, Express, PostgreSQL, Prisma e Zod.

## Requisitos

- Node.js 22 ou mais novo
- Docker

## Como rodar

1. Instale as dependências com `npm install`
2. Copie o arquivo de ambiente com `cp .env.example .env`
3. Suba o banco com `docker compose up -d`
4. Rode as migrations com `npx prisma migrate dev`
5. Gere o client do Prisma com `npx prisma generate`
6. Inicie o servidor com `npm run dev`

O servidor roda em `http://localhost:3000`.

As credenciais do `.env.example` e do `docker-compose.yml` servem só para desenvolvimento local.

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /api/urls | Cria uma URL curta |
| GET | /:shortCode | Redireciona para a URL original |
| GET | /api/urls/:shortCode | Consulta os dados de uma URL |
| GET | /api/urls | Lista todas as URLs |
| DELETE | /api/urls/:shortCode | Exclui uma URL |

## Exemplo

```bash
curl -X POST http://localhost:3000/api/urls \
  -H "Content-Type: application/json" \
  -d '{"originalUrl":"https://www.google.com"}'
```

Resposta:

```json
{
  "originalUrl": "https://www.google.com",
  "shortCode": "aB32xK",
  "shortUrl": "http://localhost:3000/aB32xK"
}
```
