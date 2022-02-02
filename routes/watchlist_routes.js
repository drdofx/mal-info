const getInfoFromWatchList = require('../handler/watchlist_handler');

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

const routes = async (fastify, options) => {
    fastify.get('/:type/:username', opts, async (request, reply) => {
        return getInfoFromWatchList(request.params.username, request.params.type);
    });

    fastify.get('/ok/:type/:username', opts, async (request, reply) => {
        return getInfoFromWatchList(request.params.username, request.params.type, 'ok');
    });
};

module.exports = routes;