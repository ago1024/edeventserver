
import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import { AddressInfo } from 'net';
import { EventServer } from './server/event-server';

const app = express();

const EDDISPLAY = process.env.EDDISPLAY || path.resolve(__dirname, 'eddisplay');


app.use('/eddisplay', express.static(EDDISPLAY));
app.get('/eddisplay/*', function(req, res) {
	res.sendFile(path.resolve(EDDISPLAY, 'index.html'));
});
app.get('/', function(req, res) {
	res.redirect('/eddisplay');
});
const server = http.createServer(app);

new EventServer({ server: server });

server.listen(process.env.PORT || 8000, () => {
	const address = server.address() as AddressInfo;
	console.log(`Server started on port ${address.port}`);
	console.log(`Connect to ws://localhost:${address.port}`);
})