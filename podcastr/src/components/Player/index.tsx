import { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import { PlayerContext } from '../../contexts/PlayerContext'
import { useWindowSize } from '../../hooks/useWindowSize'

import playing from '../../../public/playing.svg'
import styles from './index.module.scss'

const Player = () => {
   const {
      episodeList,
      currentEpisodeIndex,
      showContainer,
      isPlaying,
      togglePlay,
      setPlayingState
   } = useContext(PlayerContext)
   const episode = episodeList[currentEpisodeIndex]

   const [width, height] = useWindowSize()

   const [isContainerActive, setIsContainerActive] = useState(false)
   const [containerPosition, setContainerPosition] = useState('0')
   const [degArrow, setDegArrow] = useState(0)

   // Criado para selecionar todo o componente player
   const playerComponentRef = useRef<HTMLDivElement>(null)

   // Criado para selecionar o campo texto dentro do player
   const scrollTextRef = useRef<HTMLSpanElement>(null)

   // Pausar e tocar audio
   const audioRef = useRef<HTMLAudioElement>(null)

   function handleHideContainer() {
      setIsContainerActive(!isContainerActive)
   }

   useEffect(() => {
      // Sempre que um novo podcast for selecionado a posição do titulo dentro do player será reiniciada
      if (!scrollTextRef.current) return null
      const el = scrollTextRef.current
      el.style.animation = 'none'
      el.offsetHeight /* trigger reflow */
      el.style.animation = null
   }, [episodeList])

   useEffect(() => {
      // Arruma o posicionamento do player de acordo com a largura da janela do browser
      if (!playerComponentRef.current) return null
      const { offsetHeight } = playerComponentRef.current

      if (isContainerActive) {
         setContainerPosition(`0`)
         setDegArrow(180)
      } else {
         setContainerPosition(`-${offsetHeight}`)
         setDegArrow(0)
      }
   }, [isContainerActive, width])

   useEffect(() => {
      // Mostra o conteiner assim que um dos podcasts for iniciado
      if (showContainer) setIsContainerActive(true)
   }, [showContainer])

   useEffect(() => {
      if (!audioRef.current) return

      if (isPlaying) {
         audioRef.current.play()
      } else {
         audioRef.current.pause()
      }
   }, [isPlaying])

   return (
      <div
         ref={playerComponentRef}
         id={styles.playerCont}
         style={{ bottom: `${containerPosition}px` }}
      >
         <div className={`${styles.playerContainer} container`}>
            {episode ? (
               <div className={styles.info}>
                  <div className={styles.playerTitle}>
                     <Image src={playing} alt="Tocando Agora" />
                     <div className={`${styles.scrollingText}`}>
                        <span ref={scrollTextRef}>{episode.title}</span>
                     </div>
                  </div>
               </div>
            ) : (
               <div className={styles.info}>
                  <div className={styles.playerTitle}>
                     <Image src={playing} alt="Tocando Agora" />
                     <span ref={scrollTextRef}>Nenhum podcast selecionado</span>
                  </div>
               </div>
            )}

            <div className={styles.player}>
               <div className={styles.progress}>
                  <span>00:00</span>

                  <div className={styles.slider}>
                     {episode ? (
                        <Slider
                           trackStyle={{ background: '#04d361' }}
                           railStyle={{ background: '#9f75ff' }}
                           handleStyle={{
                              borderColor: '#84daab',
                              borderWidth: 3
                           }}
                        />
                     ) : (
                        <div className={styles.emptySlider} />
                     )}
                  </div>

                  <span>00:00</span>
               </div>

               <div className={`${styles.buttons} ${!episode && styles.empty}`}>
                  <button type="button" disabled={!episode}>
                     <Image
                        src="/shuffle.svg"
                        alt="Embaralhar"
                        width={30}
                        height={30}
                     />
                  </button>

                  <button type="button" disabled={!episode}>
                     <Image
                        src="/play-previous.svg"
                        alt="Tocar anterior"
                        width={30}
                        height={30}
                     />
                  </button>

                  <button
                     type="button"
                     className={styles.playButton}
                     disabled={!episode}
                     onClick={togglePlay}
                  >
                     {isPlaying ? (
                        <div className={styles.pauseBtn}>
                           <Image
                              src="/pause.svg"
                              alt="Tocar"
                              width={50}
                              height={50}
                           />
                        </div>
                     ) : (
                        <div className={styles.playBtn}>
                           <Image
                              src="/play.svg"
                              alt="Tocar"
                              width={50}
                              height={50}
                           />
                        </div>
                     )}
                  </button>

                  <button type="button" disabled={!episode}>
                     <Image
                        src="/play-next.svg"
                        alt="Tocar próxima"
                        width={30}
                        height={30}
                     />
                  </button>

                  <button type="button" disabled={!episode}>
                     <Image
                        src="/repeat.svg"
                        alt="Repetir"
                        width={30}
                        height={30}
                     />
                  </button>
               </div>

               {/* tocar audio */}

               {episode && (
                  <audio
                     ref={audioRef}
                     src={episode.url}
                     autoPlay
                     onPlay={() => setPlayingState(true)}
                     onPause={() => setPlayingState(false)}
                  />
               )}
            </div>
         </div>

         <button onClick={handleHideContainer} className={styles.hideContainer}>
            <i
               style={{ transform: `rotate(${degArrow}deg)` }}
               className="fas fa-chevron-up"
            ></i>
         </button>
      </div>
   )
}

export default Player
