const gameRoutes = require('./game_routes');
const gamerRoutes = require('./gamer_routes');
module.exports = function(app, db) {
  gameRoutes(app, db),
  gamerRoutes(app, db)
  // Other route groups could go here, in the future
};