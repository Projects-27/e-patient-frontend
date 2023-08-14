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
import PrintSheet from '../../components/PrintSheet'
import FunLoader from 'funuicss/component/FunLoader';


export default function ClearRegistration() {
    const [modal2, setmodal2] = useState(false);
    const [me, setme] = useState('')
    const [loading, setloading] = useState(false)
    const [info, setinfo] = useState(false)
    const [message, setmessage] = useState('')
    const [patients, setpatients] = useState('')
    const [deleteModal, setdeleteModal] = useState(false)
    const [displayModal, setdisplayModal] = useState(false)
    const [search, setsearch] = useState('')
    const [viewDoc, setviewDoc] = useState("")

    useEffect(() => {
     if(!patients){
        FunRequest.get(EndPoint + "/get/verified/pharmacy"  )
        .then(data=>{
         setpatients(data.data)
         console.log(data)
        }).catch(err=>console.log(err))
     }
    })
    
    useEffect(() => {
        setTimeout(()=>{
          setinfo(false)
          setmessage('')
          setloading(false)
        },3000)
      
        return () => {
          clearTimeout()
        }
      }, [loading , info])


const [editDoc, seteditDoc] = useState('')
const HandleModal = (doc)=>{
seteditDoc(doc)
setdisplayModal(true)
}

  return (
    <div>
        
      <NavBar active={"d6"}/>
    <div className='content'>
          {
        loading ?
        <FunLoader fixed size={"70px"} />
        : info ? 
        <Alert message={message} fixed="top-middle" type="info" />
        :''
      }
<Modal 
animation="ScaleUp" 
duration={0.4} 
open={modal2}
backdrop
maxWidth="400px"
>
<ModalHeader>
<Typography text="Create/Edit Log" heading="h5"/>
<CloseModal  onClick={()=>setmodal2(false)}/>
</ModalHeader>
<ModalContent>
<Input label="Date" type='date' bordered fullWidth funcss="date" />
<Section />
<Input 
label="Activity"
 bordered
  fullWidth
  multiline
  funcss='activity'
  rows={5}
 />
<Section />
<Section />
{/* <Button
text="Submit"
bg="primary"
fullWidth
onClick={handleLog}
/> */}
</ModalContent>
</Modal>


{
  viewDoc &&
<PrintSheet doc={viewDoc} />
}

      <div>
      <Link href="/user" legacyBehavior>
           <Button rounded bg="light" smaller>
           <Icon icon="far fa-user" /> Profile
           </Button>
            </Link>
            <BreadCrumb type={"straight"} />
            <Link href="#" legacyBehavior>
           <Button rounded bg="primary" smaller>
           <Icon icon="bx bx-book" /> Patients Registration
           </Button>
            </Link>
            <div className="section">
              <RowFlex justify='space-between'>
                <Div>
                <Typography
                text="Patients Registrations"
                heading='h4'
                lighter
                />
                <br />
                <Typography
                text="Check and manage all Patients Registration"
                />
                </Div>
            
              </RowFlex>
            </div>
         
      </div>
      <Div funcss="card text-small round-edge margin-top-30">
      <div className="padding hr">
      <RowFlex justify='space-between' gap='2rem'>
      <Input label="Patient ID" onChange={(e)=>setsearch(e.target.value)} fullWidth/>
      <div>
        <Typography
        text='records'
        italic 
        color='primary'
        />
        <div />
        <div className='h2'>
            
        {
            patients &&
               patients
               .filter(fDoc =>{
                 if(!search){
                     return patients
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
           <TableData>Patient ID</TableData>
           <TableData>Name</TableData>
           <TableData>Gender</TableData>
           <TableData>Status</TableData>
           <TableData>Date</TableData>
           <TableData>Verify</TableData>
       </TableHead>
     {
      patients &&
      patients.filter(fDoc =>{
        if(!search){
            return patients
        }else if(search.toString().toLowerCase().trim().includes(fDoc.patient_id.toString().toLowerCase().trim().slice(0 , search.length))){
                return fDoc
        }
      }).map(doc=>(
        <TableRow key={doc.id}>
        <TableData>{doc.patient_id}</TableData>
        <TableData>{doc.first_name} {" "} {doc.middle_name} {" "} {doc.last_name}</TableData>
        <TableData>{doc.Sex}</TableData>
        <TableData>{doc.status}</TableData>
        <TableData>{doc.Date}</TableData>
        <TableData>
          <Button   
           height="2.5rem" 
     width="2.5rem" 
     float 
     bg='success'
          onClick={()=>{
            setloading(true)
            FunRequest.patch(EndPoint + "/pharmacy/cleared/" + doc.id , {"paid_verify" : true})
            .then(()=>{
                setloading(false)
                HandleModal(true)
                setviewDoc(doc)
            })
            .catch(err=>console.log(err))

          }}
          ><Icon icon="bx bx-check"  /></Button>
        </TableData>
    </TableRow>
      ))
     }
    </Table>
    </Div>
    </div>
    </div>
  )
}


