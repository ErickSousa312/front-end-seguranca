import styles from '@/styles/button/button.module.css'
import { useEffect, useState } from 'react'

const Button = (props) => {
    const estilo = props.className || styles.botao
    return (
        <button
            className={styles.botao}
            style={{
                border: props.border,
                backgroundColor: props.backgroundColor,
                boxShadow: props.shadow,
                width: props.width,
                color: props.cor,
                marginTop: props.margintop,
                padding: props.padding,
                position: props.position,
                marginBottom: props.marginBottom,
                margin: props.margin2
            }}>
            {props.children}
        </button>
    )
}
export default Button