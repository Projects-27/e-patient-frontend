// import '@/styles/globals.css'
import '@/styles/style.css'
import 'funuicss/css/fun.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(()=>{

    var root = document.querySelector(':root');
    root.style.setProperty('--primaryColor', "#374259"); 
    
  },[])
  return <Component {...pageProps} />
}
