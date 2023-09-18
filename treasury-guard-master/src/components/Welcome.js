import React from 'react'
import Logo from '../svg/LogoSVG'
import { Link, useNavigate } from 'react-router-dom'
import logoPNG from './Group3.png'

import twitter from './Logo_of_Twitter.png'
import google from './Google.png'
import metamask from './metamask.png'
import walletcon from './WalletConnect.svg'

function setWallet(accounts: any) {
  console.log(accounts);

}




export default function Welcome() {
  const navigate = useNavigate();
  const updateWallet = async (accounts:any) => {     
      setWallet({ accounts })   
      navigate('home')                      
  }   

  const metamaskEnabled = typeof window.ethereum !== "undefined";

  const handleConnect = async () => {           
      console.log("handle connect");     
      let accounts = await window.ethereum.request({   
        method: "eth_requestAccounts",                 
      })                                               
      updateWallet(accounts)                           
  }  
  return (
    <div style={{width: '100%', textAlign: 'center'}}>
        <Link to="/home">
            <div style={{justifyContent:'center', alignItems:'center', display:'flex', margin: 20}}>
                <img style={{height:30}} src={logoPNG} alt="" />
                <h1 className='text-xl text-black' style={{margin:0}}>TreasuryGuard</h1>
            </div>
        </Link>
        <h1 className='text-2xl font-bold mb-5'>Welcome to Treasury Guard - The Treasury Management Wallet</h1>

        <h1 className='text-sm mb-10' style={{color:'#607ADD'}}>
          Create an account
        </h1>
        <div style={{ alignItems:'center',  display:'flex', textAlign:'center', justifyContent:'center'}}>
          <div style={{textAlign:'left'}}>
            <h1 className='text-xs'>Email</h1>
            <input style={{width:'100%'}} type="text" name="" id="" />
            <Link to="/join">
              <button style={{width:'100%', color:'white', backgroundColor:'#607ADD', marginTop: 10, height:'50px'}}>Connect with email</button>
            </Link>
            <button style={{ backgroundColor:'#E6E8ED', padding:'11px 24px', 
              display: 'flex',
              gap: 6,
              width: '340px',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10, height:'50px'}}>
              <img src={twitter} alt="" />
              Connect with Twitter
              </button>
              
              <button style={{ backgroundColor:'#E6E8ED', padding:'11px 24px', 
              display: 'flex',
              gap: 6,
              width: '340px',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10, height:'50px'}}>
              <img src={google} alt="" />
              Connect with Google
              </button>
          </div>
        </div>

        <div style={{ alignItems:'center', marginTop:50, display:'flex', textAlign:'center', justifyContent:'center'}}>
          <div>
            <h1 className='text-sm mb-10' style={{color:'#607ADD'}}>
              External Wallet
            </h1>
            <button onClick={handleConnect} style={{ backgroundColor:'#E6E8ED', padding:'11px 24px', 
              display: 'flex',
              gap: 6,
              width: '340px',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10, height:'50px'}}>
              <img src={metamask} alt="" />
              Connect with Metamask
              </button>            
              
              <button style={{ backgroundColor:'#E6E8ED', padding:'11px 24px', 
              display: 'flex',
              gap: 6,
              width: '340px',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10, height:'50px'}}>
              <img src={walletcon} alt="" />
              Connect with WalletConnect
              </button>          
          </div>
        </div>
    </div>
  )
}
