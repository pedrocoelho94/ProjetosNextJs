import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import ptBR from 'date-fns/locale/pt-BR'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { api } from '../../services/api'
import { convertDurationToTimeString } from '../../utils/convertDuration'
import Link from 'next/link'
import Head from 'next/head'

import styles from './episode.module.scss'
import { usePlayer } from '../../contexts/PlayerContext'

type Episode = {
   id: string
   title: string
   members: string
   thumbnail: string
   duration: number
   durationAsString: string
   url: string
   publishedAt: string
   description: string
}

type EpisodeProps = {
   episode: Episode
}

export default function Episode({ episode }: EpisodeProps) {
   const { play } = usePlayer() // importa o contexto

   return (
      <div className={`${styles.episode} container`}>
         
         <Head>
            <title>{episode.title} | Podcastr</title>
         </Head>

         <div className={styles.thumbnailContainer}>
            <Link href="/" passHref>
               <button type="button">
                  {/*eslint-disable-next-line*/}
                  <img src="/arrow-left.svg" alt="Voltar" />
               </button>
            </Link>
            <Image
               width={720}
               height={200}
               src={episode.thumbnail}
               alt="Thumbnail"
               objectFit="cover"
            />

            <button type="button" onClick={() => play(episode)}>
               {/*eslint-disable-next-line*/}
               <img src="/play.svg" alt="Tocar episódio" />
            </button>
         </div>

         <header>
            <h1>{episode.title}</h1>
            <div className={styles.subtitle}>
               <span>{episode.members}</span>
               <span className={styles.separator}></span>
               <span>{episode.publishedAt}</span>
               <span className={styles.separator}></span>
               <span>Duração: {episode.durationAsString}</span>
            </div>
         </header>

         <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: episode.description }}
         />
      </div>
   )
}

// obrigatório em paginas estáticas com parametros dinâmicos
// incremental static regeneration
export const getStaticPaths: GetStaticPaths = async () => {
   const { data } = await api.get('/episodes', {
      params: {
         _limite: 2,
         _sort: 'published_at',
         _order: 'desc'
      }
   })

   const paths = data.map(episode => {
      return {
         params: {
            slug: episode.id
         }
      }
   })

   return {
      paths,
      fallback: 'blocking'
   }
}

export const getStaticProps: GetStaticProps = async ctx => {
   console.log(ctx)
   const { slug } = ctx.params
   const { data } = await api.get(`/episodes/${slug}`)

   const episode = {
      id: data.id,
      title: data.title,
      thumbnail: data.thumbnail,
      members: data.members,
      publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
         locale: ptBR
      }),
      duration: Number(data.file.duration),
      durationAsString: convertDurationToTimeString(Number(data.file.duration)),
      description: data.description,
      url: data.file.url
   }

   return {
      props: { episode },
      revalidate: 60 * 60 * 24
   }
}
