import Image from "next/image"
import styles from "@/styles/book/book.module.css"
const Book = (props) => {
    return(
        <div className={styles.livro}>
            <div className={styles.cabecalho}>
                <img src={props.capa} alt={props.autor} />
            </div>
            <div className={styles.rodape}>
                <h4>{props.autor}</h4>
                <h5>{props.titulo}</h5>
            </div>
        </div>
    )
}

export default Book