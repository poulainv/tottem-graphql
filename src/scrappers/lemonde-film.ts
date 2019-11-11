import fs from 'fs'
// import lemonde from '../../data/lemonde-movies.json'
import pThrottle from 'p-throttle'
import { ItemType } from '../../../src/types'
import { IItem } from '../interfaces'
import logger from '../logging'
import { MovieDBSearch } from '../parsers/searchers'

interface Movie {
    title: string
    author: string
    genre: string
    year: number
}

async function launchLemonde() {
    const movies: Movie[] = []

    const now = Date.now()

    const throttled = pThrottle(
        (title: string) =>
            MovieDBSearch(title, undefined, 'fr-FR').catch(e => e),
        3,
        1000
    )

    const items: IItem[] = []
    for (let i = 0; i < movies.length; i++) {
        const element = movies[i]
        items.push({
            title: element.title,
            ...(await throttled(element.title)),
            author: element.author,
            provider: 'moviedb',
            type: 'movie' as ItemType,
        })
    }
    return await Promise.all(items.filter(x => x !== undefined))
}

const main = async () => {
    const ret = await launchLemonde()
    const json = JSON.stringify([
        {
            name: 'Films',
            index: 0,
            id: 'film-1',
            collections: [
                {
                    id: '1-chefs-doeuvre-cinema-lemonde-films',
                    name:
                        "Les 100 chefs-d’œuvre du cinéma d'après le critiques cinéma du « Monde » depuis 1944",
                    detail:
                        "Paru [en 2018 ici](https://www.lemonde.fr/cinema/article/2018/12/22/les-100-chefs-d-uvre-du-cinema-qui-ont-le-plus-enthousiasme-les-critiques-du-monde-depuis-1944_5401412_3476.html), un article propose de se replonger dans les films du siècle qui ont marqué les critiques du journal. J'ai découvert de pépites! _Plongée dans sept décennies d’archives du « Monde », à la découverte de 100 films qui, à leur sortie, ont été défendus avec ardeur par le journal. Retrouvez également les critiques publiées à l’époque._",
                    date: new Date(),
                    items: ret,
                },
            ],
        },
    ])
    fs.writeFile(
        `/Users/vincentpoulain/Development/quiet/src/data/pcinephile/generated-sections.json`,
        json,
        'utf8',
        () =>
            logger.info(
                `Generated ${ret.length} sections with ${ret.length} collections`
            )
    )
}

main()
