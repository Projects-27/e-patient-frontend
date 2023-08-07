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
    var locale = "en-us";
    var today = new Date();
    var day = today.getDate();
    var fullDay = ("0" + day).slice(-2);
    var longMonth = today.toLocaleString(locale, { month: "long" });
    var year = today.getFullYear();
    const fullDate = longMonth + " " + fullDay + ", " + year
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    let first_name = FunGet.val("#first_name")
    let last_name = FunGet.val("#last_name")
    let middle_name = FunGet.val("#middle_name")
    let nationality = FunGet.val("#nationality")
    let religion = FunGet.val("#region")
    let occupation = FunGet.val("#occupation")
    let area = FunGet.val("#area")
    let country = FunGet.val("#country")
    let region = FunGet.val("#region")
    let PlaceofBirth = FunGet.val("#place_of_birth")
    let HomeAddress = FunGet.val("#home_address")
    let Contact = FunGet.val("#contact")
    let NHISNumber = FunGet.val("#nhis")
    let NationalID = FunGet.val("#national_id")
    let date = fullDate
    let DateofBirth = FunGet.val("#dob")
    let Sex = FunGet.val("#gender")
   
    const doc = {
        first_name,
        last_name,
        middle_name,
        nationality,
        religion,
        occupation,
        area,
        region,
        country,
        PlaceofBirth,
        HomeAddress,
        Contact,
        NHISNumber,
        NationalID,
        Date:date,
        DateofBirth,
        Sex,
        SelectTest:[],
        prescriptions:{},
        doctor:{} ,
        status:"registered",
        day:day ,
        month:longMonth ,
        year,
        created:fullDate,
        registered_by:me
      }
      if(
        first_name &&
        last_name&&
        middle_name &&
        nationality&&
        religion&&
        occupation&&
        area&&
        region&&
          PlaceofBirth && 
          HomeAddress && 
          Contact && 
          NHISNumber && 
          NationalID && 
          date && 
          DateofBirth && 
          Sex 
        //   SelectTest 
        ){
        setloading(true)
        FunRequest.post(EndPoint + '/new/patient' , doc).then((data)=>{
            setloading(false)
            console.log(data)
         if(data.status == "ok"){
            setprintDoc(data.data)
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
            <NavBar active={"d2"}/>
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
        <div className="text-primary text-small" style={{fontStyle:"italic"}}>First Name</div>
        <input id='first_name' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder='First Name' />
    </div>
    
    <div className="col sm-12 md-6 lg-6 padding">
        <div className="text-primary text-small" style={{fontStyle:"italic"}}>Last Name</div>
        <input id='last_name' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder='Last Name' />
    </div>
    
    <div className="col sm-12 md-6 lg-6 padding">
        <div className="text-primary text-small" style={{fontStyle:"italic"}}>Middle Name</div>
        <input id='middle_name' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder='Middle Name' />
    </div>
    
    <div className="col sm-12 md-6 lg-6 padding">
        <div className="text-primary text-small" style={{fontStyle:"italic"}}>Nationality</div>
        <input id='nationality' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder='Nationality' />
    </div>
    
    <div className="col sm-12 md-6 lg-6 padding">
        <div className="text-primary text-small" style={{fontStyle:"italic"}}>Religion</div>
        <input id='religion' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder='Religion' />
    </div>
    
    <div className="col sm-12 md-6 lg-6 padding">
        <div className="text-primary text-small" style={{fontStyle:"italic"}}>Occupation</div>
        <input id='occupation' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder='Occupation' />
    </div>
    
    <div className="col sm-12 md-6 lg-6 padding">
        <div className="text-primary text-small" style={{fontStyle:"italic"}}>Area</div>
        <input id='area' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder='Area' />
    </div>
    
    <div className="col sm-12 md-6 lg-6 padding">
        <div className="text-primary text-small" style={{fontStyle:"italic"}}>Country</div>
        <input id='country' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder='Contry' />
    </div>
    
    <div className="col sm-12 md-6 lg-6 padding">
        <div className="text-primary text-small" style={{fontStyle:"italic"}}>Region</div>
        <input id='region' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder='Region' />
    </div>
    
                            <div className="col sm-12 md-6 lg-6 padding">
                            <div className="text-primary text-small" style={{fontStyle:"italic"}}>Phone Number</div>
                                <input id='contact' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder='Tel' />
                            </div>
                            <div className="col sm-12 md-6 lg-6 padding">
                            <div className="text-primary text-small" style={{fontStyle:"italic"}}>Home Address</div>
                                <input id='home_address' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder='Tel' />
                            </div>
                            <div className="col sm-12 md-6 lg-6 padding">
                            <div className="text-primary text-small" style={{fontStyle:"italic"}}>Place Of Birth</div>
                                <input id='place_of_birth' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder='Home address' />
                            </div>
                            <div className="col sm-12 md-6 lg-6 padding">
                            <div className="text-primary text-small" style={{fontStyle:"italic"}}>National ID</div>
                                <input id='national_id' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder='Tel' />
                            </div>
                            <div className="col sm-12 md-6 lg-6 padding">
                            <div className="text-primary text-small" style={{fontStyle:"italic"}}>NHIS</div>
                                <input id='nhis' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder=' If any' />
                            </div>
                            <div className="col sm-12 md-6 lg-6 padding">
                                <div className="text-primary text-small" style={{fontStyle:"italic"}}>Date of birth</div>
                                <input id='dob' type="date" className="input borderedInput full-width" style={{borderRadius:'3rem'}}  />
                            </div>
                      
                            <div className="col sm-12 md-6 lg-6 padding">
                            <div className="text-primary text-small" style={{fontStyle:"italic"}}>Town | Location</div>
                                <input id='location' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder='Enter town | location' />
                            </div>
                            <div className="col sm-12 md-6 lg-6 padding">
                            <div className="text-primary text-small" style={{fontStyle:"italic"}}>Gender</div>
                                <select id='gender' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}}  >
                                    <option value="">--Select Gender--</option>
                                    <option value="male">male</option>
                                    <option value="female">Female</option>
                                </select>
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
