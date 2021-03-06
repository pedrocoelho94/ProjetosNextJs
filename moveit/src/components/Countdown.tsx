import { useContext } from 'react'
import styles from '../styles/components/Countdown.module.css'
import { CountdownContext } from '../contexts/CountdownContext'

export function Countdown() {
   const {
      minutes,
      seconds,
      hasFinished,
      isActive,
      resetCountdown,
      startCountdown
   } = useContext(CountdownContext)

   // padstart adiciona um 0 a esquerda se não tiver 2 digitos
   const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
   const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

   return (
      <div>
         <div className={styles.countdownContainer}>
            <div>
               <span>{minuteLeft}</span>
               <span>{minuteRight}</span>
            </div>
            <span>:</span>
            <div>
               <span>{secondLeft}</span>
               <span>{secondRight}</span>
            </div>
         </div>

         {hasFinished ? (
            <button disabled className={styles.countdownButton}>
               {' '}
               Ciclo encerrado
            </button>
         ) : (
            <>
               {isActive ? (
                  <button
                     onClick={resetCountdown}
                     type="button"
                     className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                  >
                     {' '}
                     Abandonar ciclo
                  </button>
               ) : (
                  <button
                     onClick={startCountdown}
                     type="button"
                     className={styles.countdownButton}
                  >
                     Iniciar ciclo
                  </button>
               )}
            </>
         )}
      </div>
   )
}
