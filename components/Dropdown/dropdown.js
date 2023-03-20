import styles from '@/styles/dropdown/dropdown.module.css'

const Dropdown = (props) => {
    console.log(props.valor)
    return(
        <div className={styles['lista-suspensa']}>
            <label>{props.label}</label>
            
            <select 
                className={styles.select}
                    onChange={evento => props.Alterado(evento.target.value)} 
                    required={props.obrigatorio}
                    value={props.valor}>
                    {props.itens.map(item => {
                        return  <option key={item}>{item}</option>
                    })}
            </select>
        </div>
    )
}
export default Dropdown