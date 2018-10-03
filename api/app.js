import express from 'express';
import redis from 'redis';
import cities from './Utils/cities';
import ForecastApi from "./Utils/ForecastApi";

const apiUrl = 'https://api.darksky.net/forecast/40f80393884a99ecc7c1a2b0bc2a4952/';

const app = express();

const redisClient = redis.createClient();
const citiesAsStrings = JSON.stringify(cities);
redisClient.set("geopoints", citiesAsStrings, redis.print);

const forecastApi = new ForecastApi(redisClient, apiUrl);
forecastApi.getCityForecast(-33.45,-70.7).then(res => { console.log(res) });


export default app;
