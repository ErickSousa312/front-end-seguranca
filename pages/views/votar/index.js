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
import { SnackbarProvider, useSnackbar } from 'notistack';


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
        return { 
            ...dadosEleicao, nomeEleicao: action.payload,
        };
    case 'setOpcao':
        return { 
            ...dadosEleicao, opcoes: action.payload
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
    const [formulario, setFormulario] = useState({
        opcaoSelecionada: null,
    });
    
    const [dados, setDados] = useState(null);
    const [opcoes, setOpcoes] = useState(null);
    const [erro, setErro] = useState(null);
    const { data: session, status } = useSession();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [dadosEleicao, dispath] = useReducer(reducer, {
        nomeEleicao: "",
        opcao: "",
        hash: ""
    })

    async function deslogar() {
        await signOut();
        router.reload()
    }

    const handleNovaOpcao = () => {
        dispath({ type: "addOpcao", payload: "" })
    }

    function setNameHash(event) {
        dispath({
            type: 'setNomeEleicao',
            payload: event.target.value,
            Hash: gerarHash(event.target.value)
        })
    }

    async function pesquisarEleicao(e){
        e.preventDefault();
        try {
            await fetch(`http://localhost:3002/Eleicao/${dadosEleicao.nomeEleicao}`)
              .then((response) => {
                if (response.ok) {
                  return response.json();   
                } else {
                  throw new Error('Erro ao criar eleição');
                }
              })
              .then((data) => {
                setDados(data);
                console.log(data);
                enqueueSnackbar('Eleição encontrada com sucesso', { variant: 'success' });
              })
              .catch((error) => {
                console.error(error);
                enqueueSnackbar('Ocorreu um erro ao buscar a eleição', { variant: 'error' });
              });
          } catch (error) {
            console.log(error);
          }
          
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:3002/Voto/${dadosEleicao.nomeEleicao}`)
            .then((response)=>{
                if(response.ok){
                    return response.json();   
                }else{
                    throw new Error('Erro ao criar eleição');
                }
            })
            .then((data)=>{
                enqueueSnackbar('Eleição encontrada de sucesso', { variant: 'success' });
                console.log(data.opcoes)
            })
            .catch(error =>{
                enqueueSnackbar('Ocorreu um erro ao buscar a eleiçao', { variant:'error'})
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event) => {
        console.log(formulario.opcaoSelecionada)
        setFormulario({
            ...formulario,
            opcaoSelecionada: event.target.value,
        });
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <div className={styles.barNavitaion} >
                <Button2
           LinkTO = {"/views/home"}
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
           LinkTO = {"/views/votar"}
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
                        LinkTO = {"/views/eleicao"}
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
                        <div>
                            <label>Nome da Eleição</label>
                            <input
                                required
                                type="text"
                                value={dadosEleicao.nomeEleicao}
                                onChange={(event) => dispath({ type: "setNomeEleicao", payload: event.target.value, Hash: gerarHash(event.target.value) })}
                            />
                            <button onClick={(e)=>pesquisarEleicao(e)} >
                                Pesqusiar
                            </button>
                            
                            {dados?.map(({opcoes, nomeEleicao}) => (
                                <div key={nomeEleicao}>
                                    <h4>Opções:</h4>
                                    <form>
                                    {opcoes.map((to)=>(
                                    <>
                                        <div key={to}></div>
                                        <input type='radio' value={to} checked={dadosEleicao.opcoes === to} onChange={(event)=>dispath({type:"setOpcao", payload: event.target.value})}></input>
                                        <label>{to}</label>
                                    </>
                                    ))}
                                        <button style={{display:"flex"}} type="submit" >
                                            Registrar Voto
                                        </button>
                                    </form>
                                   
                                </div>
                            ))}
                            
                        </div>
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
