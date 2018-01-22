var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.setHeader('Access-Control-Allow-Methods', 'GET');
		//res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
		next();
	});
	// get list of games with title matching '.*searchTitle.*'
	app.get('/games/searchByTitle/:title', (req, res) => {
		const title = req.params.title;
		db.collection('games')
			.find({'title': {'$regex': title, '$options' : 'i'}})
			.sort({'title': 1})
			.toArray(function(err, documents) {
			    if (err){
			    	res.send({'error':'an error has occurred'});
			    } else {
			    	res.send(documents);
				}
			});
	}); 
	// get list of games with title matching IDs seperated by commas
	app.get('/games/searchByIDs/:IDs', (req, res) => {
		var IDs = req.params.IDs.split(',');
		for(var i = 0 ; i < IDs.length ; i++){
			IDs[i] = ObjectID(IDs[i]);
		}
		db.collection('games')
			.find({'_id': {'$in': IDs }})
			.sort({'title': 1})
			.toArray(function(err, documents) {
			    if (err){
			    	res.send({'error':'an error has occurred'});
			    } else {
			    	res.send(documents);
				}
			});
	});
};
