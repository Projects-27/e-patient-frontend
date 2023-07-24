import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import {EndPoint} from '../components/EndPoint'
import {FunRequest , FunGet} from 'funuicss/js/Fun'
import ErrorModal from './../components/Error';
const inter = Inter({ subsets: ['latin'] })
import FunLoader from 'funuicss/component/FunLoader'
export default function Home() {
  const [error, seterror] = useState("")
  useEffect(() => {
   setTimeout(() => {
   seterror(false)
   }, 4000);
    return () => {
      clearTimeout()
    }
  }, [error])
  
  const [message, setmessage] = useState('')
  const [loading, setloading] = useState(false)
  const Submit = ()=>{
    setloading(false)
    seterror('')
    const email = FunGet.val("#email")
    const password = FunGet.val("#password")
 if(email && password){
  setloading(true)
  FunRequest.post(EndPoint + '/userlogin' , 
  {
    email: email,
    password: password,
    }).then((data)=>{
      setloading(false)
     if(data.status == 'error'){
      seterror(true)
      setmessage('Invalid email or Password')
     }else{
      new Promise((resolve, reject) => {
        sessionStorage.setItem('user', JSON.stringify(data.data));
        resolve()
      }).then(()=>window.location.href="/dashboard")
 

     }
    })
    .catch(err=>{
      seterror(true)
  setmessage(err.message)
  setloading(false)
    })
 }
 else{
  seterror(true)
  setmessage("Make sure to enter your email and password")
  setloading(false)
}
  }
  return (
    <>
   {
    error ?  <ErrorModal message={message}  /> : ''
   }
   {loading ?  <FunLoader size="80px" fixed/> : ''}
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <div className="loginContainer" >
        
    <div className="formCon">
      <div className="padding-bottom-20 h2">
        Login Account
      </div>
      <div className="section">
      <input id='email' type="email"  className="roundEdge input white" placeholder='Email' />
      </div>
      <div className="section">
      <input id='password' type="password" className="roundEdge input white" placeholder='Password' />
      </div>
      <div className="section">
      <button className='primary  full-width button roundEdge' onClick={Submit}>Login</button>
      </div>
    </div>
  </div>
      </main>
    </>
  )
}
