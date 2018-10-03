export const cities = [
    {
        key: "santiago",
        country: "Chile",
        lat: -33.45,
        lon: -70.6
    },
    {
        key: "zurich",
        country: "Suiza",
        lat: 47.3,
        lon: 8.54
    },
    {
        key: "auckland",
        country: "Nueva Zelanda",
        lat: -36.85,
        lon: 174.78
    },
    {
        key: "sydney",
        country: "Australia",
        lat: -33.87,
        lon: 151.2
    },
    {
        key: "londres",
        country: "Inglaterra",
        lat: 51.5,
        lon: -0.1275 
    },
    {
        key: "atlanta",
        country: "Estados Unidos de America",
        lat: 33.75,
        lon: -84.39
    }
];

export const saveCities = (redisClient) => {
    cities.forEach( city => {
        redisClient.hset("cities", city.key, `${city.lat},${city.lon}`);
    })
}