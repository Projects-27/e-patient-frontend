import NavBar from './../components/navBar';
import Link  from 'next/link';
import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react'
import { useEffect } from 'react'
import {FunRequest} from 'funuicss/js/Fun'
import { EndPoint } from './../components/EndPoint'
export default function Dashboard() {
  const [patients, setpatients] = useState('')
  const [cleared, setcleared] = useState('')
  const [uncleared, setuncleared] = useState('')
  useEffect(() => {
    if(!patients){
       FunRequest.get(EndPoint + "/all/patients" )
       .then(data=>{
        setpatients(data.data)
       }).catch(err=>console.log(err))
    }
   })
  useEffect(() => {
    if(!cleared && patients){
       FunRequest.get(EndPoint + "/get/verified/pharmacy/" + true )
       .then(data=>{
        setcleared(data.data)
       }).catch(err=>console.log(err))
    }
   })
  useEffect(() => {
    if(!uncleared && patients && cleared){

      const calculate_uncleared = (a , b) => {
        return parseInt(a) - parseInt(b)
      }
      setuncleared(calculate_uncleared(patients.length , cleared.length))
      //  FunRequest.get(EndPoint + "/get/verified/pharmacy/" + false )
      //  .then(data=>{
      //   setuncleared(data.data)
      //  }).catch(err=>console.log(err))
    }
   })
  return (
    <div>
        <NavBar active={"d1"} />
        <div className="content">
          <div className="row">
          <div className="col sm-12 md-4 lg-4 padding">
              <div className="_card">
                <div className="text-small text-italic">Total number of patients</div>
                <div className="h2 text-grey">{patients ? patients.length : '...'}</div>
              </div>
            </div>
          <div className="col sm-12 md-4 lg-4 padding">
              <div className="_card">
                <div className="text-small text-italic">Patients Uncleared</div>
                <div className="h2 text-grey">{uncleared ? uncleared : '...'}</div>
              </div>
            </div>
          <div className="col sm-12 md-4 lg-4 padding">
              <div className="_card">
                <div className="text-small text-italic">Patients Cleared</div>
                <div className="h2 text-grey">{cleared ? cleared.length : '...'}</div>
              </div>
            </div>
          
          </div>
       
        </div>
    </div>
  )
}
