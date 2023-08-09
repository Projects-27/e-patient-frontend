import React from 'react'
import brand from '../data/Brand';
import Link from "next/link"
import Button from 'funuicss/component/Button';
import Icon from 'funuicss/component/Icon';
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
        {
          user.Departmentrole == 'admin' &&
          <Link href="/dashboard">
          <div className={active == "d1" ? "active navLink" : "navLink"}>  <i className='bx bx-bar-chart-alt'></i>  Dashboard</div>
          </Link>
        }
           {
            user.Departmentrole == 'reception' ?
            <Link href="/patient/register">
            <div className={active == "d2" ? "active navLink" : "navLink"}>  <i className='bx bx-plus-medical'></i>  Register Patient </div>
            </Link>
            :''
           }
       {
        user.Departmentrole === "admin" || user.Departmentrole === 'doctor' ?
        <Link href="/patient/records">
        <div className={active == "d3" ? "active navLink" : "navLink"}>  <i className='bx bx-data'></i>  Patient Records</div>
        </Link>
        :""
       }
       {
        user?.Departmentrole === "pharmacy" &&
        <Link href="/pharmacy/clear_registration">
        <div className={active == "d6" ? "active navLink" : "navLink"}>  <i className='bx bx-check'></i> Verify Registrations</div>
        </Link>
       }
       {
        user?.Departmentrole === "admin" &&
        <Link href="/staff/register">
        <div className={active == "d4" ? "active navLink" : "navLink"}>  <i className='bx bx-user'></i>  New Staff</div>
        </Link>
       }
           {
            user?.Departmentrole === 'doctor' ?
            <Link href="/patient/doctor">
            <div className={active == "d5" ? "active navLink" : "navLink"}>  <i className='bx bx-capsule'></i>  Prescriptions</div>
            </Link>
            :''
           }
            <div className="section margin-top-80">
              <Button
              text="Log Out"
              bg="white"
              funcss='card text-left padding'
              fullWidth 
              rounded
              startIcon={<Icon icon="bx bx-exit"  />}
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
