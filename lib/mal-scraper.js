const malScraper = require('mal-scraper');
const fs = require('fs');
    
const getUserWatchList = async (username, type) => {
    let userData = await malScraper.getWatchListFromUser(username, type);
    return userData;
}

const getPastAnimeData = async (year, season, type=null) => {
    let animeData;
    if (type === null) {
        animeData = await malScraper.getSeason(year, season);
    } else {
        animeData = await malScraper.getSeason(year, season, type);
    }
    return animeData;
};

const queryAnime = async (query) => {
    let queryData = await malScraper.getResultsFromSearch(query);
    return queryData;
};

const getAnimeInfoName = async(name) => {
    let animeData = await malScraper.getInfoFromName(name);
    return animeData;
}

const getAnimeInfoURL = async(url) => {
    let animeData = await malScraper.getInfoFromURL(url);
    return animeData;
}

module.exports = {
    getUserWatchList,
    getPastAnimeData,
    queryAnime,
    getAnimeInfoName,
    getAnimeInfoURL
}

