import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import styles from './index.module.scss'

const Header = () => {
   const currentDate = format(new Date(), 'EEEEEE, d, MMMM', {
      locale: ptBR
   })

   return (
      <header className={styles.headerContainer}>
         {/*eslint-disable-next-line*/}
         <img src="logo.svg" alt="Porcastr" />

         <p>O melhor para você ouvir sempre</p>

         <span>{currentDate}</span>
      </header>
   )
}

export default Header
