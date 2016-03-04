import express = require('express');
import morgan = require('morgan');
import path = require('path');

const port: number = process.env.PORT || 3000;
const app = express();

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
} else {
	app.use(morgan('common'));
}

app.use('/', express.static(path.join(__dirname, '..', 'public')));
app.use('/lib', express.static(path.join(__dirname, '..', 'node_modules')));

app.get('/', (req: express.Request, res: express.Response) => {
	res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => console.log('listening to port 3000'));
