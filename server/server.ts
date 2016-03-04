import express = require('express');
import morgan = require('morgan');
import path = require('path');
import glob = require('glob');
import consolidate = require('consolidate');
import Mongo = require('./database/mongo');

const port: number = process.env.PORT || 3000;
const app = express();

const db = new Mongo();
db.connect();

function getAngularTests() {
	let files = glob.sync('public/**/*.spec.js');

	return files.map(function (file) {
		return file.replace('public', '');
	});
}

app.locals.angularTests = getAngularTests();

// assign the swig engine to .html files
app.engine('html', consolidate.swig);

// set .html as the default extension
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
} else {
	app.use(morgan('common'));
}

app.use('/', express.static(path.join(__dirname, '..', 'public')));
app.use('/lib', express.static(path.join(__dirname, '..', 'node_modules')));

if (process.env.NODE_ENV === 'testing') {
	app.get('/', (req: express.Request, res: express.Response) => res.render('ng-unit-tests'));
} else {
	app.get('/', (req: express.Request, res: express.Response) => res.render('index'));
}

app.listen(port, () => console.log('listening to port 3000'));
