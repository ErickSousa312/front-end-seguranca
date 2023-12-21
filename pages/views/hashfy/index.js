
import { useReducer, useState, useEffect, useRef } from 'react'
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from 'next/router';
import styles from '@/styles/views/home.module.css'
import Button from '@/components/Button/button'
import Navbar from '@/components/Navbar'
import Button2 from '@/components/Button/button2'
import { MdHistory, MdArrowForwardIos, MdArticle, MdOutlinePeople } from 'react-icons/md';
import { FcGoogle } from "react-icons/fc";
import { AiFillFileText } from "react-icons/ai";
import { HiOutlineMail, HiLockClosed, HiHome, } from "react-icons/hi";
import { BsPeople } from "react-icons/bs";
import { CgProfile, CgReadme } from "react-icons/cg";
import Btn from '@/components/Button/login-btn'
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import EventSource from 'eventsource';
import io from 'socket.io-client';

export default function Hashfy (){
    const { data: session, status } = useSession();
    
  async function deslogar() {
    await signOut();
    router.reload()
    console.log("passei 1")
  }
    return(
    <>
        <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.barNavitaion} >
          <Button2
            LinkTO={"/views/home"}
            fontSize={"19px"}
            padding={"12px 19px"}

            backgroundColor={'white'}
            border={'none'}
            cor={"black"}
            width={"89%"}>
            <CgProfile className={styles.iconGoogle} size={20}></CgProfile>
            Home
          </Button2>

          <Button2
            LinkTO={"/views/votar"}
            fontSize={"19px"}
            margin={"4px 0px"}
            padding={"10px 14px"}
            margintop={"1rem"}
            backgroundColor={'white'}
            border={'none'}
            cor={"black"}
            width={"89%"}>
            <CgReadme className={styles.iconGoogle} size={22}></CgReadme>
            Votar
          </Button2>
          <Button2
            LinkTO={"/views/eleicao"}
            fontSize={"19px"}
            margin={"4px 0px"}
            padding={"10px 14px"}
            margintop={"1rem"}
            backgroundColor={'white'}
            border={'none'}
            cor={"black"}
            width={"89%"}
          >
            <CgReadme className={styles.iconGoogle} size={22}></CgReadme>
            Criar Eleicão
          </Button2>
          <Button2
            LinkTO={"/views/hashfy"}
            fontSize={"19px"}
            padding={"12px 19px"}

            backgroundColor={'white'}
            border={'none'}
            cor={"black"}
            width={"89%"}>
            <CgProfile className={styles.iconGoogle} size={20}></CgProfile>
            Comparar hash
          </Button2>
          <button className={styles.buttonLogOut} onClick={() => deslogar()}>Sair</button>
        </div>
        <div className={styles.areaData}>
        <iframe
        title="Meu iFrame"
        width="1600"
        height="4000"
        src="/src/html/demo.html"
        allowfullscreen
      ></iframe>
          {session ?
            <div>{session.user.name}<br />{session.user.email}oi</div> : <div>Usuário não logado</div>}
        </div>
      </div>
    </div>
        
    </>
    )
}