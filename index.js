const malScraper = require('mal-scraper');
const fs = require('fs');

const username = "dofx";
const type = "anime";
    
const getUserWatchList = async (username, type) => {
    let userData = await malScraper.getWatchListFromUser(username, type);
    return userData;
}

getUserWatchList(username, type)
    .then(data => fs.writeFile(`${username}_${type}.json`, JSON.stringify(data), err => {
        if (err) {
            console.error(err);
        }
    }))
    .catch(err => console.error(err));
