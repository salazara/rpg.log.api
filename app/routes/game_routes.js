var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
	app.get('/games/searchTitle/:searchTitle', (req, res) => {
    	res.setHeader('Access-Control-Allow-Origin', '*');
		const searchTitle = req.params.searchTitle;
		db.collection('games')
			.find({'title': {'$regex': searchTitle, '$options' : 'i'}})
			.sort({'title': 1})
			.toArray(function(err, documents) {
			    if (err){
			    	res.send({'error':'An error has occurred'});
			    } else {
			    	res.send(documents);
				}
			});
	});
	app.get('/games/backlog/:gamerID', (req, res) => {
    	res.setHeader('Access-Control-Allow-Origin', '*');
		const gamerID = req.params.gamerID;

		db.collection('gamers')
			.findOne({'_id': ObjectID(gamerID)}, function(err,gamer){
				if (err || !gamer){
			    	res.send({'error':'An error has occurred'});
			    } else {
			  		var gameIDs = [];
					for(var i = 0; i < gamer.backlog.length ; i++){
						gameIDs.push(ObjectID(gamer.backlog[i]));
					}

					db.collection('games')
						.find({'_id': {'$in': gameIDs }})
						.toArray(function(err, documents) {
						    if (err){
						    	res.send({'error':'An error has occurred'});
						    } else {
						    	res.send(documents);
							}
						});
				}
			});
	});
};
