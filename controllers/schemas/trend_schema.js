const trendOpts = {
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

module.exports = trendOpts;