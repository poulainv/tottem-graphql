import { ItemType } from '@generated/photon'
import querystring from 'querystring'
import { IItem } from '../interfaces'
import { SimpleFetch } from './fetchers'
import logger from '../logging'

const MOVIEDB_GENRES: { [i: number]: string } = {
    28: 'Action',
    12: 'Aventure',
    16: 'Animation',
    35: 'Comédie',
    80: 'Crime',
    99: 'Documentaire',
    18: 'Drame',
    10751: 'Familial',
    14: 'Fantastique',
    36: 'Histoire',
    27: 'Horreur',
    10402: 'Musique',
    9648: 'Mystère',
    10749: 'Romance',
    878: 'Science-Fiction',
    10770: 'Téléfilm',
    53: 'Thriller',
    10752: 'Guerre',
    37: 'Western',
}

export async function MovieDBSearch(
    title: string,
    year?: number,
    lang?: string
): Promise<IItem> {
    const text = await SimpleFetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
            process.env.MOVIEDB_API_KEY
        }${
            lang !== undefined ? `&language=${lang}` : ''
        }${`&${querystring.encode({
            query: title,
        })}`}&page=1&include_adult=true${
            year !== undefined ? `&year=${year}` : ''
        }`
    )
    logger.info(`Call done response!`)
    const response = JSON.parse(text)
    if (
        response === undefined ||
        response.total_results === undefined ||
        response.total_results === 0
    ) {
        logger.error(`No result for ${title}}`)
        return Promise.reject()
    }
    const best = response.results[0]
    return {
        title: best.title,
        author: '',
        description: best.overview,
        productUrl: `https://www.themoviedb.org/movie/${best.id}`,
        type: 'movie' as ItemType,
        imageUrl:
            best.poster_path &&
            `https://image.tmdb.org/t/p/w500${best.poster_path}`,
        meta: {
            releaseDate: best.release_date,
            voteAverage: best.vote_average,
            genres: best.genre_ids.map((x: number) => MOVIEDB_GENRES[x]),
        },
    }
}
