const challonge = require('challonge');

// create a new instance of the client
module.exports = challonge.createClient({
  apiKey: process.env.CHALLONGE_API_KEY,
});
