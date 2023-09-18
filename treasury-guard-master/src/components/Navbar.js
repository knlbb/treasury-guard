import React, { useState } from 'react'
import Main from './Main'
import Logo from '../svg/LogoSVG'
import Plus from '../svg/PlusSVG'
import './Navbar.css'
import Notification from '../svg/NotificationSVG'




export default function Navbar() {
    const [showNot, setShowNot] = useState(true);

  return (
    <div style={{width: '90%', alignItems:'center', position:'relative', padding: '12px 24px', minHeight:'50px', height: '10%', borderBottom: '1px solid var(--black-10, rgba(28, 28, 28, 0.10))'}}>
        <div style={{display: 'flex', alignItems: 'center', height:'100%', marginBottom: 25, position:'relative'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Logo/>
                <p className="text-md font-bold" style={{marginLeft: 10, fontFamily:'Squada One', fontStyle: 'normal'}}>Treasury Guard</p>
            </div>
            
            <div style={{right: 0, position: 'absolute', alignItems:'center', gap: 5, display:'flex'}}>
                <label>
                    <input placeholder="Search" style={{borderRadius: '4px', display: 'flex', gap:5, justifyContent: 'center', alignItems: 'center', backgroundColor:'transparent'}}>
                    </input>
                </label>

                <button onClick={() => setShowNot(!showNot)} style={{border:'none', backgroundColor:'transparent', cursor:'pointer'}}>
                    <Notification/>
                </button>

                <button style={{borderRadius: '4px', cursor:'pointer', display: 'flex', gap:5, padding: '8px 16px', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--text-secondary, rgba(0, 26, 76, 0.60))', backgroundColor:'transparent'}}>
                    Invite
                    <Plus/>
                </button>
            </div>

        </div>



        {showNot && 
        <div>
        <div id="toast-top-right" class="fixed flex items-center w-full max-w-xs p-4 space-x-4 z-40 text-gray-500 bg-gray-100 divide-x divide-gray-200  rounded-lg shadow top-15 right-[20%] dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
            <svg class="w-5 h-10 text-blue-600 dark:text-blue-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
            </svg>
            <div class="pl-4 text-sm  font-normal">You have a new joinee request</div>
        </div>
            </div>
        }


        <Main/>



    </div>

  )
}
