import { createContext, ReactNode, useContext, useState } from 'react'

type Episode = {
   title: string
   members: string
   thumbnail: string
   duration: number
   url: string
}

type PlayerContextData = {
   episodeList: Array<Episode>
   currentEpisodeIndex: number
   isPlaying: boolean
   isLooping: boolean
   isShuffling: boolean
   showContainer: boolean
   play: (episode: Episode) => void
   playList: (list: Array<Episode>, index: number) => void
   playPrevious: () => void
   playNext: () => void
   togglePlay: () => void
   toggleLoop: () => void
   toggleShuffle: () => void
   setPlayingState: (state: boolean) => void
   clearPlayerState: () => void
   hasNext: boolean
   hasPrevious: boolean
}

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
   children: ReactNode
}

export function PlayerContextProvider({
   children
}: PlayerContextProviderProps) {
   const [episodeList, setEpisodeList] = useState([])
   const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
   const [showContainer, setShowContainer] = useState(false)
   const [isPlaying, setIsPlaying] = useState(false)
   const [isLooping, setIsLooping] = useState(false)
   const [isShuffling, setIsShuffling] = useState(false)

   function play(episode: Episode) {
      setEpisodeList([episode])
      setCurrentEpisodeIndex(0)
      setShowContainer(true)
      setIsPlaying(true)
      setIsShuffling(false)
   }

   function playList(list: Array<Episode>, index: number) {
      setEpisodeList(list)
      setCurrentEpisodeIndex(index)
      setShowContainer(true)
      setIsPlaying(true)
   }

   function togglePlay() {
      setIsPlaying(!isPlaying)
   }

   function toggleLoop() {
      setIsLooping(!isLooping)
   }

   function toggleShuffle() {
      setIsShuffling(!isShuffling)
   }

   function setPlayingState(state: boolean) {
      setIsPlaying(state)
   }

   function clearPlayerState() {
      setEpisodeList([])
      setCurrentEpisodeIndex(0)
   }

   const hasPrevious = currentEpisodeIndex > 0
   const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length

   function playNext() {
      if (isShuffling) {
         setCurrentEpisodeIndex(Math.floor(Math.random() * episodeList.length))
      } else if (hasNext) {
         setCurrentEpisodeIndex(currentEpisodeIndex + 1)
      }
   }

   function playPrevious() {
      if (hasPrevious) setCurrentEpisodeIndex(currentEpisodeIndex - 1)
   }

   return (
      <PlayerContext.Provider
         value={{
            episodeList,
            currentEpisodeIndex,
            play,
            playList,
            playNext,
            playPrevious,
            showContainer,
            isPlaying,
            isLooping,
            isShuffling,
            toggleLoop,
            togglePlay,
            toggleShuffle,
            setPlayingState,
            hasNext,
            hasPrevious,
            clearPlayerState
         }}
      >
         {children}
      </PlayerContext.Provider>
   )
}

export const usePlayer = () => {
   return useContext(PlayerContext)
}
