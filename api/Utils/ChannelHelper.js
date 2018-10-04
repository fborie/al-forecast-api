import socketIo from 'socket.io';
import {promisify} from 'util';

class ChannelHelper{
    
    constructor(server, citiesHelper){
        this.io = socketIo(server);
        this.citiesHelper = citiesHelper;
        this.startChannel = this.startChannel.bind(this);
    }

    startChannel(){
        let interval = null;
        this.io.on("connection", socket => {
            console.log("New client connected");
            if (interval) {
                clearInterval(interval);
            }
            interval = setInterval(
                async () => {
                    let data = await this.citiesHelper.getCitiesForecast();
                    socket.emit("update", data );
                }, 10000);

            socket.on("disconnect", () => {
                console.log("Client disconnected");
            });
        });
    }

}

export default ChannelHelper;