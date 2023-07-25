import React from 'react'
import brand from '../data/Brand';
import Link from "next/link"
import Button from 'funuicss/component/Button';
import {LogOut} from '@/Functions/Functions'
import { useState , useEffect } from 'react';
import { IsOnline } from './../Functions/Functions';
export default function NavBar({active}) {
  const [user, setuser] = useState('')

  useEffect(() => {
  IsOnline()
  .then(doc=>{
    setuser(doc)
  })
  .catch(err=>window.location.assign('/'))
  } ,[])
  
if(user){
  return (
    <div>
        <div className="navBar">
            <div className="h4" style={{textTransform:"uppercase"}}>{brand}</div>
            <div className='dDown'>
           <div className='button'>  <i className='bx bx-user'></i>  {user.userName} </div>
            </div>
        </div>
        <div className="sideBar">
            <Link href="/dashboard">
            <div className={active == "d1" ? "active navLink" : "navLink"}>  <i className='bx bx-bar-chart-alt'></i>  Dashboard</div>
            </Link>
            <Link href="/patient/register">
            <div className={active == "d2" ? "active navLink" : "navLink"}>  <i className='bx bx-plus-medical'></i>  Register Patient </div>
            </Link>
            <Link href="/patient/records">
            <div className={active == "d3" ? "active navLink" : "navLink"}>  <i className='bx bx-plus-medical'></i>  Patient Records</div>
            </Link>
            <Link href="/staff/register">
            <div className={active == "d4" ? "active navLink" : "navLink"}>  <i className='bx bx-user'></i>  New Staff</div>
            </Link>
            <Link href="/patient/doctor">
            <div className={active == "d5" ? "active navLink" : "navLink"}>  <i className='bx bx-user'></i>  Patient Attend</div>
            </Link>
            <div className="section">
              <Button
              text="Log Out"
              bg="light-danger"
              fullWidth 
              rounded
              small
              onClick={()=>LogOut()}
              />
            </div>
        </div>
    </div>
  )
}else{
  return ''
}
}
