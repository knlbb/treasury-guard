import React from 'react'
import { Link } from 'react-router-dom'
import logoPNG from './Group3.png'
import Plus from '../svg/PlusSVG'
import deletePng from './delete_outline.png'


export default function CreateChest() {
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
                <button style={{borderRadius: '4px', cursor:'pointer', display: 'flex', gap:5, padding: '8px 16px', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--text-secondary, rgba(0, 26, 76, 0.60))', backgroundColor:'transparent'}}>
                0xE3ea...0049
                </button>
            </div>
        </div>

        <div style={{display:'flex', justifyContent:'center', margin:20}}>
            <h1 className='text-2xl font-bold'>Invite participants to your chest</h1>
        </div>
        <div style={{display:'flex', justifyContent:'center', margin:20}}>
            <div style={{width:'25%'}}>
                <button style={{borderRadius: '4px', cursor:'pointer', display: 'flex', gap:5, padding: '8px 16px', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--text-secondary, rgba(0, 26, 76, 0.60))', backgroundColor:'transparent'}}>
                    <Plus/>
                    Invite participant
                </button>
                {/* <button style={{width:'20%', right:'0', backgroundColor:'red', marginTop: 10, height:'50px'}}>Invite participant</button> */}
            </div>
        </div>
        <div style={{display:'flex', justifyContent:'center', margin:20}}>
            <div style={{width:'25%'}}>
                Participant Wallet Address
                <div style={{display:'flex', gap: 10}}>
                    <input placeholder='Input Wallet Address' style={{width:'70%', height:'50px'}} type="text" name="" id="" />
                    
                    <button style={{width:'30%', border:'1px solid black', borderRadius:4, height:'50px'}}>Send</button>
                    <button>
                        <img src={deletePng} alt="" />
                    </button>
                </div>
            </div>
        </div>
        <div style={{display:'flex', justifyContent:'center', margin:20}}>
            <div style={{width:'25%'}}>
                Participant Wallet Address
                <div style={{display:'flex', gap:10}}>
                    <input placeholder='Input Wallet Address'  style={{width:'70%', height:'50px'}} type="text" name="" id="" />
                    
                    <button style={{width:'30%', border:'1px solid black', borderRadius:4, height:'50px'}}>Send</button>
                    <button>
                        <img src={deletePng} alt="" />
                    </button>
                </div>
            </div>
        </div>
        <div style={{display:'flex', justifyContent:'center', margin:20}}>
            <div style={{width:'25%'}}>
                <Link to="/home">
                    <button style={{width:'100%', color:'white', backgroundColor:'#607ADD', marginTop: 10, height:'50px'}}>Create new chest group</button>

                    {/* <button style={{width:'100%', backgroundColor:'red', marginTop: 10, height:'50px'}}>Create new chest group</button> */}
                </Link>
            </div>
        </div>
    </div>
  )
}
