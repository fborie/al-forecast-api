import express from 'express';
import redis from 'redis';
import ForecastApi from "./Utils/ForecastApi";
import { saveCities } from './Utils/CitiesHelper';

const apiUrl = 'https://api.darksky.net/forecast/40f80393884a99ecc7c1a2b0bc2a4952/';

const app = express();

const redisClient = redis.createClient();

saveCities(redisClient);

const forecastApi = new ForecastApi(redisClient, apiUrl);
//forecastApi.getCityForecast(-33.45,-70.7).then(res => { console.log(res) });


export default app;
