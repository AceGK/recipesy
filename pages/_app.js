import '../styles/globals.scss'
import Nav from '../comps/nav/Nav'
import { Poppins } from '@next/font/google'

import { UserContext } from '../lib/context';
import { useUserData } from '../hooks/useUserData';
import { useRouter } from "next/router";

const customFont = Poppins({
  display: "swap",
  weight:['400','500','600','700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export default function MyApp({ Component, pageProps }) {

  const userData = useUserData();

  // hiding navbar on login page
  const router = useRouter();
  const showHeader = router.pathname === "/login" ? false : true;
  
  return (
    <UserContext.Provider value={userData}>
      <main className={customFont.className}>
        {showHeader && <Nav />}
        <Component {...pageProps} />
      </main>
    </UserContext.Provider>
  );
}
