const { getUserWatchList } = require('../../lib/mal-scraper.js');

// Sort array of objects by property value of count (int)
const compare = (a, b) => {
    if (a.count > b.count) {
        return -1;
    } else if (a.count < b.count) {
        return 1;
    } else {
        return 0;
    }
};

const getInfoFromWatchList = async (username, type) => {
    // Declare all variables
    const genreRes = [];
    const animeMediaType = [];
    const animeWithPerfectScore = [];
    let meanScore = 0, animeGivenScore = 0, totalNumWatchedEpisodes = 0, totalActualEpisodes = 0;
    let statusIsWatching = 0, statusIsCompleted = 0, statusIsOnHold = 0, statusIsDropped = 0, statusIsPlanToWatch = 0;
    let animeIsCurrentlyAiring = 0, animeIsFinishedAiring = 0, animeIsNotAiringYet = 0;

    // execute the async scrape function
    const dataJson = await getUserWatchList(username, type);

    let oldestAnime = {animeDate: new Date(dataJson[0].animeStartDateString), animeTitle:dataJson[0].animeTitle};
    let newestAnime = {animeDate: new Date(dataJson[0].animeStartDateString), animeTitle:dataJson[0].animeTitle};
    
    // map each data
    dataJson.map((data) => {
        // group each anime by its media type
        let getIndex = animeMediaType.findIndex(el => el.mediaType === data.animeMediaTypeString)
        if (getIndex !== -1) {
            animeMediaType[getIndex].count++;
        } else {
            animeMediaType.push({mediaType: data.animeMediaTypeString, count: 1});
        }

        // group each anime by its genre
        data.genres.map((genre) => {
            let getIndex = genreRes.findIndex(el => el.id === genre.id)
            if (getIndex !== -1)  {
                genreRes[getIndex].count++;
            } else {
                genreRes.push({...genre, count: 1});
            }
        })

        // get all user score of each anime
        if (data.score > 0) {
            meanScore += data.score;
            animeGivenScore++;
        }
    
        // get the total of watched episodes of each anime and the actual total episodes of each anime
        totalNumWatchedEpisodes += data.numWatchedEpisodes;
        totalActualEpisodes += data.animeNumEpisodes;

        // get the anime with user score of 10 (perfect score)
        if (data.score === 10) {
            animeWithPerfectScore.push(data.animeTitle);
        }

        // get the status of each anime
        switch(data.status) {
            case 1:
                statusIsWatching++;
                break;
            case 2:
                statusIsCompleted++;
                break;
            case 3:
                statusIsOnHold++;
                break;
            case 4:
                statusIsDropped++;
                break;
            case 6:
                statusIsPlanToWatch++;
                break;
        }

        // get the airing status of each anime
        switch(data.animeAiringStatus) {
            case 1:
                animeIsCurrentlyAiring++;
                break;
            case 2:
                animeIsFinishedAiring++;
                break;
            case 3:
                animeIsNotAiringYet++;
                break;
        }

        // get the oldest and newest anime by comparing each anime's start date
        let dateTemp = data.animeStartDateString !== null ? new Date(data.animeStartDateString) : null;

        if (dateTemp && dateTemp > newestAnime.animeDate) {
            newestAnime.animeDate = dateTemp;
            newestAnime.animeTitle = data.animeTitle;
        }

        if (dateTemp && dateTemp < oldestAnime.animeDate) {
            oldestAnime.animeDate = dateTemp;
            oldestAnime.animeTitle = data.animeTitle;
        }

    });

    // sort genre and media type array by count in decreasing order
    genreRes.sort(compare);
    animeMediaType.sort(compare);

    // calculate the mean score of all anime and round it to 2 decimal places
    meanScore = animeGivenScore === 0 ? 0 : Math.round((meanScore/animeGivenScore + Number.EPSILON) * 100) / 100;

    // calculate the watched episodes percentage of all anime and round it to 2 decimal places
    let watchedEpisodesPercentage = totalActualEpisodes === 0 ? 0 : Math.round((totalNumWatchedEpisodes/totalActualEpisodes + Number.EPSILON) * 100) / 100;

    // convert oldestAnime and newestAnime date to string
    oldestAnime.animeDate = oldestAnime.animeDate.toLocaleDateString();
    newestAnime.animeDate = newestAnime.animeDate.toLocaleDateString();

    // final object data
    objData = {
        malUsername: username,
        totalAnime: dataJson.length,
        totalGenre: genreRes.length,
        topWatchedGenre: genreRes[0].name,
        topWatchedGenreCount: genreRes[0].count,
        mostWatchdAnimeMediaType: animeMediaType[0].mediaType,
        mostWatchdAnimeMediaTypeCount: animeMediaType[0].count,
        meanScore: meanScore,
        animeWithPerfectScore: animeWithPerfectScore,
        totalNumWatchedEpisodes: totalNumWatchedEpisodes,
        totalActualEpisodes: totalActualEpisodes,
        watchedEpisodesPercentage: watchedEpisodesPercentage,
        animeStatusCount: {
            statusIsWatching: statusIsWatching,
            statusIsCompleted: statusIsCompleted,
            statusIsOnHold: statusIsOnHold,
            statusIsDropped: statusIsDropped,
            statusIsPlanToWatch: statusIsPlanToWatch
        },
        animeAiringStatusCount: {
            animeIsCurrentlyAiring: animeIsCurrentlyAiring,
            animeIsFinishedAiring: animeIsFinishedAiring,
            animeIsNotAiringYet: animeIsNotAiringYet
        },
        oldestAnime: oldestAnime,
        newestAnime: newestAnime
    };

    // return the final object
    return objData;
};


const getGenreRankFromWatchList = async (username, type, status=null) => {
    // declare all variables
    const genreRes = []

    // execute the async scrape function
    const dataJson = await getUserWatchList(username, type);

    // map each data, only deal with anime with status === 2 (completed) if status argument is 'ok', else deal with all anime
    if (status === 'ok') {
        dataJson.map((data) => {
            if (data.status === 2) {
                data.genres.map((genre) => {
                    let getIndex = genreRes.findIndex(el => el.id === genre.id)
                    if (getIndex !== -1)  {
                        genreRes[getIndex].count++;
                        genreRes[getIndex].animeList.push(data.animeTitle);
                    } else {
                        genreRes.push({...genre, count: 1, animeList: [data.animeTitle]});
                    }
                })
            }
        });
    } else {
        dataJson.map((data) => {
            // console.log(data.animeMediaTypeString)
            data.genres.map((genre) => {
                let getIndex = genreRes.findIndex(el => el.id === genre.id)
                if (getIndex !== -1)  {
                    genreRes[getIndex].count++;
                    genreRes[getIndex].animeList.push(data.animeTitle);
                } else {
                    genreRes.push({...genre, count: 1, animeList: [data.animeTitle]});
                }
            }
        )});
    }
    
    // sort genre array by count in decreasing order
    genreRes.sort(compare);

    // add rank property to each genre
    genreRes.map((el, index) => el['rank'] = index+1);

    // add genreRes array to objData
    objData = {genreRanks: genreRes};

    // return objData
    return objData;
};

module.exports = {
    getGenreRankFromWatchList,
    getInfoFromWatchList
};