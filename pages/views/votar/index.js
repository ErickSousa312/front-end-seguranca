import { useReducer, useState, useEffect } from 'react'
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from 'next/router';
import styles from '@/styles/views/voto.module.css'
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
            const salts = 10
            const salt = bcrypt.genSaltSync(salts)
            const hash = bcrypt.hashSync(action.payload, salt)
            return {
                ...dadosEleicao, opcao: action.payload, idEleicao: action.iD, hash: hash
            };
        case 'sethash':
            return {
                ...dadosEleicao, hash: action.payload
            }
        case 'setDadosEleicao':
            return {
                ...dadosEleicao,
            }
        case 'reset':
            return {
                nomeEleicao: "",
                opcao: "",
                hash: "",
                idEleicao: ""
            }
        default:
            throw new Error('Tipo de ação desconhecido.');
    }
}


export default function PrivateArea() {
    const [formulario, setFormulario] = useState({
        opcaoSelecionada: null,
    });
    const [showHash, setShowHash] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [dados, setDados] = useState(null);
    const [opcoes, setOpcoes] = useState(null);
    const [erro, setErro] = useState(null);
    const { data: session, status } = useSession();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [dadosEleicao, dispath] = useReducer(reducer, {
        nomeEleicao: "",
        opcao: "",
        hash: "",
        idEleicao: "",
    })

    const handleConfirm = async(e)=> {
        e.preventDefault()
        setShowModal(false)
        setShowHash(true)
        fetchs(e)
      }

      const  setModal = async (e) => {
        e.preventDefault();
        setShowModal(true)
    }

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

    async function pesquisarEleicao(e) {
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

    async function fetchs(e) {
        e.preventDefault()
        try {
            await fetch(`http://localhost:3002/Voto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    eleicao: dadosEleicao.idEleicao,
                    email: session.user.email,
                    voto: dadosEleicao.opcao,
                    hash: dadosEleicao.hash
                })
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Erro salvar voto');
                    }
                })
                .then((data) => {
                    console.log(data.opcoes)
                })
                .catch(error => {
                    console.log(error)
                })


            await fetch(`http://localhost:3002/countVoto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    opcao: dadosEleicao.opcao,
                    idEleicao: dadosEleicao.idEleicao,
                    hash: dadosEleicao.hash
                })
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Erro salvar voto');
                    }
                })
                .then((data) => {
                    enqueueSnackbar('voto realizado com sucesso', { variant: 'success' });
                    console.log(data.opcoes)
                })
                .catch(error => {
                    console.log(error)
                    enqueueSnackbar('Ocorreu um erro ao registrar o voto', { variant: 'error' })
                })
        } catch (error) {
            console.log(error)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        fetchs()
    }

    const handleChange = (event) => {
        console.log(formulario.opcaoSelecionada)
        setFormulario({
            ...formulario,
            opcaoSelecionada: event.target.value,
        });
    };

    async function gerarHash(dado) {
        const hash = await bcrypt.hash(dado, 10);
        return hash;
    }

    function handleCopy() {
        navigator.clipboard.writeText(dadosEleicao.hash)
          .then(() => {
            enqueueSnackbar('Hash copiado com sucesso!', {
                variant: 'success',
                style: { backgroundColor: '#2596be' }
              });
          })
          .catch((error) => {
            console.error('Erro ao copiar o conteúdo: ', error);
          });
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
                    <div className={styles.grid}>
                        <div>
                            <label>Nome da Eleição</label>
                            <input
                                required
                                type="text"
                                value={dadosEleicao.nomeEleicao}
                                onChange={(event) => dispath({ type: "setNomeEleicao", payload: event.target.value, Hash: gerarHash(session.user.email) })}
                            />
                            <button onClick={(e) => pesquisarEleicao(e)} >
                                Pesqusiar
                            </button>

                            {dados?.map(({ _id, opcoes, nomeEleicao }) => (
                                <div key={nomeEleicao}>
                                    <h4>Opções:</h4>
                                    <form onSubmit={setModal}>
                                        {opcoes.map((to) => (
                                            <>
                                                <div key={to._id}></div>
                                                <input type='radio'
                                                    value={to.chave}
                                                    checked={dadosEleicao.opcao === to.chave}
                                                    onChange={
                                                        (event) => dispath({ type: "setOpcao", payload: event.target.value, iD: _id, Hash: gerarHash(event.target.value) })
                                                    }>
                                                </input>
                                                <label>{to.chave}</label>
                                            </>
                                        ))}
                                        <button style={{ display: "flex" }} type="submit" >
                                            Registrar Voto
                                        </button>
                                    </form>


                                    {showModal && (
                                        <div className={styles.modal}>
                                            <div className={styles['modal-content']}>
                                                <p>Deseja confirmar a ação?</p>
                                                <button onClick={handleConfirm}>Sim</button>
                                                <button onClick={() => setShowModal(false)}>Não</button>
                                            </div>
                                        </div>
                                    )}
                                    {showHash && (
                                        <div className={styles.modal}>
                                            <div className={styles['modal-content']}>
                                                <p>esse é o hash do seu voto, Guarde-o com segurança:<br/><br/>{dadosEleicao.hash}</p>
                                                <br/>
                                                <button onClick={handleCopy} >Copiar</button>
                                                <button onClick={() => {setDados(null),dispath({ type: 'reset' }), setShowHash(false)}}>Sair</button>
                                            </div>
                                        </div>
                                    )}
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
