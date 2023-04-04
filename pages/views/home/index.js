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


function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


export default function PrivateArea(props) {
  const socket = io();
  const [dados, setDados] = useState(null);
  const [dados2, setDados2] = useState(null);
  const [erro, setErro] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dadosLogin, dispath] = useReducer(reducer, {
    email: "",
    Senha: ""
  });

  const fetchData = async () => {
    try {
      await fetch(`http://localhost:3002/Eleicao/`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Erro ao buscar eleições');
          }
        })
        .then((data) => {
          setDados(data);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(()=>{
    fetchData()
  })

  useInterval(fetchData, 15000);

  async function deslogar() {
    await signOut();
    router.reload()
    console.log("passei 1")
  }

  return (
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
          <button className={styles.buttonLogOut} onClick={() => deslogar()}>Sair</button>
        </div>
        <div className={styles.areaData}>
          <div className={styles.grid}>
            {dados?.map(({ nomeEleicao, _id, opcoes }) => (
              <div key={_id} className={styles.item}>
                <p className={styles.item}>{nomeEleicao}</p><br />
                  {opcoes.map(({ chave, valor, _id }) => (
                      <p key={_id}>{chave}: {valor}</p>
                  ))}
              </div>
            ))}
          </div>
          {session ?
            <div>{session.user.name}<br />{session.user.email}</div> : <div>Usuário não logado</div>}
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
