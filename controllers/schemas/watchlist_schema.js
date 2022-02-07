const genreRankOpts = {
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

const userInfoOpts = {
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
                    malUsername: { type: 'string' },
                    totalAnime: { type: 'number' },
                    totalGenre: { type: 'number' },
                    topWatchedGenre: { type: 'string' },
                    topWatchedGenreCount: { type: 'number' },
                    mostWatchdAnimeMediaType: { type: 'string' },
                    mostWatchdAnimeMediaTypeCount: { type: 'number' },
                    meanScore: { type: 'number' },
                    animeWithPerfectScore: { type: 'array', items: { type: 'string' } },
                    totalNumWatchedEpisodes: { type: 'number' },
                    totalActualEpisodes: { type: 'number' },
                    watchedEpisodesPercentage: { type: 'number' },
                    animeStatusCount: { 
                        type: 'object',
                        properties: {
                            statusIsWatching: { type: 'number' },
                            statusIsCompleted: { type: 'number' },
                            statusIsOnHold: { type: 'number' },
                            statusIsDropped: { type: 'number' },
                            statusIsPlanToWatch: { type: 'number' }
                        }
                    },
                    animeAiringStatusCount: {
                        type: 'object',
                        properties: {
                            animeIsCurrentlyAiring: { type: 'number' },
                            animeIsFinishedAiring: { type: 'number' },
                            animeIsNotAiringYet: { type: 'number' }
                        }
                    },
                    oldestAnime: { 
                        type: 'object',
                        properties: {
                            animeDate: { type: 'string' },
                            animeTitle: { type: 'string' }
                        }    
                    },
                    newestAnime: {
                        type: 'object',
                        properties: {
                            animeDate: { type: 'string' },
                            animeTitle: { type: 'string' }
                        }
                    }
                }
            }
        }
    }
}

module.exports = {
    genreRankOpts,
    userInfoOpts
};