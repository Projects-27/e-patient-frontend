import React from 'react'
import NavBar from '../../components/navBar'

export default function Doctor() {
  return (
    <div>
       <NavBar active={"d5"}/>
       <div className="content">
       <div>
                <div className="h2">Patient Findings | Prescription</div>
                <div className='section'>Dashboard / <span className="text-gray">Patient prescription</span></div>
            </div>
            <div className="m-section">
                <div className="card">
                    <div>Patient</div>
                    <div className="h2">Details / Tests</div>
                    <div className="section row">
                        <div className="col sm-12 md-4 lg-4 padding">
                        <div className="text-gray">Full Name</div>
                        <div className="h4">Iddris Abdul Wahab</div>
                        </div>
                        <div className="col sm-12 md-4 lg-4 padding">
                        <div className="text-gray">Phone Number</div>
                        <div className="h4">0552500930</div>
                        </div>
                        <div className="col sm-12 md-4 lg-4 padding">
                            <div className="text-gray">Date of birth</div>
                            <div className="h4">25-03-2001</div>
                        </div>
                        <div className="col sm-12 md-4 lg-4 padding">
                        <div className="text-gray">Town | Location</div>
                        <div className="h4">Wa</div>
                        </div>
                        <div className="col sm-12 md-8 lg-8 padding">
                        <div className="text-gray">Test</div>
                      <div className="row">
                        <div className="col sm-12 lg-3 md-3 " style={{padding:"0.2rem"}}> <div className="testTab">Malaria</div> </div>
                        <div className="col sm-12 lg-3 md-3 " style={{padding:"0.2rem"}}> <div className="testTab">Pelvic Scan</div> </div>
                        <div className="col sm-12 lg-3 md-3 " style={{padding:"0.2rem"}}> <div className="testTab">Pelvic Scan</div> </div>
                        <div className="col sm-12 lg-3 md-3 " style={{padding:"0.2rem"}}> <div className="testTab">Pelvic Scan</div> </div>
                        <div className="col sm-12 lg-3 md-3 " style={{padding:"0.2rem"}}> <div className="testTab">Pelvic Scan</div> </div>
                      </div>
                        </div>
                    </div>
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
