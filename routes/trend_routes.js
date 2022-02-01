const getAnimeGenreTrend = require("../handler/trend_handler");

const opts = {
    schema: {
        params: {
            type: 'object',
            properties: {
                year: { type: 'number' },
                season: { type: 'string' }
            }
        },
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        rank: { type: 'number' },
                        genreName: { type: 'string' },
                        genreCount: { type: 'number' },
                        genreListAnime: { type: 'array', items: { type: 'string' } }
                    }
                }
            }
        }
    }
}

const routes = async (fastify, options) => {
    fastify.get('/:year/:season', opts, async (request, reply) => {
        return getAnimeGenreTrend(request.params.year, request.params.season);
    });
};

module.exports = routes;