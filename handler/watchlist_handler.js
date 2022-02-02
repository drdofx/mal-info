const { getUserWatchList } = require('../lib/mal-scraper.js');

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

const getInfoFromWatchList = async (username, type, status=null) => {
    const genreRes = []
    const dataJson = await getUserWatchList(username, type);
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
    
    genreRes.sort(compare);
    genreRes.map((el, index) => el['rank'] = index+1);

    return genreRes;
};

module.exports = getInfoFromWatchList;