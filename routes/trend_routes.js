const getAnimeGenreTrend = require("../controllers/handlers/trend_handler");
const trendOpts = require("../controllers/schemas/trend_schema");

const routes = async (fastify, options) => {
    fastify.get('/:year/:season', trendOpts, async (request, reply) => {
        return getAnimeGenreTrend(request.params.year, request.params.season);
    });
};

module.exports = routes;