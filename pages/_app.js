import '../styles/globals.css'
import { motion } from "framer-motion";
import MainContainer from '../components/MainContainer'
import { useRouter } from "next/router";
import { SnackbarProvider } from 'notistack';

function App({ Component, pageProps, session }) {
  const router = useRouter();
  return (
    <motion.div
      key={router.route}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SnackbarProvider maxSnack={3}>
        <MainContainer session={session}>
          <Component{...pageProps} />
        </MainContainer>
      </SnackbarProvider>

    </motion.div>
  )

}

export default App;
