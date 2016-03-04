import ConnectionState = require('connection-stat.enum');

interface DB {
	connection(): any;
	status(): ConnectionState;
}

export = DB;
