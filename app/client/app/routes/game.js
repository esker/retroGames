// Import game from schema
import Game from '../models/game';

// retrieve all games by post date
const getGames = (request, response) => {
    Game.find(null, null, { sort: {postDate: 1}}, (error, games) => {
        if (error) {
            response.send(error);
        }
        res.json(games);
    });
};