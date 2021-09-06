import {createContext} from 'react'

type Episode = {
   title: string
   members: string
   thumbnail: string
   duration: string
   url: string
}

type PlayerContextData = {
   episodeList: Array<Episode>
   currentEpisodeIndex: number
   isPlaying: boolean
   play: (episode: Episode) => void
   showContainer: boolean
   togglePlay: () => void
   setPlayingState: (state: boolean) => void
}

export const PlayerContext = createContext({} as PlayerContextData)