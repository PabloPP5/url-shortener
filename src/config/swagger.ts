import { env } from "./env";

export const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "URL Shortener API",
    version: "1.0.0",
    description: "REST API to shorten URLs and track clicks.",
  },
  servers: [{ url: env.baseUrl }],
  tags: [{ name: "URLs" }],
  paths: {
    "/api/urls": {
      post: {
        tags: ["URLs"],
        summary: "Create a short URL",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateUrlRequest" },
            },
          },
        },
        responses: {
          "201": {
            description: "Short URL created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreatedUrl" },
              },
            },
          },
          "400": {
            description: "Invalid data",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ValidationError" },
              },
            },
          },
        },
      },
      get: {
        tags: ["URLs"],
        summary: "List all short URLs",
        responses: {
          "200": {
            description: "List of URLs, newest first",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Url" },
                },
              },
            },
          },
        },
      },
    },
    "/api/urls/{shortCode}": {
      get: {
        tags: ["URLs"],
        summary: "Get URL info by short code",
        parameters: [{ $ref: "#/components/parameters/ShortCode" }],
        responses: {
          "200": {
            description: "URL found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Url" },
              },
            },
          },
          "400": {
            description: "Invalid short code",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ValidationError" },
              },
            },
          },
          "404": {
            description: "Short URL not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      delete: {
        tags: ["URLs"],
        summary: "Delete a short URL",
        parameters: [{ $ref: "#/components/parameters/ShortCode" }],
        responses: {
          "204": { description: "URL deleted" },
          "400": {
            description: "Invalid short code",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ValidationError" },
              },
            },
          },
          "404": {
            description: "Short URL not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/{shortCode}": {
      get: {
        tags: ["Redirect"],
        summary: "Redirect to the original URL",
        description:
          "Increments the click counter and redirects with a 302. Open this link in the browser to see the redirect, because Swagger UI cannot follow cross-site redirects.",
        parameters: [{ $ref: "#/components/parameters/ShortCode" }],
        responses: {
          "302": {
            description: "Redirect to the original URL",
            headers: {
              Location: { schema: { type: "string", format: "uri" } },
            },
          },
          "400": {
            description: "Invalid short code",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ValidationError" },
              },
            },
          },
          "404": {
            description: "Short URL not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    parameters: {
      ShortCode: {
        name: "shortCode",
        in: "path",
        required: true,
        description: "Six alphanumeric characters",
        schema: { type: "string", pattern: "^[A-Za-z0-9]{6}$", example: "aB32xK" },
      },
    },
    schemas: {
      CreateUrlRequest: {
        type: "object",
        required: ["originalUrl"],
        properties: {
          originalUrl: {
            type: "string",
            format: "uri",
            example: "https://www.google.com",
          },
        },
      },
      CreatedUrl: {
        type: "object",
        properties: {
          originalUrl: { type: "string", example: "https://www.google.com" },
          shortCode: { type: "string", example: "aB32xK" },
          shortUrl: { type: "string", example: "http://localhost:3000/aB32xK" },
        },
      },
      Url: {
        type: "object",
        properties: {
          originalUrl: { type: "string", example: "https://www.google.com" },
          shortCode: { type: "string", example: "aB32xK" },
          shortUrl: { type: "string", example: "http://localhost:3000/aB32xK" },
          clicks: { type: "integer", example: 3 },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: { type: "string", example: "Short URL not found" },
        },
      },
      ValidationError: {
        type: "object",
        properties: {
          message: { type: "string", example: "Invalid data" },
          errors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                field: { type: "string", example: "originalUrl" },
                message: { type: "string", example: "Invalid URL" },
              },
            },
          },
        },
      },
    },
  },
};