import styles from '../styles/Footer.module.css'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div>
        <Image className= {styles.image}
          src="/images/fb.png"
          width={30}
          height={30}
          alt="error"
        />
        <Image className= {styles.image}
          src="/images/tw.png"
          width={30}
          height={30}
          alt="error"
        />
        <Image className= {styles.image}
          src="/images/ig.png"
          width={30}
          height={30}
          alt="error"
        />
        </div>
        
        <div>
        <p>Erick Sales <br/>Copyright &copy; 2023</p>
        </div>
        
      </div>

    </footer>
  )
}
