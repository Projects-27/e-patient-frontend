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
export default function Doctor() {
    const [patient, setpatient] = useState('')
    const [p_id, setp_id] = useState('')
    
   const getPatient = ()=>{
        if(!patient){
           FunRequest.get(EndPoint + "/patient/hospital/" + p_id )
           .then(data=>{
            setpatient(data.data)
            console.log(data)
           }).catch(err=>console.log(err))
        }
       }

  return (
    <div>
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
                        <div className="">{patient.PatientName }</div>
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
                            patient.SelectTest.map(doc=>{
                                <div className="col sm-12 lg-3 md-3 " style={{padding:"0.2rem"}} key={doc}> <div className="testTab">{doc}</div> </div>
                            })
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
            <div className="m-section">
                <div className="card">

                    <div className="section row">
                        <div className="col sm-12 md-12 lg-12 padding">
                        <div className="text-gray text-bold">Findings *</div>
                            <textarea rows={5} type="text" className="textarea light" placeholder='What are your findings' />
                        </div>
                        <div className="col sm-12 md-12 lg-12 padding">
                        <div className="text-gray text-bold">Results *</div>
                            <textarea rows={5} type="text" className="textarea light" placeholder='What are your results' />
                        </div>
                        <div className="col sm-12 md-12 lg-12 padding">
                        <div className="text-gray text-bold">Other Comments *</div>
                            <textarea rows={5} type="text" className="textarea light" placeholder='Other comments' />
                        </div>
                        <div className="col sm-12 md-4 lg-4 padding">
                       <button className="primary full-width roundEdge button">Submit Results</button>
                        </div>
                       
                    </div>
                </div>
            </div>
       </div>
    </div>
  )
}
