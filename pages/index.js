import Head from 'next/head'
import { useReducer, useState, useEffect} from 'react'
import { set } from 'mongoose'
import Form from '@/components/Form/form'
import Category from '@/components/Category/category'
import InputText from '@/components/InputText/inputText'
import styles from '@/styles/indexCss/indexCss.module.css'
import { MdHistory, MdArrowForwardIos } from 'react-icons/md';
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail, HiLockClosed } from "react-icons/hi";
import Button from '@/components/Button/button'
import { signIn, signOut, useSession,getSession } from "next-auth/react";
import Btn from '@/components/Button/login-btn'
import { useRouter } from "next/router";
import { FaGithub } from "react-icons/fa";


async function redirectElseSignedIn() {
  const session = await getSession();
  if (!session) {
    return {
      redirect: {
        destination: '/views/privateArea2',
        permanent: true,
      },
    }
  }else{
    return {
      redirect: {
        destination: '/a',
        permanent: true,
      },
    }
  }
}

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
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [dadosLogin, dispath] = useReducer(reducer, {
    email: "",
    senha: ""
  });

  async function verify(){
    if(status=='authenticated'){
      router.replace("/views/home")
    }
  }

  useEffect(()=>{
    console.log(status)
    verify()
  })



  return (
    <div className={styles.mainContainer}>
      <div className={styles.forms}>
          <h1 style={{fontWeight: "900", fontSize: "43px", marginTop:"2.5em", color:"rgb(0 55 255);"}}>LOGIN</h1>
          <h3 className={styles.h3Forms}>Faça login para participar de votações <br /> ou<br /> Criar uma votação</h3>
          <div className={styles.inputs}>
          </div>
          <div className={styles.OU}>
            <div className={styles.linha2}></div>
          </div>
        <Btn 
            shadow={"5px 5px 12px rgba(0,0,0,30%)"}
            backgroundColor={'white'}
            border={'none'}
            margintop={"2em"}
            adding={"10px 20px"}
            cor={"black"}
            servidor={"google"}>
            <FcGoogle className={styles.iconGoogle} size={27}></FcGoogle> Entar com o google
        </Btn>
        <Btn 
            shadow={"5px 5px 12px rgba(0,0,0,30%)"}
            backgroundColor={'white'}
            border={'none'}
            margintop={"0em"}
            adding={"10px 20px"}
            cor={"black"}
            servidor={"github"}>
            <FaGithub className={styles.iconGoogle} size={27}></FaGithub> Entar com o google
        </Btn>
      </div>
    </div>

  )
}
