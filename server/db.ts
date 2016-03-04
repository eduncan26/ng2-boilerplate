import mongoose = require('mongoose');

class DB {
	private connectionString: string;

	constructor(connectionString: string) {
		this.connectionString = connectionString || 'mongodb://localhost/angularattack';
	}

	public connect() {
		mongoose.connect(this.connectionString, (err) => {
			if (err) {
				console.log('Could not connect to Mongo!!');
				console.log(err.name);
				console.log(err.message);
			}
		});
	}
}

export = DB;


interface DB {
	connect(): any;
	heartbeat(): ConnectionState;
}
