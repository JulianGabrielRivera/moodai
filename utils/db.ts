import { Prisma, PrismaClient } from "@/app/generated/prisma";

// fancy way to typescript coerce so that you can then convert it to whatever you want
const globalForPrisma = globalThis as unknown as {
    prisma:PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log:['query'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 