import styles from '@/styles/inputText/inputText.module.css'
const InputText = (props) => {

   
   const Digitado = (evento) => {
      props.Alterado(evento.target.value)
   }

   return (
      <div className={styles['campo-texto'] } >
         <input
            className={styles.input}
            type={props.type}
            value={props.valor}
            onChange={Digitado}
            required={props.obrigatorio}
            placeholder={props.placeholder}
         />
      </div>
   )
}
 
 export default InputText