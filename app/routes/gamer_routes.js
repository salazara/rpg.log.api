var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
	/*
	app.get('/games/:id', (req, res) => {
		const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
	    db.collection('games').findOne(details, (err, item) => {
	    	if (err) {
	    		res.send({'error':'An error has occurred'});
	    	} else {
	    		res.send(item);
	    	}
    	});
	});
	*/
	/*
	app.get('/gamers/searchTitle/:searchTitle', (req, res) => {
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
	*/
	app.get('/gamers', (req, res) => {
    	res.setHeader('Access-Control-Allow-Origin', '*');
		//const searchTitle = req.params.searchTitle;
		db.collection('gamers')
			.find()
			.toArray(function(err, documents) {
			    if (err){
			    	res.send({'error':'An error has occurred'});
			    } else {
			    	res.send(documents);
				}
			});
	});
};
