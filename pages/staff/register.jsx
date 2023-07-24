import React from 'react'
import NavBar from '../../components/navBar'
import { useEffect, useState } from 'react'
import {EndPoint} from '../../components/EndPoint'
import {FunRequest , FunGet} from 'funuicss/js/Fun'
import FunLoader from 'funuicss/component/FunLoader'
import SuccessModal from '../../components/Success';
import ErrorModal from '../../components/Error'
export default function Register() {
    const [errModal, seterrModal] = useState(false)
    const [success, setsuccess] = useState("")
    const [message, setmessage] = useState('')
    const [loading, setloading] = useState(false)

    useEffect(() => {
     setTimeout(() => {
     seterrModal(false)
     setsuccess(false)
     }, 4000);
      return () => {
        clearTimeout()
      }
    }, [errModal , success])

const Submit = ()=>{
    let userName = FunGet.val("#username")
    let password = FunGet.val("#password")
    let email = FunGet.val("#email")
    let Contact = FunGet.val("#contact")
    let Depertmentrole = FunGet.val("#department_role")
    let Address = FunGet.val("#address")

    const doc = {
     userName,
     password,
     email,
     Contact,
     Depertmentrole,
     Address
      }
      if(
          userName && 
          password && 
          email && 
          Contact && 
          Contact && 
          Depertmentrole && 
          Address 
        ){
        setloading(true)
        FunRequest.post(EndPoint + '/new/user' , doc).then((data)=>{
            setloading(false)
            if(data.status == 'error'){
                seterrModal(true)
                setmessage(data.error)
            }else{
                setmessage("user registered successfully")
                setsuccess(true)
            setTimeout(() => {
                window.location.reload()
            }, 3000);
            }
          })
          .catch(err=>{
            seterrModal(true)
        setmessage(err.message)
        setloading(false)
          })
       }else{
        seterrModal(true)
        setmessage("Make sure to enter all details")
       }

}
  return (
    <div>
                   {
    errModal ?  <ErrorModal message={message}  /> : ''
   }
   {
    success ? <SuccessModal message={message} /> : ''
   }
   {loading ?  <FunLoader size="80px" fixed/> : ''}
        <NavBar active={"d4"}/>
        <div className="content">
            <div>
                <div className="h2">Staff Registration</div>
                <div className='section'>Dashboard / <span className="text-gray">Register Staff</span></div>
            </div>
            <div className="m-section">
                <div className="card">
                    <div>Staff</div>
                    <div className="h1">Registration</div>
                    <div className="section row">
                        <div className="col sm-12 md-4 lg-4 padding">
                        <div className="text-gray">Email</div>
                            <input id='email' type="text" className="input light" placeholder='Email' />
                        </div>
                        <div className="col sm-12 md-4 lg-4 padding">
                        <div className="text-gray">Full Name</div>
                            <input id='username' type="text" className="input light" placeholder='Full Name' />
                        </div>
                        <div className="col sm-12 md-4 lg-4 padding">
                        <div className="text-gray">Phone Number</div>
                            <input id='contact' type="text" className="input light" placeholder='Tel' />
                        </div>
                        <div className="col sm-12 md-4 lg-4 padding">
                        <div className="text-gray">Department | Role</div>
                            <select id='department_role' type="text" className="input light"  >
                               <option value="lab">Lab</option>
                               <option value="scan">Scan Unit</option>
                               <option value="physician">Physician</option>
                               <option value="nurse">Nurse</option>
                            </select>
                        </div>
                        <div className="col sm-12 md-4 lg-4 padding">
                        <div className="text-gray">Address</div>
                            <input id='address' type="text" className="input light" placeholder='Address' />
                        </div>
                        <div className="col sm-12 md-4 lg-4 padding">
                        <div className="text-gray">Password</div>
                            <input id='password' type="password" className="input light" placeholder='Password' />
                        </div>
                        <div className="col sm-12 md-4 lg-4 padding">
                       <button className="primary full-width roundEdge button" onClick={Submit}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
