const Tournament = require('../models/Tournament');
const challonge = require('../api/challonge');
const smashtrack = require('../api/smashtrack');

module.exports = async () => {
    let tourneys = await Tournament.query()
        .where('active', '=', 1)
        .where('challonge_id', '!=', 0)
        .whereNotNull('challonge_id')
    ;

    for (let i = 0; i < tourneys.length; i++) {
        let tourney = tourneys[i];
        await processTourney(tourney);
    }


};

async function processTourney (tourney) {
    let board = await smashtrack.getBoard(tourney.smashtrack_id);
    if (board.matches[board.matches.length-1].id === tourney.last_match_id) {
        return;
    }

    let smashtrackMatches = board.matches.filter(match => match.id > tourney.last_match_id);

    challonge.participants.index({id: tourney.challonge_id, callback: (err, participants) => {
        challonge.matches.index({id: tourney.challonge_id, callback: (err, challongeMatches) => {
            let openChallongeMatches = challongeMatches.filter(challongeMatch => challongeMatch.state === 'open');

            smashtrackMatches.forEach((match) => {
                // TODO: find winner of the SMASHTRACK match and update the relevant open challonge match
                // Find the correct participants
                let participant1 = participants.find((participant) => {
                    return parseInt(participant.participant.misc, 10) === parseInt(match.players[0].user.id);
                });
                let participant2 = participants.find((participant) => {
                    return parseInt(participant.participant.misc, 10) === parseInt(match.players[1].user.id);
                });

                let matchingChallongeMatch = openChallongeMatches.find((openChallongeMatch) => {
                    let player1MatchId = openChallongeMatch.match.player1Id;
                    let player2MatchId = openChallongeMatch.match.player2Id;

                    let participant1Id = participant1.participant.id;
                    let participant2Id = participant2.participant.id;

                    return (player1MatchId === participant1Id || player1MatchId === participant2Id) &&
                        (player2MatchId === participant1Id || player2MatchId === participant2Id);
                });

                if (matchingChallongeMatch) {

                }
            });
        }});
    }});
}


//"1"	"SmackBrackTest"	"50"	"7797845"	"1"	"double elimination"