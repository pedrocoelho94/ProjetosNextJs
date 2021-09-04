import Image from 'next/image'
import styles from './index.module.scss'

import playing from '../../../public/playing.svg'

const Player = () => {
   return (
      <div className={styles.playerContainer}>
         
         <div className={styles.info}>
            <div className={styles.emptyPlayer}>
               {/* <strong>Selecione um podcast para ouvir</strong> */}
            </div>

            <div className={styles.playerTitle}>
               <div>
                  <Image src={playing} alt="Tocando Agora" />
                  <strong>Tocando agora</strong>
               </div>

               <p>Faladev #30 | A importância da contribuição em Open Source</p>
            </div>
         </div>


         <div className={styles.player}>
            <div className={styles.progress}>
               <span>00:00</span>

               <div className={styles.slider}>
                  <div className={styles.emptySlider} />
               </div>

               <span>00:00</span>
            </div>

            <div className={styles.buttons}>
               <button type="button">
                  <Image
                     src="/shuffle.svg"
                     alt="Embaralhar"
                     width={30}
                     height={30}
                  />
               </button>

               <button type="button">
                  <Image
                     src="/play-previous.svg"
                     alt="Tocar anterior"
                     width={30}
                     height={30}
                  />
               </button>

               <button type="button" className={styles.playButton}>
                  <Image src="/play.svg" alt="Tocar" width={60} height={60} />
               </button>

               <button type="button">
                  <Image
                     src="/play-next.svg"
                     alt="Tocar próxima"
                     width={30}
                     height={30}
                  />
               </button>

               <button type="button">
                  <Image
                     src="/repeat.svg"
                     alt="Repetir"
                     width={30}
                     height={30}
                  />
               </button>
            </div>
         </div>
      </div>
   )
}

export default Player
