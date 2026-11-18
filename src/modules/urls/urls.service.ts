import { randomInt } from "node:crypto";
import { env } from "../../config/env";
import { AppError } from "../../shared/errors/app-error";
import type { CreateUrlDto } from "./urls.dto";
import { isUniqueConstraintError, urlsRepository } from "./urls.repository";
import type { Url } from "../../generated/prisma/client";

const ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const CODE_LENGTH = 6;
const MAX_ATTEMPTS = 5;

function generateShortCode(): string {
    let code = "";
    for (let i = 0; i < CODE_LENGTH; i++) {
        code += ALPHABET[randomInt(ALPHABET.length)];
    }
    return code;
}

function toResponse(url: Url) {
  return {
    originalUrl: url.originalUrl,
    shortCode: url.shortCode,
    shortUrl: `${env.baseUrl}/${url.shortCode}`,
    clicks: url.clicks,
    createdAt: url.createdAt,
  };
}

export const urlsService = {
    async create({ originalUrl }: CreateUrlDto) {
        for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const shortCode = generateShortCode();

        try {
            const url = await urlsRepository.create({ originalUrl, shortCode });

            return {
            originalUrl: url.originalUrl,
            shortCode: url.shortCode,
            shortUrl: `${env.baseUrl}/${url.shortCode}`,
            };
        } catch (error) {
            if (!isUniqueConstraintError(error)) throw error;
        }
        }

        throw new AppError("Could not generate a unique short code", 500);
    },

    async resolve(shortCode: string) {
    const url = await urlsRepository.incrementClicks(shortCode);

    if (!url) {
      throw new AppError("Short URL not found", 404);
    }

    return url.originalUrl;
  },

    async findOne(shortCode: string) {
        const url = await urlsRepository.findByShortCode(shortCode);

        if (!url) {
            throw new AppError("Short URL not found", 404);
        }

        return toResponse(url);
    },

    async findAll() {
        const urls = await urlsRepository.findAll();
        return urls.map(toResponse);
    },

    async remove(shortCode: string) {
        const url = await urlsRepository.deleteByShortCode(shortCode);

        if (!url) {
            throw new AppError("Short URL not found", 404);
        }
    },
};