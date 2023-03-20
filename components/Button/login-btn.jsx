import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Children, useEffect } from "react";
import styles from '@/styles/button/button.module.css'


export default function Btn(props) {
  const router = useRouter();
  const { data: session } = useSession();

  async function login(){
    console.log("oi")
    signIn(props.servidor)
    router.replace("/views/home")
  }

  return (
    <>
      <button className={styles.botao}
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
        }}
        onClick={login}>{props.children}</button>
    </>
  )
}
