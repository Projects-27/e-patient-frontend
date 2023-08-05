import React from 'react'
import NavBar from '../../components/navBar'
import { useEffect, useState } from 'react'
import {EndPoint} from '../../components/EndPoint'
import {FunRequest , FunGet} from 'funuicss/js/Fun'
import FunLoader from 'funuicss/component/FunLoader'
import SuccessModal from '../../components/Success';
import ErrorModal from '../../components/Error'
import Table from 'funuicss/component/Table'
import TableHead from 'funuicss/component/TableHead'
import TableData from 'funuicss/component/TableData'
import TableRow from 'funuicss/component/TableRow'
import Div from 'funuicss/component/Div'
import RowFlex from 'funuicss/component/RowFlex'
import Input from 'funuicss/component/Input'
import Typography from 'funuicss/component/Typography'
export default function Register() {
    const [errModal, seterrModal] = useState(false)
    const [success, setsuccess] = useState("")
    const [message, setmessage] = useState('')
    const [loading, setloading] = useState(false)
    const [users, setusers] = useState('')
    const [search, setsearch] = useState("")
    useEffect(() => {
        if(!users){
           FunRequest.get(EndPoint + "/all/users" )
           .then(data=>{
            setusers(data.data)
           }).catch(err=>console.log(err))
        }
       })
       
    useEffect(() => {
     setTimeout(() => {
     seterrModal(false)
     setsuccess(false)
     }, 5000);
      return () => {
        clearTimeout()
      }
    }, [errModal , success])

const Submit = (e)=>{
    e.preventDefault()
    let userName = FunGet.val("#username")
    let password = FunGet.val("#password")
    let email = FunGet.val("#email")
    let contact = FunGet.val("#contact")
    let Departmentrole = FunGet.val("#department_role")
    let Address = FunGet.val("#address")

    const doc = {
        userName,
        password,
        email ,
        contact,
        Departmentrole,
        Address,
      }
      console.log(doc)
      if(
          userName && 
          password && 
          email && 
          contact && 
          Departmentrole && 
          Address 
        ){
        setloading(true)
        FunRequest.post(EndPoint + '/new/user' , doc).then((data)=>{
            setloading(false)
            console.log(data)
            if(data.status == 'error'){
                seterrModal(true)
                setmessage(data.message)
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
                            <input id='email' type="text" className="input lighter full-width" placeholder='Email' />
                        </div>
                        <div className="col sm-12 md-4 lg-4 padding">
                        <div className="text-gray">Full Name</div>
                            <input id='username' type="text" className="input lighter full-width" placeholder='Full Name' />
                        </div>
                        <div className="col sm-12 md-4 lg-4 padding">
                        <div className="text-gray">Phone Number</div>
                            <input id='contact' type="text" className="input lighter full-width" placeholder='Tel' />
                        </div>
                        <div className="col sm-12 md-4 lg-4 padding">
                        <div className="text-gray">Department | Role</div>
                            <select id='department_role' type="text" className="input lighter full-width"  >
                               <option value="admin">Admin</option>
                               <option value="reception">Reception</option>
                               <option value="doctor">Doctor</option>
                               {/* <option value="lab">Lab</option>
                               <option value="scan">Scan Unit</option>
                               <option value="physician">Physician</option>
                               <option value="nurse">Nurse</option> */}
                            </select>
                        </div>
                        <div className="col sm-12 md-4 lg-4 padding">
                        <div className="text-gray">Address</div>
                            <input id='address' type="text" className="input lighter full-width" placeholder='Address' />
                        </div>
                        <div className="col sm-12 md-4 lg-4 padding">
                        <div className="text-gray">Password</div>
                            <input id='password' type="password" className="input lighter full-width" placeholder='Password' />
                        </div>
                        <div className="col sm-12 md-4 lg-4 padding">
                       <button className="primary full-width roundEdge button" onClick={Submit}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section">
            <Div funcss="card text-small round-edge margin-top-30">
      <div className="padding hr">
      <RowFlex justify='space-between' gap='2rem'>
      <Input label="Email" onChange={(e)=>setsearch(e.target.value)} fullWidth/>
      <div>
        <Typography
        text='records'
        italic 
        color='primary'
        />
        <div />
        <div className='h2'>
            
        {
            users &&
               users
               .filter(fDoc =>{
                 if(!search){
                     return users
                 }else if(search.toString().toLowerCase().trim().includes(fDoc.patient_id.toString().toLowerCase().trim().slice(0 , search.length))){
                         return fDoc
                 }
               }).length
        }
        </div>
      </div>
      </RowFlex>
      </div>
      <Table  stripped >
       <TableHead>
           <TableData>Full Name</TableData>
           <TableData>Email</TableData>
           <TableData>Contact</TableData>
           <TableData>Department</TableData>
           <TableData>Address</TableData>
       </TableHead>
     {
      users &&
      users.filter(fDoc =>{
        if(!search){
            return users
        }else if(search.toString().toLowerCase().trim().includes(fDoc.email.toString().toLowerCase().trim().slice(0 , search.length))){
                return fDoc
        }
      }).map(doc=>(
        <TableRow key={doc.id}>
        <TableData>{doc.userName}</TableData>
        <TableData>{doc.password}</TableData>
        <TableData>{doc.email}</TableData>
        <TableData>{doc.contact}</TableData>
        <TableData>{doc.Departmentrole}</TableData>
        <TableData>{doc.Address}</TableData>
    </TableRow>
      ))
     }
    </Table>
    </Div>
            </div>
        </div>
    </div>
  )
}
