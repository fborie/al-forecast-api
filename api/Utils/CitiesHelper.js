import cities from '../cities';

class CitiesHelper{

    constructor(redisRepository, forecastApi){
        this.redisRepository = redisRepository;
        this.forecastApi = forecastApi;
        this.saveCities = this.saveCities.bind(this);
        this.getCitiesForecast = this.getCitiesForecast.bind(this);
    }

    saveCities = () => {
        for(let i = 0; i < cities.length; i++){
            this.redisRepository.hashSetAsync("cities", cities[i].key, `${cities[i].lat},${cities[i].lon}`);
        }
    }
    
    getCitiesForecast = async () => {
        let data = [];
        for(let i = 0; i < cities.length; i++){
            let city = cities[i];
            let geospace = await this.redisRepository.hashGetAsync('cities', city.key);
            let forecastApiData = await this.forecastApi.getCityForecast(geospace);
            data.push({name: city.key, country: city.country, ...forecastApiData});
        };
        return data;
    }

}

export default CitiesHelper;
