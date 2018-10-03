import http from 'http';
import app from './api/app';
import socketIo from 'socket.io';

import {promisify} from 'util';

const hashGetAsync = promisify(app.redisClient.hget).bind(app.redisClient);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);

const io = socketIo(server);

let interval;
io.on("connection", socket => {
  
    console.log("New client connected");
  
    if (interval) {
        clearInterval(interval);
    }
  
    interval = setInterval(
        async () => {
        let data = {};
        for(let i = 0; i < app.cities.length; i++){
            let geospace = await hashGetAsync('cities', app.cities[i]);
            let forecastApiData = await app.forecastApi.getCityForecast(geospace);
            data[app.cities[i]] = forecastApiData;
        };
        socket.emit("update", data );

        }, 10000);
  
    

    socket.on("disconnect", () => {

        console.log("Client disconnected");

    });
});

server.listen(port, () => console.log(`Listening on ${port}!`));
