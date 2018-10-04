import http from 'http';
import app from './api/app';
import ChannelHelper from './api/Utils/ChannelHelper';


const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);

const channelHelper = new ChannelHelper(server, app.citiesHelper);
channelHelper.startChannel();

server.listen(port, () => console.log(`Listening on ${port}!`));
