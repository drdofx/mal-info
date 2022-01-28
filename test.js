const dataJson = require('./test/dofx_anime.json');

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

genreRes = [];
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

genreRes.sort(compare);
console.log(
`Total Anime: ${dataJson.length}
Total Distinct Genres: ${genreRes.length}
List of Genres: ${genreRes.map(el => el.name + ' (' + el.count + ' anime)').join(', ')}
Anime list of each genre: ${genreRes.map(el => '\n' + el.name + ':\n- ' + el.animeList.join('\n- ')).join('\n')}

Favorite Genre: ${genreRes[0].name}`);