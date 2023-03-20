import { useReducer, useState, useEffect } from 'react'
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from 'next/router';
import styles from '@/styles/views/privateArea.module.css'
import Button from '@/components/Button/button'
import Navbar from '@/components/Navbar'
import Button2 from '@/components/Button/button2'
import { MdHistory, MdArrowForwardIos, MdArticle,MdOutlinePeople } from 'react-icons/md';
import { FcGoogle } from "react-icons/fc";
import { AiFillFileText } from "react-icons/ai";
import { HiOutlineMail, HiLockClosed, HiHome, } from "react-icons/hi";
import { BsPeople} from "react-icons/bs";
import { CgProfile,CgReadme} from "react-icons/cg";
import Btn from '@/components/Button/login-btn'
import { redirect } from 'next/dist/server/api-utils';

export async function verifyAuth(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/',
      },
    }
  }
  return null
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


export default function PrivateArea() {
  
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dadosLogin, dispath] = useReducer(reducer, {
    nomeAtletica: "",
    nomePresidente: "",
    cpfPresidente:"",
    email:"",
    Senha:""
  });
  
 
  
  async function deslogar(){
    await signOut();
    router.reload()
    console.log("passei 1")
  }

  return (
    <div className={styles.mainContainer}>
      <Navbar zIndex={"3"}></Navbar>
      <div className={styles.container}>
        <div className={styles.barNavitaion} >
          <Button2
          fontSize={"19px"}
            padding={"12px 19px"}
            
            backgroundColor={'white'}
            border={'none'}
            cor={"black"}
            width={"89%"}>
            <CgProfile className={styles.iconGoogle} size={20}></CgProfile>
            Perfil
          </Button2>
          
          <Button2
            fontSize={"19px"}
            margin={"4px 0px"}
            padding={"10px 14px"}
            margintop={"1rem"}
            backgroundColor={'white'}
            border={'none'}
            cor={"black"}
            width={"89%"}>
              <CgReadme className={styles.iconGoogle} size={22}></CgReadme>
            Membros
          </Button2>
          <button className={styles.buttonLogOut} onClick={() => deslogar()}>Sair</button>
        </div>
        <div className={styles.areaData}> 
        {session ? 
        <div>{session.user.name}<br/>{session.user.email}</div> : <div>Usuário não logado</div>}
        </div>
      </div>
    </div>

  )
}


export async function getServerSideProps(context) {
  const redirect = await verifyAuth(context);
  if (redirect) {
    return redirect
  }
  return {
    props: {
    },
  };
}
