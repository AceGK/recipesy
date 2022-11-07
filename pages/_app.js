import '../styles/globals.scss'
import Navbar from '../comps/nav/Navbar'

import { UserContext } from '../lib/context';
import { useUserData } from '../hooks/useUserData';

export default function MyApp({ Component, pageProps }) {

  const userData = useUserData();
  
  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
