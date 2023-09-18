import React from 'react'
import closepn from './close.png'
import {Divider} from "@nextui-org/react"



const DepositModal=({open, closeModal})=>{
    if (!open) return null;
  return (
    <div className='modalBackground'>
        <div className='modalContainer' style={{position:'relative', alignItems:'center', textAlign:'center'}}>
            <button style={{right: 25, position:'absolute'}} onClick={() => closeModal(false)}>
                <img src={closepn} alt="" />
            </button>
            <h1 className='text-lg'>Deposit ETH</h1>
            <Divider />
            <div style={{display:'flex', margin:20, marginBottom:0, alignItems:'center'}}>
              <input className="text-3xl" style={{width:'100px', textAlign:'center', border:'none'}} placeholder='0.5' type="text" />
              <h3 className="text-3xl" style={{margin: 0}}>ETH</h3>
            </div>
            <h3 className="text-sm" style={{margin: 0, marginBottom: 20}}>921.21 USD</h3>
            <Divider/>
            <button style={{width:'30%', backgroundColor:'#607ADD', color:'white', height:40, right: 25, position:'absolute', bottom: 25}}>Confirm Deposit</button>
        </div>
    </div>
  )
}                                                                   

export default DepositModal


// .modalContainer {
//     width: 500px;
//     height: 250px;
//     border-radius: 12px;
//     background-color: white;
//     box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
//     display: flex;
//     flex-direction: column;
//     padding: 25px;

// }
