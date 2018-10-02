import express from 'express';
import redis from 'redis';
import cities from './Utils/cities';

const app = express();

const redisClient = redis.createClient();
const citiesAsStrings = JSON.stringify(cities);
redisClient.set("geopoints", citiesAsStrings, redis.print);

export default app;
