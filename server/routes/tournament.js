const express = require('express');
const router = express.Router();
const _ = require('lodash');
const challonge = require('../api/challonge');
const smashtrack = require('../api/smashtrack');

// Router-specific
let Tournament = require('../models/Tournament');

router.get('/', function(req, res) {
    smashtrack.login();
});

router.post('/', async function(req, res) {
    try {
        const { boardId, name, type} = req.data;
        await smashtrack.login();
        let board = await smashtrack.getBoard(boardId);
        let tournament = {
            name: name,
            url: `smashtrack_${boardId}`,
            tournamentType: type,
            open_signup: false
        };

        if (type === 'swiss') {
            tournament.rounds = req.data.rounds;
        }

        let challongeTournament = challonge.tournaments.create({
            tournament
        });



    } catch(e) {

    }
});

module.exports = router;