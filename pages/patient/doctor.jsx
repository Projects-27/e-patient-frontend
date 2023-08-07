import React from 'react'
import BreadCrumb from 'funuicss/component/BreadCrumb'
import Button from 'funuicss/component/Button'
import Icon from 'funuicss/component/Icon'
import Link from 'next/link'
import Typography from 'funuicss/component/Typography';
import RowFlex from 'funuicss/component/RowFlex';
import Div from 'funuicss/component/Div';
import {FunGet} from 'funuicss/js/Fun'
import Modal from 'funuicss/component/Modal'
import ModalHeader from 'funuicss/component/ModalHeader'
import CloseModal from 'funuicss/component/CloseModal'
import ModalContent from 'funuicss/component/ModalContent'
import ModalAction from 'funuicss/component/ModalAction'
import Input from 'funuicss/component/Input'
import Section from 'funuicss/component/Section'
import { useState } from 'react'
import { useEffect } from 'react'
// import { isOnline } from '../Functions/Functions'
import {FunRequest} from 'funuicss/js/Fun'
import { EndPoint } from '../../components/EndPoint'
import Alert from 'funuicss/component/Alert'
import Table from 'funuicss/component/Table'
import TableHead from 'funuicss/component/TableHead'
import TableData from 'funuicss/component/TableData'
import TableRow from 'funuicss/component/TableRow'
import NavBar from '../../components/navBar'
import  FunLoader from 'funuicss/component/FunLoader';
import SuccessModal from './../../components/Success';
import ErrorModal from './../../components/Error';
import { IsOnline } from '../../Functions/Functions'
import { MultiSelect } from "react-multi-select-component";
import Test from  "@/data/Test"
export default function Doctor() {
    const [patient, setpatient] = useState('')
    const [errModal, seterrModal] = useState(false)
    const [success, setsuccess] = useState("")
    const [message, setmessage] = useState('')
    const [loading, setloading] = useState(false)
    const [selectedOption, setSelectedOption] = useState([]);

    const [me, setme] = useState('')

    useEffect(() => {
    if(!me){
        IsOnline()
        .then(doc=>setme(doc))
    }
    })
    
    useEffect
    useEffect(() => {
        setTimeout(() => {
        seterrModal(false)
        setsuccess(false)
        setmessage('')
        }, 4000);
         return () => {
           clearTimeout()
         }
       }, [errModal , success])

    const [p_id, setp_id] = useState('')
    
   const getPatient = ()=>{
            setloading(true)
           FunRequest.get(EndPoint + "/patient/hospital/" + p_id )
           .then(data=>{
            setloading(false)
            if(data.status == 'ok'){
                setpatient(data.data)
            }else if (data.status == 'error'){
                seterrModal(true)
                setmessage(doc.message)
            }
           }).catch(err=>{
            seterrModal(true)
            setmessage(err.message)
            setloading(false)
        })
       }
const Submit = ()=>{
    let findings, results , comments , data
    findings = FunGet.val("#findings")
    results = FunGet.val("#results")
    comments = FunGet.val("#comments")

    data = {
        prescriptions:{
            findings ,
            results,
            comments
        },
        doctor:me,
        status:"given prescription",
        SelectTest:selectedOption
    }

    if(findings && results){
        setloading(true)
        FunRequest.patch(EndPoint + '/prescription/' + patient.id , data)
        .then((doc)=>{
            setloading(false)
           if(doc.status == 'ok'){
            setsuccess(true)
            setmessage("prescriptions given succesfully")
            setTimeout(() => {
                window.location.reload()
            }, 3000);
           }else if (doc.status == 'error'){
            seterrModal(true)
            setmessage(doc.message)
           }
        }).catch((err)=>{
            console.log(err)
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
        errModal ?  <ErrorModal message={message}  /> : ''
       }
       {
        success ? <SuccessModal message={message} /> : ''
       }
       {loading ?  <FunLoader size="80px" fixed/> : ''}
           <NavBar active={"d5"}/>
           <div className="content">
           <div>
                    <div className="h2">Patient Findings | Prescription</div>
                    <div className='section'>Dashboard / <span className="text-primary italic text-small">Patient prescription</span></div>
                </div>
                <div className="m-section">
                    <div className="card">
                        <RowFlex funcss='padding' gap='2rem'>
                            <Input
                            label='Patient ID'
                            onChange={(e)=>setp_id(e.target.value)}
                            fullWidth
                            />
                        <div className="width-200">
                        <Button
                            text="Get Patient"
                            bg="primary"
                            rounded
                            onClick={getPatient}
                            />
                        </div>
                        </RowFlex>
                      {
                        patient ?
                        <div className="padding">
                              <div>Patient</div>
                        <div className="h2">Details / Tests</div>
                        <div className="section row">
                            <div className="col sm-12 md-4 lg-4 padding">
                            <div className="text-primary italic text-small">Full Name</div>
                            <div className="">{`${patient.first_name } ${patient.middle_name } ${patient.last_name }` }</div>
                            </div>
                            <div className="col sm-12 md-4 lg-4 padding">
                            <div className="text-primary italic text-small">Phone Number</div>
                            <div className="">{patient.Contact}</div>
                            </div>
                            <div className="col sm-12 md-4 lg-4 padding">
                                <div className="text-primary italic text-small">Date of birth</div>
                                <div className="">{patient.DateofBirth }</div>
                            </div>
                            <div className="col sm-12 md-4 lg-4 padding">
                            <div className="text-primary italic text-small">Town | Location</div>
                            <div className="">{patient.HomeAddress  }</div>
                            </div>
                            <div className="col sm-12 md-8 lg-8 padding">
                            <div className="text-primary italic text-small">Test</div>
                          <div className="row">
                            {
                                patient.SelectTest.map(doc=>(
                                    <div className="col sm-12 lg-3 md-3 " style={{padding:"0.2rem"}} key={doc.label}>
                                         <div className="testTab">{doc.label}</div> 
                                    </div>
                                ))
                            }
                          </div>
                            </div>
                        </div>
                        </div>
                        : <div className="padding text-center">
                            Enter patient id to get patient
                        </div>
                      }
                    </div>
                </div>
               {
                patient &&
                <div className="m-section row">
                    <div className="col sm-12 md-8 lg-8 padding">
                    <div className="card">

<div className="padding sm-12 md-8 lg-8">
<div className="section row">
         <div className="col sm-12 md-12 lg-12 padding">
         {/* <div className="text-gray text-bold">Findings *</div> */}
             <textarea id='findings' rows={5} type="text" className="input full-width" placeholder='What are your findings' />
         </div>
         <div className="col sm-12 md-12 lg-12 padding">
         {/* <div className="text-gray text-bold">Results *</div> */}
             <textarea id='results' rows={5} type="text" className="input full-width" placeholder='What are your results' />
         </div>
         <div className="col sm-12 md-12 lg-12 padding">
         {/* <div className="text-gray text-bold">Other Comments *</div> */}
             <textarea id='comments' rows={5} type="text" className="input full-width" placeholder='Other comments' />
         </div>
         <div className="col sm-12 md-4 lg-4 padding">
        <button className="primary full-width roundEdge button" onClick={Submit}>Submit Results</button>
         </div>
        
     </div>
</div>

 </div>
                    </div>
                <div className="col padding sm-12 md-4 lg-4">
                    <div className="card padding round-egde">
                        <div className="text-small">Tests</div>
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
               }
           </div>
        </div>
      )
}else{
    return (<></>)
}
}
