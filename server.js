const fastify = require('fastify')({ logger: true });

fastify.register(require('./routes/trend_routes'), { prefix: '/trend' });
fastify.register(require('./routes/watchlist_routes'), { prefix: '/watchlist' });

const start = async () => {
    try {
        await fastify.listen(process.env.PORT || 3000, '0.0.0.0')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
};

start();