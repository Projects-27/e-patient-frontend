import React from 'react'
import NavBar from '../../components/navBar'
import { useEffect, useState } from 'react'
import {EndPoint} from '../../components/EndPoint'
import {FunRequest , FunGet} from 'funuicss/js/Fun'
import FunLoader from 'funuicss/component/FunLoader'
import SuccessModal from '../../components/Success';
import ErrorModal from '../../components/Error'


import RowFlex  from 'funuicss/component/RowFlex';
import Div  from 'funuicss/component/Div';
import  Typography from 'funuicss/component/Typography';
import  Icon from 'funuicss/component/Icon';
import Modal from 'funuicss/component/Modal'
import ModalHeader from 'funuicss/component/ModalHeader'
import CloseModal from 'funuicss/component/CloseModal'
import ModalContent from 'funuicss/component/ModalContent'
import ModalAction from 'funuicss/component/ModalAction'
import PrintSheet from './../../components/PrintSheet';
import { IsOnline } from '../../Functions/Functions'
export default function Register() {

    const [errModal, seterrModal] = useState(false)
    const [success, setsuccess] = useState("")
    const [message, setmessage] = useState('')
    const [loading, setloading] = useState(false)
    const [modal2, setmodal2] = useState("")
    let selectedTest = []
    const [printDoc, setprintDoc] = useState("")
    const [me, setme] = useState('')
    useEffect(() => {
  if(!me){
    IsOnline()
    .then(data=>{
      setme(data)
    })
  }
    })

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

    let weight = FunGet.val("#weight")
    let bp = FunGet.val("#bp")
    let temperature = FunGet.val("#temperature")
    let patient_id = FunGet.val("#patient_id")

   
    const doc = {
        health_records:{
        weight ,
        bp ,
        temperature ,
        patient_id
     }
      }
      if(
        weight &&
        bp &&
        temperature &&
        patient_id
        ){
        setloading(true)
        FunRequest.patch(EndPoint + '/opd/' + patient_id , doc).then((data)=>{
            setloading(false)
         if(data.status == "ok"){
            setsuccess(true)
            setmessage("Records taken successfully")
            setTimeout(() => {
                window.location.reload()
            }, 4000);
         }else{
            seterrModal(true)
            setmessage(data.message)
         }
          })
          .catch(err=>{
            seterrModal(true)
        setmessage(JSON.stringify(err))
        setloading(false)
          })
       }else{
        seterrModal(true)
        setmessage("Make sure to enter all details")
       }

}
  
if(me){
    return (
        <div>
       {
        printDoc ?
        <PrintSheet  doc={printDoc}/>
        :''
       }
               {
        errModal ?  <ErrorModal message={message}  /> : ''
       }
       {
        success ? <SuccessModal message={message} /> : ''
       }
       {loading ?  <FunLoader size="80px" fixed/> : ''}
            <NavBar active={"d8"}/>
            <div className="content">
    
                <div>
                    <div className="h2">Patient Registration</div>
                    <div className='section'>Dashboard / <span className="text-primary text-small" style={{fontStyle:"italic"}}>Register patient</span></div>
                </div>
                <div className="m-section row">
                    <div className="col sm-12 md-12 lg-12">
                    <div className="card">
                        <div className="section row">
                        <div className="col sm-12 md-6 lg-6 padding">
        <div className="text-primary text-small" style={{fontStyle:"italic"}}>Weight</div>
        <input 
        id='weight' 
        type="text" 
        className="input borderedInput full-width" 
        style={{borderRadius:'3rem'}} 
        placeholder='Weight' 
        />
    </div>
    
    <div className="col sm-12 md-6 lg-6 padding">
        <div className="text-primary text-small" style={{fontStyle:"italic"}}>BP</div>
        <input 
        id='bp' 
        type="text" 
        className="input borderedInput full-width" 
        style={{borderRadius:'3rem'}} 
        placeholder='BP' 
        />
    </div>
    
    <div className="col sm-12 md-6 lg-6 padding">
        <div className="text-primary text-small" style={{fontStyle:"italic"}}>Temperature</div>
        <input 
        id='temperature' 
        type="text" 
        className="input borderedInput full-width" 
        style={{borderRadius:'3rem'}} 
        placeholder='Temperature'
         />
    </div>

    <div className="col sm-12 md-6 lg-6 padding">
        <div className="text-primary text-small" style={{fontStyle:"italic"}}>Patient ID</div>
        <input 
        id='patient_id' 
        type="text" 
        className="input borderedInput full-width" 
        style={{borderRadius:'3rem'}} 
        placeholder='Patient ID'
         />
    </div>
    
                   
                            <div className="col sm-12 md-6 lg-6 padding">
                           <div className='fit' style={{
                            display:'flex',
                            flexDirection:'row',
                            alignItems:'flex-end'
                           }}>
                           <button className="primary full-width roundEdge button" onClick={Submit}>Register <Icon icon="far fa-paper-plane"  /></button>
                           </div>
                            </div>
                        </div>
                    </div>
                    </div>
              
                  
                </div>
            </div>
        </div>
      )
    }else{
    return ""
}

}
