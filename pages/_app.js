import '../styles/globals.scss'
import Navbar from '../comps/nav/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
