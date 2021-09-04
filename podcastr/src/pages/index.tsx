import { GetStaticProps } from 'next'
//SPA - useEffect->fetch / não indexa no google
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { api } from '../services/api'
import { convertDurationToTimeString } from '../utils/convertDuration'

import styles from './index.module.scss'

type Episode = {
   id: string
   title: string
   members: string
   thumbnail: string
   description: string
   duration: string
   durationAsString: string
   url: string
   publishedAt: string
}

type HomeProps = {
   allEpisodes: Array<Episode> // Episode[]
   latestEpisodes: Array<Episode> // Episode[]
}

export default function Home({ allEpisodes, latestEpisodes }: HomeProps) {
   return (
      <div className={styles.homepage}>
         <section className={styles.latestEpisodes}>
            <h2>Últimos lançamentos</h2>
            <ul>
               {latestEpisodes.map(episode => (
                  <li key={episode.id}>
                     {/*precisa de pre config*/}
                     <Image
                        width={192}
                        height={192}
                        src={episode.thumbnail}
                        alt={episode.title}
                        objectFit="cover"
                     />
                     
                     <div className={styles.episodeDetails}>
                        <a href="">{episode.title}</a>
                        <p>{episode.members}</p>
                        <span>{episode.publishedAt}</span>
                        <span>{episode.durationAsString}</span>
                     </div>

                     <button type="button">
                        {/*eslint-disable-next-line*/}
                        <img src="/play-green.svg" alt="Tocar episódio" />
                     </button>
                  </li>
               ))}
            </ul>
         </section>

         <section className={styles.allEpisodes}></section>
      </div>
   )
}

// SSR - SERVER SIDE RENDERING

// export async function getServerSideProps() {
//    const response = await fetch('http://localhost:3333/episodes')
//    const data = await response.json()

//    return {
//       props: {
//          episodes: data
//       }
//    }
// }

// SSG - STATIC SERVER GENERATION

export const getStaticProps: GetStaticProps = async () => {
   const { data } = await api.get('/episodes', {
      params: {
         _limite: 6,
         _sort: 'published_at',
         _order: 'desc'
      }
   })

   const episodes = data.map(episode => ({
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
         locale: ptBR
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
         Number(episode.file.duration)
      ),
      description: episode.description,
      url: episode.file.url
   }))

   const latestEpisodes = episodes.slice(0, 2)
   const allEpisodes = episodes.slice(2, episodes.length)

   return {
      props: {
         latestEpisodes,
         allEpisodes
      },
      revalidate: 60 * 60 * 8
   }
}
