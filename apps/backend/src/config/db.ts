import { PrismaClient } from "@prisma/client";
import pino from "pino";
import { SuperJSON } from "superjson";
import { env } from "./env";

import {
    CacheCase,
    PrismaExtensionRedis,
    type AutoCacheConfig,
    type CacheConfig,
} from "prisma-extension-redis";

// Redis “client” config for prisma-extension-redis
const redisURL = new URL(env.REDIS_URL);

const client = {
    family: 0, // 0 (IPv4) or 6 (IPv6)
    host: redisURL.hostname, // e.g. "localhost" or your Railway host
    port: redisURL.port, // a number,
    username: redisURL.username,
    password: redisURL.password,
};

// logger
const logger = pino({
    transport: {
        target: "pino-pretty",
        options: { colorize: true },
    },
    level: "debug",
});

// auto‐cache settings
const auto: AutoCacheConfig = {
    excludedModels: [],
    excludedOperations: ["findFirst", "count"],
    models: [
        { model: "User", excludedOperations: ["count"], ttl: 10, stale: 5 },
    ],
    ttl: 30,
};

// main cache config
const config: CacheConfig = {
    ttl: 60,
    stale: 30,
    auto,
    logger,
    onHit: (key) => logger.info({ key }, "CACHE HIT"),
    onMiss: (key) => logger.info({ key }, "CACHE MISS"),
    onError: (err) => logger.error(err, "CACHE ERROR"),
    transformer: {
        serialize: (data) => SuperJSON.stringify(data),
        deserialize: (str) => SuperJSON.parse(str),
    },
    type: "JSON",
    cacheKey: {
        case: CacheCase.SNAKE_CASE,
        delimiter: ":",
        prefix: "prisma",
    },
};

// Prisma Client
// extend Prisma with Redis caching
const prisma = new PrismaClient();

//  Double cast to ensure TypeScript understands the extended Prisma client
const extendedPrisma = prisma.$extends(
    PrismaExtensionRedis({ config, client })
) as unknown as PrismaClient;

export default extendedPrisma;
