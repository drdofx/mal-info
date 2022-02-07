const {
    getGenreRankFromWatchList, 
    getInfoFromWatchList 
} = require('../controllers/handlers/watchlist_handler');

const {
    genreRankOpts,
    userInfoOpts
} = require('../controllers/schemas/watchlist_schema');

const routes = async (fastify, options) => {
    fastify.get('/anime/:username', genreRankOpts, async (request, reply) => {
        return getGenreRankFromWatchList(request.params.username, 'anime');
    });

    fastify.get('/ok/anime/:username', genreRankOpts, async (request, reply) => {
        return getGenreRankFromWatchList(request.params.username, 'anime', 'ok');
    });

    fastify.get('/fact/anime/:username', userInfoOpts, async (request, reply) => {
        return getInfoFromWatchList(request.params.username, 'anime');
    });
};

module.exports = routes;