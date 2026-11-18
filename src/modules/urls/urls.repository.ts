import { prisma } from "../../config/prisma";

function hasErrorCode(error: unknown, code: string): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: unknown }).code === code
  );
}

export const isUniqueConstraintError = (error: unknown) =>
  hasErrorCode(error, "P2002");

const isRecordNotFoundError = (error: unknown) => hasErrorCode(error, "P2025");

export const urlsRepository = {
    create(data: { originalUrl: string; shortCode: string }) {
        return prisma.url.create({ data });
    },

    async incrementClicks(shortCode: string) {
        try {
        return await prisma.url.update({
            where: { shortCode },
            data: { clicks: { increment: 1 } },
        });
        } catch (error) {
        if (isRecordNotFoundError(error)) return null;
        throw error;
        }
    },

    findByShortCode(shortCode: string) {
        return prisma.url.findUnique({ where: { shortCode } });
    },

    findAll() {
        return prisma.url.findMany({ orderBy: { createdAt: "desc" } });
    },

    async deleteByShortCode(shortCode: string) {
        try {
            return await prisma.url.delete({ where: { shortCode } });
        } catch (error) {
        if (isRecordNotFoundError(error)) return null;
            throw error;
        }
    },
};