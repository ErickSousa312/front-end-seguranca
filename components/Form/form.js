import style from '@/styles/form/form.module.css'
import { useReducer, useState } from 'react'
import Dropdown from '../Dropdown/dropdown';
import InputText from '../InputText/inputText';
import Button from '@/components/Button/button'

function reducer(livroDados, action){
    console.log(action.categoria)
    switch (action.type) {
        case 'setTitulo':
        return { ...livroDados, titulo: action.payload };
        case 'setAutor':
        return { ...livroDados, autor: action.payload };
        case 'setCapa':
        return { ...livroDados, capa: action.payload };
        case 'setCategoria':
        return { ...livroDados, categoria: action.payload };
        case 'RESET':
        return initialState;
        default:
        return livroDados;
        }
}

const Form = (props) => {

    const [livroDados, dispath] = useReducer(reducer, {
        titulo: '',
        autor: '',
        capa: '',
        categoria: props.categorias[0]
    })

    const Salvar = (evento) => {
        evento.preventDefault()
        props.LivroCadastrado({
            titulo: livroDados.titulo,
    autor: livroDados.autor,
    capa: livroDados.capa,
    categoria: livroDados.categoria

        }
           
        );
    }

    return (
        <section className={style.formulario}>
            <form onSubmit={Salvar} >
                <h2>Preencha os dados para criar o card do livro</h2>
                <InputText
                    obrigatorio={true}
                    label="Titulo: "
                    placeholder="Digite o título do livro"
                    valor={livroDados.titulo}
                    Alterado={(valor) => dispath({ type: 'setTitulo', payload: valor })}
                />
                <InputText
                    obrigatorio={true}
                    label="Autor: "
                    placeholder="Digite o nome do autor"
                    valor={livroDados.autor}
                    Alterado={(valor) => dispath({ type: 'setAutor', payload: valor })}
                />
                <InputText
                    label="Capa: "
                    placeholder="Digite o endereço da capa"
                    valor={livroDados.capa}
                    Alterado={(valor) => dispath({ type: 'setCapa', payload: valor })}
                />
                <Dropdown
                    obrigatorio={true}
                    label='Categoria: '
                    itens={props.categorias}
                    valor={livroDados.categoria}
                    Alterado={(valor) => dispath({type:'setCategoria', payload:valor})}
                />
                <Button>
                    Criar card
                </Button>
            </form>
        </section>
    );
};

export default Form;
