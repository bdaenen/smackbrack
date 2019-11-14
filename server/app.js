require('dotenv').config();
const express = require('express');
const path = require('path');
let logger = require('morgan');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');

app.use(async function(req, res, next) {
    let allowedOrigins = [
        'http://127.0.0.1:8080',
        'http://localhost:8080',
        'http://127.0.0.1:8081',
        'http://localhost:8081',
        'https://smackbrack.benn0.be'
    ];

    let origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With'
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// Always approve preflight CORS requests.
app.options('/*', function(req, res, next) {
    res.sendStatus(200);
});


app.use('/tournament', require('./routes/tournament'));

setInterval(require('./cron/update_challonge'), 30000);

module.exports = app;