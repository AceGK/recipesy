import '../styles/globals.scss'
import Navbar from '../comps/nav/Navbar'
import { Inter } from '@next/font/google'

import { UserContext } from '../lib/context';
import { useUserData } from '../hooks/useUserData';
import { useRouter } from "next/router";

const customFont = Inter({display: "swap"});

export default function MyApp({ Component, pageProps }) {

  const userData = useUserData();

  // hiding navbar on login page
  const router = useRouter();
  const showHeader = router.pathname === "/login" ? false : true;
  
  return (
    <UserContext.Provider value={userData}>
      <main className={customFont.className}>
        {showHeader && <Navbar />}
        <Component {...pageProps} />
      </main>
    </UserContext.Provider>
  );
}
