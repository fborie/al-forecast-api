const cities = [
    {
        key: "santiago",
        lat: -33.45,
        lon: -70.6
    },
    {
        key: "zurich",
        lat: 47.3,
        lon: 8.54
    },
    {
        key: "auckland",
        lat: -36.85,
        lon: 174.78
    },
    {
        key: "sydney",
        lat: -33.87,
        lon: 151.2
    },
    {
        key: "london",
        lat: 51.5,
        lon: -0.1275 
    },
    {
        key: "atlanta",
        lat: 33.75,
        lon: -84.39
    }
];

export const saveCities = (redisClient) => {
    cities.forEach( city => {
        redisClient.hset("cities", city.key, `${city.lat},${city.lon}`);
    })
}

export const getCitiesName = () => {
    return cities.map( city => {
        return city.key;
    })
}