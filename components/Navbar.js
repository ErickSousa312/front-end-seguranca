import { HiHome, HiBell,HiCalendar } from "react-icons/hi";
import Button from '@/components/Button/button'
import styles from '../styles/Navbar.module.css'

export default function Navbar(props) {
  return (
    <ul className={styles.navbar} style={{zIndex: props.zIndex}}>
      <div className={styles.navbarLOGO}>LOGO</div>
      <div className={styles.navbarIcons}>
          <Button
            border={'0px'}
            margin2={"0px"}
            padding={"0px 10px"}
            cor={"black"}
            className={styles.loginGoogle}>
            <HiHome className={styles.iconGoogle} size={25}></HiHome> 
          </Button>
        <Button
            border={'none'}
            margin2={"0px"}
            padding={"0px 10px"}
            cor={"black"}
            className={styles.loginGoogle}>
            <HiBell className={styles.iconGoogle} size={25}></HiBell> 
          </Button>
          <Button
            border={"none"}
            margin2={"0px"}
            padding={"5px 10px"}
            cor={"black"}
            className={styles.loginGoogle}>
            <HiCalendar className={styles.iconGoogle} size={25}></HiCalendar> 
          </Button>
      </div>
      
    </ul>
  )
}
