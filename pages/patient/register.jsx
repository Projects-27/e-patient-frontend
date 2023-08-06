import React from 'react'
import NavBar from '../../components/navBar'
import { useEffect, useState } from 'react'
import {EndPoint} from '../../components/EndPoint'
import {FunRequest , FunGet} from 'funuicss/js/Fun'
import FunLoader from 'funuicss/component/FunLoader'
import SuccessModal from '../../components/Success';
import ErrorModal from '../../components/Error'
import Test from  "@/data/Test"
import { MultiSelect } from "react-multi-select-component";
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
export default function Register() {

    const [errModal, seterrModal] = useState(false)
    const [success, setsuccess] = useState("")
    const [message, setmessage] = useState('')
    const [loading, setloading] = useState(false)
    const [modal2, setmodal2] = useState("")
    let selectedTest = []
    const [selectedOption, setSelectedOption] = useState([]);
    const [printDoc, setprintDoc] = useState("")


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

    let PatientName = FunGet.val("#username")
    let PlaceofBirth = FunGet.val("#place_of_birth")
    let HomeAddress = FunGet.val("#home_address")
    let Contact = FunGet.val("#contact")
    let NHISNumber = FunGet.val("#nhis")
    let NationalID = FunGet.val("#national_id")
    let date = fullDate
    let DateofBirth = FunGet.val("#dob")
    let Sex = FunGet.val("#gender")
   
    const doc = {
        PatientName,
        PlaceofBirth,
        HomeAddress,
        Contact,
        NHISNumber,
        NationalID,
        Date:date,
        DateofBirth,
        Sex,
        SelectTest:selectedOption,
        prescriptions:{},
        doctor:{} ,
        status:"registered"
      }
      if(
          PatientName && 
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
            // setsuccess(true)
            // setmessage("Patient registered successfully")
            // setTimeout(() => {
            //     window.location.reload()
            // }, 3000);
         if(data.status == "ok"){
            setprintDoc(data.data)
         }
          })
          .catch(err=>{
            seterrModal(true)
        setmessage(err.message)
        setloading(false)
          })
       }else{
        seterrModal(true)
        // setmessage("Make sure to enter all details")
       }

}
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
                <div className='section'>Dashboard / <span className="text-gray">Register patient</span></div>
            </div>
            <div className="m-section row">
                <div className="col padding sm-12 md-8 lg-8">
                <div className="card">
                    <div className="section row">
                        <div className="col sm-12 md-6 lg-6 padding">
                        <div className="text-gray">Full Name</div>
                            <input id='username' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder='Full Name' />
                        </div>
                        <div className="col sm-12 md-6 lg-6 padding">
                        <div className="text-gray">Phone Number</div>
                            <input id='contact' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder='Tel' />
                        </div>
                        <div className="col sm-12 md-6 lg-6 padding">
                        <div className="text-gray">Home Address</div>
                            <input id='home_address' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder='Tel' />
                        </div>
                        <div className="col sm-12 md-6 lg-6 padding">
                        <div className="text-gray">Place Of Birth</div>
                            <input id='place_of_birth' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder='Home address' />
                        </div>
                        <div className="col sm-12 md-6 lg-6 padding">
                        <div className="text-gray">National ID</div>
                            <input id='national_id' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder='Tel' />
                        </div>
                        <div className="col sm-12 md-6 lg-6 padding">
                        <div className="text-gray">NHIS</div>
                            <input id='nhis' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder=' If any' />
                        </div>
                        <div className="col sm-12 md-6 lg-6 padding">
                            <div className="text-gray">Date of birth</div>
                            <input id='dob' type="date" className="input borderedInput full-width" style={{borderRadius:'3rem'}}  />
                        </div>
                  
                        <div className="col sm-12 md-6 lg-6 padding">
                        <div className="text-gray">Town | Location</div>
                            <input id='location' type="text" className="input borderedInput full-width" style={{borderRadius:'3rem'}} placeholder='Enter town | location' />
                        </div>
                        <div className="col sm-12 md-6 lg-6 padding">
                        <div className="text-gray">Gender</div>
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
                <div className="col padding sm-12 md-4 lg-4">
                    <div className="card padding round-egde">
                    <pre>
                    {
                        selectedOption.map((doc)=>(
                                <div className='bt padding' key={doc.label}>
                                    <Typography
                                    text={doc.label}
                                    italic
                                    />
                                </div>
                        ))
                    }
                </pre>
                            <MultiSelect
                                options={Test}
                                value={selectedOption}
                                onChange={setSelectedOption}
                                labelledBy="Select"
                            />
                    </div>
                </div>
              
            </div>
        </div>
    </div>
  )
}
