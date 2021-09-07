import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import Link from 'next/link'

import styles from './index.module.scss'

const Header = () => {
   const currentDate = format(new Date(), 'EEEEEE, d, MMMM', {
      locale: ptBR
   })

   return (
      <header id={styles.header}>
         <div className={`${styles.headerContainer} container`}>
            <div className={styles.infoHeader}>
               
               <Link href="/">
                  {/*eslint-disable-next-line*/}
                  <a> <img src="/logo.svg" alt="Porcastr" /></a>
               </Link>

               <div className={styles.separator}></div>

               <p>O melhor para você ouvir sempre</p>
            </div>

            <span>{currentDate}</span>
         </div>
      </header>
   )
}

export default Header
