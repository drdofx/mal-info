const getAnimeGenreTrend = require("./trend");

const opts = {
    // schema: {
    //     response: {
    //         200: {
    //             type: 'object',
    //             properties: {
    //                 hello: { type: 'array' }
    //             }
    //         }
    //     }
    // }
}

const routes = async (fastify, options) => {
    fastify.get('/:params', opts, async (request, reply) => {
        return getAnimeGenreTrend(2022, 'winter');
    });
};

module.exports = routes;