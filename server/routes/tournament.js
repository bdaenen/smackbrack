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
        const { boardId, name, type } = req.body;
        let authenticated = await smashtrack.login();
        if (!authenticated) {
            return res.json({success: false, message: 'Something went wrong.'})
        }
        let board = await smashtrack.getBoard(boardId);
        if (!board) {
            return res.json({success: false, message: 'Something went wrong.'})
        }

        let tournament = {
            name: name,
            url: `smashtrack_${boardId}`,
            tournament_type: type,
            open_signup: false,
            // Smash bros Ultimate
            game_id: 141059
        };

        if (type === 'swiss') {
            tournament.rounds = req.data.rounds;
        }

        challonge.tournaments.create({
            tournament,
            callback: async (err, data) => {
                if (err) {
                    return console.log(err);
                }

                let smackbrackTournament = await Tournament.query().insert({
                    name,
                    smashtrack_id: boardId,
                    challonge_id: data.tournament.id,
                    tournament_type: data.tournament.tournamentType,
                });

                let creationCounter = 0;
                let timeout = 10000;
                let timeoutRef = setTimeout(() => {
                    res.status(500);
                    res.json({success: false, message: `Timed out while adding participants to Challonge. Please manage your tournament manually at https://challonge.com/${data.tournament.url}`});
                }, timeout);

                board.users.forEach((user, idx) => {
                    challonge.participants.create({
                        id: data.tournament.url,
                        participant: {
                            name: user.tag,
                            misc: user.id
                        },
                        callback: (err, participantData) => {
                            if (err) {
                                console.log(err);
                            }
                            creationCounter++;
                            if (creationCounter === board.users.length) {
                                clearTimeout(timeoutRef);
                                res.json({message: `Tournament created! Set up at https://challonge.com/${data.tournament.url}. As soon as your tournament started it will automatically be updated with smacker data.`, success: true});
                            }
                        }
                    })
                })
            },
        });
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;