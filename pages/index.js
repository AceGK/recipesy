import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import Loader from '../comps/loader/Loader'

export default function Home() {

  return (
   <div>
    <Loader show />
   </div>
  )
}
