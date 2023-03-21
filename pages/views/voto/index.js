import { useReducer, useState, useEffect } from 'react'
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from 'next/router';
import styles from '@/styles/views/voto.module.css'
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
import Form from '@/components/Form/form';
import InputText from '@/components/InputText/inputText';
import bcrypt from 'bcryptjs';


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

async function gerarHash(dado) {
    const hash = await bcrypt.hash(dado, 10);
    return hash;
}

function reducer(dadosEleicao, action) {
    console.log(dadosEleicao)
  switch (action.type) {
    case 'setNomeEleicao': 
        const salts= 10
        const salt = bcrypt.genSaltSync(salts)
        const hash = bcrypt.hashSync(action.payload, salt)
        return { 
            ...dadosEleicao, nomeEleicao: action.payload, 
            hash: hash
        };
    case 'addOpcao':
        return { 
            ...dadosEleicao, 
            opcoes:[...dadosEleicao.opcoes, action.payload]  
        };
    case 'sethash':
        return{
            ...dadosEleicao, hash:action.payload
        }
    case 'setDadosEleicao':
        return{
            ...dadosEleicao, 
        }
    case 'removeOpcao':
        return {
            ...dadosEleicao,
            opcoes: dadosEleicao.opcoes.slice(0, -1)// cria uma nova array excluindo o último elemento
        };
    case 'salvarOpcao':
        return {
            ...dadosEleicao,
            opcoes: [
                ...dadosEleicao.opcoes.slice(0, action.Index),
                action.payload,
                ...dadosEleicao.opcoes.slice(action.Index + 1)
              ]
          };
    default:
      throw new Error('Tipo de ação desconhecido.');
  }
}


export default function PrivateArea() {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dadosEleicao, dispath] = useReducer(reducer, {
    nomeEleicao:"",
    opcoes:[],
    hash:""
  })
  
  async function deslogar(){
    await signOut();
    router.reload()
  }

  const handleNovaOpcao = ()=>{
    dispath({type:"addOpcao", payload: ""})
  }

  function setNameHash (event) {
    dispath({
        type:'setNomeEleicao',
        payload:event.target.value,
        Hash:gerarHash(event.target.value)})
  }

  return (
    <div className={styles.mainContainer}>
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
            Home
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
            Votar
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
            Criar Eleição
          </Button2>
          <button className={styles.buttonLogOut} onClick={() => deslogar()}>Sair</button>
        </div>
        <div className={styles.areaData}> 
        <div className={styles.grid}>
            <form>
                <input
                type="text"
                placeholder='Nome da Eleição'
                value={dadosEleicao.nomeEleicao}
              onChange={(event) => dispath({type:"setNomeEleicao", payload: event.target.value, Hash:gerarHash(event.target.value)})}
            />
                <h2>Opções:</h2>
        {dadosEleicao.opcoes.map((opcao, index) => (
          <div key={index}>
            <label>{`Opção ${index + 1}`}</label>
            <input
              type="text"
              id={`opcao-${opcao.id}`}
              value={opcao.valor}
              onChange={(event) => dispath({type:"salvarOpcao", payload:event.target.value, Index:index })}
            />
          </div>
        ))}
            <button type="button" onClick={handleNovaOpcao}>
          Adicionar Nova Opção
        </button>
        <button type="button" onClick={()=>dispath({type:"removeOpcao"})}>
          Remover Opção
        </button>
            </form>
        </div>
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
