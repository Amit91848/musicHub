import redisClient from "../config/redisSetup";

function isRedisConnected() {
    return redisClient.isReady;
}

export async function findInCache(key: string) {
    if (isRedisConnected()) {
        return null;
        const value = await redisClient.get(key);

        return value;
    } else return null;
}

export async function setCache(key: string, value: string) {
    if (isRedisConnected()) {
        return null;
        return await redisClient.set(key, value);
    } else return null;
}

export async function setExCache(key: string, value: string, expiry = 60 * 60 * 24) { // 1 day
    if (isRedisConnected()) {
        // return await redisClient.SETEX(key, expiry, value);
        return null;
    } else return null
}