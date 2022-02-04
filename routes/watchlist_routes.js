const {
    getGenreRankFromWatchList, 
    getInfoFromWatchList 
} = require('../handler/watchlist_handler');

const opts = {
    schema: {
        params: {
            type: 'object',
            properties: {
                type: { type: 'string' },
                username: { type: 'string' }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    genreRanks: { 
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                rank: { type: 'number' },
                                id: { type: 'number' },
                                name: { type: 'string' },
                                count: { type: 'number' },
                                animeList: { type: 'array', items: { type: 'string' } }
                            }
                        }
                    }
                }
            }
        }
    }
}

const routes = async (fastify, options) => {
    fastify.get('/anime/:username', opts, async (request, reply) => {
        return getGenreRankFromWatchList(request.params.username, 'anime');
    });

    fastify.get('/ok/anime/:username', opts, async (request, reply) => {
        return getGenreRankFromWatchList(request.params.username, 'anime', 'ok');
    });

    fastify.get('/fact/anime/:username', async (request, reply) => {
        return getInfoFromWatchList(request.params.username, 'anime');
    });
};

module.exports = routes;