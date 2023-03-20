import styles from '@/styles/category/category.module.css'
import Book from "@/components/Book/book";

function Category(props) {

    return (<>
        {props.livros && props.livros.length > 0 &&
            <section
                key={props.nome}
                className={styles.categoria}
                style={{ backgroundColor: props.corSecundaria }}
            >
                <h3 className={styles.nomeCategoria}  style={{ borderColor: props.corPrimaria }}>{props.nome}</h3>
                <div className={styles.livros}>
                    {props.livros.map((livro) => (
                        <Book key={livro.nome} autor={livro.autor} titulo={livro.titulo} capa={livro.capa} />
                    ))}
                </div>
            </section>
        }                      
    </>
    )
};

export default Category;




