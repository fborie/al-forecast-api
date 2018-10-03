import request from 'request';
import moment from 'moment';

const checkIfRequestFailed = () => {
    if(Math.random() < 0.1){
        throw new Error('How unfortunate! The API Request Failed')
    }
}

class ForecastApi{
    constructor(redisClient, apiUrl){
        this.redisClient = redisClient;
        this.apiUrl = apiUrl;
        this._doGetRequest = this._doGetRequest.bind(this);
    }

    _doGetRequest = (queryString) => {
        return new Promise((resolve,reject) => {
           const apiUrlWithParams = this.apiUrl + `${queryString}`;
           request(apiUrlWithParams, (err, res, body) => {
               if(err){
                   return reject(err);
               }
               resolve(body);
           });
       })
   }

   _getForecast = async (geospace) => {
        try{
            let body = await this._doGetRequest(geospace);
            let jsonResponse = JSON.parse(body);
            return {
                temperature: jsonResponse.currently.temperature,
                time: jsonResponse.currently.time,
                timezone: jsonResponse.timezone,
            };
        }catch(error){
            console.log(error.message);
        }
   }
    
    getCityForecast = async (geospace) => {
        let succeeded = false;
        while (true){
            try{
                checkIfRequestFailed();
                return this._getForecast(geospace); 
            }
            catch(error){
                console.log(error.message);
                this.redisClient.hset('api.errors', moment().unix(), error.message);
            }
        }
    }
}

export default ForecastApi;

