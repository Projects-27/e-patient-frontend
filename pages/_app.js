// import '@/styles/globals.css'
import '@/styles/style.css'
import 'funuicss/css/fun.css'
import Head from 'next/head'
import { useEffect } from 'react'
export default function App({ Component, pageProps }) {
  useEffect(()=>{

    var root = document.querySelector(':root');
    root.style.setProperty('--primaryColor', "#374259"); 
    
  },[])
  return (
  <div>
       <Head>
          <link rel="icon" href="/img/favicon.png" />
          <title>E patient</title>
          <style>
          @import url({"https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"});
          @import url({"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"});
        @import url({"https://cdn.lineicons.com/3.0/lineicons.css"});
        @import url({"https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"});

          </style>
          <link href="https://cdn.lineicons.com/3.0/lineicons.css" rel="stylesheet" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </Head>
        <Component {...pageProps} />
  </div>
 )
}
