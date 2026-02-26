import ToastWrapper from "@/components/ToastWapper";
// import { setIsLoggedIn, userData } from "@/redux/Auth/AuthSlice";

import "@/styles/globals.css";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import ProtectedPageService from "../../ProtectedPageService";
import { store, persistor } from "../../redux/store";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <ReduxProvider store={store}>
      <ToastWrapper />
      <PersistGate loading={null} persistor={persistor}>
        <ProtectedPageService />
        <motion.div
          key={router.route}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 50 },
          }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </PersistGate>
    </ReduxProvider>
  )
}
