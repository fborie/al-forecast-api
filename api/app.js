import express from 'express';
import redis from 'redis';
import CitiesHelper from './Utils/CitiesHelper';
import RedisRepository from './Repositories/RedisRepository';
import { setTimeout } from 'core-js/library/web/timers';
import ForecastApi from './Utils/ForecastApi';

const app = express();

let client = redis.createClient();
const redisRepository = new RedisRepository(client);
const forecastApi = new ForecastApi(redisRepository);
const citiesHelper = new CitiesHelper(redisRepository, forecastApi);
citiesHelper.saveCities();

app.citiesHelper = citiesHelper;

export default app;