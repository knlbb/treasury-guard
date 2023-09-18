import React from 'react'
import { Link } from 'react-router-dom'
import logoPNG from './Group3.png'

export default function JoinAccount() {
  return (
    <div style={{height: 'auto'}}>
        <div style={{display:'flex', alignItems:'center', borderBottom: '1px solid black'}}>
            <Link to="/home">
                <div style={{display:'flex', margin: 20}}>
                    <img style={{height:30}} src={logoPNG} alt="" />
                    <h1 className='text-xl text-black' style={{margin:0}}>TreasuryGuard</h1>
                </div>
            </Link>

            <div style={{right: 20, position: 'absolute'}}>
                {/* <button>jsjs</button> */}
                <button style={{borderRadius: '4px', cursor:'pointer', display: 'flex', gap:5, padding: '8px 16px', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--text-secondary, rgba(0, 26, 76, 0.60))', backgroundColor:'transparent'}}>
                0xE3ea...0049
                </button>
            </div>
        </div>

        <div style={{display:'flex', justifyContent:'center', margin:20}}>
            <h1 className='text-2xl font-bold'>Choose how to connect with a chest</h1>
        </div>
        <div style={{display:'flex', justifyContent:'center', margin:20}}>
            <div style={{width:'25%'}}>
                Group chest address
                <input style={{width:'100%'}} type="text" name="" id="" />
                <button style={{width:'100%', color:'white', backgroundColor:'#607ADD', marginTop: 10, height:'50px'}}>Join an existing Chest group</button>
            </div>
        </div>
        <div style={{display:'flex', justifyContent:'center', textAlign:'center', margin:20}}>
            <div style={{width:'25%'}}>
                Or
                <Link to="/create">
                    <button style={{width:'100%', color:'black', backgroundColor:'#E6E8ED', marginTop: 10, height:'50px'}}>Create a Chest group</button>
                </Link>
            </div>
        </div>
    </div>
  )
}
