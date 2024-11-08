import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var cachedPrimse: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrimse) {
    global.cachedPrimse = new PrismaClient();
  }

  prisma = global.cachedPrimse;
}

export const db = prisma;
