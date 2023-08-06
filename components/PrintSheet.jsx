import React from 'react'
import RowFlex  from 'funuicss/component/RowFlex';
import Div  from 'funuicss/component/Div';
import  Typography from 'funuicss/component/Typography';
import  Icon from 'funuicss/component/Icon';
import Modal from 'funuicss/component/Modal'
import ModalHeader from 'funuicss/component/ModalHeader'
import CloseModal from 'funuicss/component/CloseModal'
import ModalContent from 'funuicss/component/ModalContent'
import ModalAction from 'funuicss/component/ModalAction'
import Button from 'funuicss/component/Button'
export default function PrintSheet({doc}) {

const HandlePrint = ()=>{
new Promise((resolve, reject) => {
const myElement = document.getElementById('documents');
printElement(myElement);
function printElement(element) {
    const originalContents = document.body.innerHTML;
    const printContents = element.innerHTML;

    document.body.innerHTML = printContents;
    window.print();

    document.body.innerHTML = originalContents;

}
resolve()
}).then(()=>{
window.location.reload()
})
}
  return (
    <div className='card'>
             <Modal 
animation="ScaleUp" 
duration={0.4} 
open={true}
backdrop
maxWidth="900px"
>
<ModalHeader>
<Typography text="Print Receipt" heading="h4"/>
<CloseModal  onClick={()=>window.location.reload()}/>
</ModalHeader>
<ModalContent>
<div className="width-700-max center" id='documents'>
  <div className="text-center">
    <img src="/logo.png" className='width-200' alt="" />
  </div>
<Typography
text="Personal Data"
heading='h6'
/>
<div className="round-edge padding border section">
<Div>
  <Typography italic size='small' color='primary'>Patient Name:</Typography> 
 <div />
 <Typography heading='h4'>{doc.PatientName}</Typography>
  </Div>
<RowFlex funcss='section' justify='space-between'>
  <Div>
  <Typography italic size='small' color='primary'>Patient ID:</Typography> 
 <div />
 <Typography>{doc.patient_id}</Typography>
  </Div>
  <Div>
  <Typography italic size='small' color='primary'>Gender:</Typography> 
 <div />
 <Typography>{doc.Sex}</Typography>
  </Div>
  <Div>
  <Typography italic size='small' color='primary'>Date</Typography> 
 <div />
 <Typography>{doc.Date}</Typography>
  </Div>

</RowFlex>
<RowFlex funcss='section' justify='space-between'>
  <Div>
  <Typography italic size='small' color='primary'>Date Of Birth:</Typography> 
 <div />
 <Typography>{doc.DateofBirth}</Typography>
  </Div>
  <Div>
  <Typography italic size='small' color='primary'>National ID:</Typography> 
 <div />
 <Typography>{doc.Sex}</Typography>
  </Div>
  <Div>
  <Typography italic size='small' color='primary'>NHIS</Typography> 
 <div />
 <Typography>{doc.NHISNumber }</Typography>
  </Div>

</RowFlex>
</div>
<p />
<Typography
text="Tests"
heading='h6'
/>
<div className="round-edge padding border section">
<div className="row">
    {
        doc.SelectTest ?
            doc.SelectTest.map(doc=>(
                <div className="col sm-6 lg-6 md-6 " style={{padding:"0.2rem"}} key={doc.label}>
                     <div className="testTab">{doc.label}</div> 
                </div>
            ))
            :''
    }
</div>
</div>
{
  doc.prescriptions.findings &&
<p>
<p />
<Typography
text="Findings"
heading='h6'
/>
<div className="round-edge padding border section lighter round-edge ">
{doc.prescriptions.findings}
</div>
</p>
}
{
  doc.prescriptions.results &&
<p>
<p />
<Typography
text="Results"
heading='h6'
/>
<div className="round-edge padding border section lighter round-edge ">
{doc.prescriptions.results}
</div>
</p>
}
{
  doc.prescriptions.comments &&
<p>
<p />
<Typography
text="Other Comment"
heading='h6'
/>
<div className="round-edge padding border section lighter round-edge ">
{doc.prescriptions.comments}
</div>
</p>
}
</div>
</ModalContent>
<ModalAction>
    <Button bg='primary' startIcon={<Icon icon="bx bx-check-double"/>}  onClick={HandlePrint}>
        Print Receipt
    </Button>
</ModalAction>
</Modal>
    </div>
  )
}