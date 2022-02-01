const { getPastAnimeData } = require("../lib/mal-scraper");

// Sort array of objects by property value of count (int)
const compare = (a, b) => {
    if (a.genreCount > b.genreCount) {
        return -1;
    } else if (a.genreCount < b.genreCount) {
        return 1;
    } else {
        return 0;
    }
};

const getAnimeGenreTrend = async (year, season) => {
    const listGenres = []
    // console.log(year + " ok ");
    const data = await getPastAnimeData(year, season);
    Object.keys(data).map(dt => {
        data[dt].map(anime => {
            let temp = anime.genres[0].split(/\n\s*\n\s*/);
            temp.map(genre => {
                let getIndex = listGenres.findIndex(el => el.genreName === genre)
                if (getIndex !== -1)  {
                    listGenres[getIndex].genreCount++;
                    listGenres[getIndex].genreListAnime.push(anime.title);
                } else {
                    listGenres.push({genreName: genre, genreCount: 1, genreListAnime: [anime.title]});
                }
            })
        })
    })
    listGenres.sort(compare);
    listGenres.map((el, index) => el['rank'] = index+1);
    return listGenres;
};

module.exports = getAnimeGenreTrend;