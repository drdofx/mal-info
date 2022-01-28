const { getPastAnimeData } = require("./index");

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

const getAnimeGenreTrend = async (year, season) => {
    const genreCount = []
    console.log(year + " ok ");
    const data = await getPastAnimeData(year, season);
    Object.keys(data).map(dt => {
        data[dt].map(anime => {
            let temp = anime.genres[0].split(/\n\s*\n\s*/);
            temp.map(genre => {
                let getIndex = genreCount.findIndex(el => el.name === genre)
                if (getIndex !== -1)  {
                    genreCount[getIndex].count++;
                } else {
                    genreCount.push({name: genre, count: 1});
                }
            })
        })
    })
    genreCount.sort(compare);
    return genreCount;
};

module.exports = getAnimeGenreTrend;