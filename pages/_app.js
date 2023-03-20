import '../styles/globals.css'
import { motion } from "framer-motion";
import MainContainer from '../components/MainContainer'
import { useRouter } from "next/router";


 function App({ Component, children , session}) {
  const router = useRouter();
  return ( 
    <motion.div 
    key={router.route}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    >
  <MainContainer session={session}>
    <Component{...children}/>  
  </MainContainer>
  </motion.div>
  )

}

export default App;
