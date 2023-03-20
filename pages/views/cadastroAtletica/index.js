import Head from 'next/head'
import { useReducer, useState } from 'react'
import { set } from 'mongoose'
import Form from '@/components/Form/form'
import Category from '@/components/Category/category'
import InputText from '@/components/InputText/inputText'
import styles from '@/styles/views/cadastro.module.css'
import { MdHistory, MdArrowForwardIos, MdArticle } from 'react-icons/md';
import { FcGoogle } from "react-icons/fc";
import { AiFillFileText } from "react-icons/ai";
import { HiOutlineMail, HiLockClosed } from "react-icons/hi";
import { CgProfile} from "react-icons/cg";
import Button from '@/components/Button/button'

function reducer(dadosLogin, action) {
  switch (action.type) {
    case 'setEmail':
      console.log(dadosLogin)
      return { ...dadosLogin, email: action.payload };
    case 'setSenha':
      return { ...dadosLogin, senha: action.payload };
    default:
      throw new Error('Tipo de ação desconhecido.');
  }
}
export default function Home() {

  const [dadosLogin, dispath] = useReducer(reducer, {
    nomeAtletica: "",
    nomePresidente: "",
    cpfPresidente:"",
    email:"",
    Senha:""
  });


  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.cadastrar}>
          <h1 className={styles.h1Cadastro}>Logo</h1>
          <h2 className={styles.h2Cadastro}>Já possui<br/> uma página?</h2>
          <h3 className={styles.h3Cadastro}>Já possui uma conta?  <br />Faça login abaixo</h3>
          <Button width={120}>Entrar</Button>
        </div>
        <form className={styles.forms}>
          <h1 style={{fontWeight: "900", fontSize: "33px" , width:"622px"}}>Crie uma página</h1>
          <h3 className={styles.h3Forms}>Conecte-se a comunidade de atléticas de Marabá</h3>
          <div className={styles.inputs}>
            <AiFillFileText size={25} className={styles.iconEmail} />
            <InputText 
              obrigatorio={true}
              placeholder="Nome da Atlética"
              valor={dadosLogin.email}
              Alterado={(valor) => dispath({ type: 'setEmail', payload: valor })} ></InputText>
            <CgProfile size={25} className={styles.iconEmail} />
            <InputText
              obrigatorio={true}
              placeholder="Nome do Presidente"
              valor={dadosLogin.senha}
              Alterado={(valor) => dispath({ type: 'setSenha', payload: valor })}
            />
            <MdArticle size={25} className={styles.iconEmail} />
            <InputText
              obrigatorio={true}
              placeholder="CPF do Presidente"
              valor={dadosLogin.senha}
              Alterado={(valor) => dispath({ type: 'setSenha', payload: valor })}
            />
            <HiOutlineMail size={25} className={styles.iconEmail} />
            <InputText
              type="email"
              obrigatorio={true}
              placeholder="Email"
              valor={dadosLogin.senha}
              Alterado={(valor) => dispath({ type: 'setSenha', payload: valor })}
            />
            <HiLockClosed size={25} className={styles.iconEmail} />
            <InputText
              type="password"
              obrigatorio={true}
              placeholder="Senha"
              valor={dadosLogin.senha}
              Alterado={(valor) => dispath({ type: 'setSenha', payload: valor })}
            />

          </div>
          <Button
            shadow={"5px 5px 12px rgba(0,0,0,30%)"}
            padding={"12px 19px"}
            margintop={"1em"}
            backgroundColor={'white'}
            border={'none'}
            cor={"black"}
            width={90}>
            Cadastrar
          </Button>
          
        </form>
      </div>
    </div>

  )
}

