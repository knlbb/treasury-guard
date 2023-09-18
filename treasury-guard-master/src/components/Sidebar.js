import React from 'react'
import Copy from '../svg/CopySVG'
import Dashboard from '../svg/DashboardSVG'
import Help from '../svg/HelpSVG'
import LogOut from '../svg/LogOutSVG'
import './Sidebar.css'
import { Link } from "react-router-dom";


export default function Sidebar() {
  return (
    <div style={{ width: '1%', minWidth: '200px', height: '100%', padding: '20px 16px',borderRight: '1px solid var(--black-10, rgba(28, 28, 28, 0.10))'}}>
        <div style={{display: 'flex'}}>
            <img style={{height: 30, width: 30, borderRadius: '50%', backgroundColor: '#808CA5'}} src="https://s3-alpha-sig.figma.com/img/0da2/7f3d/6f1edb587f362eb0c667d594b041111a?Expires=1690761600&Signature=KQAldEoEYj6MIHI~ZJTnlGQaBrgYT0rb1pHnC94c6q9UQBkIPfRMEnpR0BNuU5HXs5yPk99gXyOozykdazo~8GQjcdA27rQkyDDO~vWl6QRiifh65~Y6l5cCR9kHHa8J2ym7e8C41JyFEKmxZfbuvmIS8Cb2iV1XzBe54uZMoygDnXCSqh1w5dN532iOeodOZvugHGMiYr8GCbniYK2fN4ya3BRqhin7bvasVIjeLQ76MTKlFkm3Qif3Vb5m3BoALzuyl218zdQV6vnsVv-zh-YMCmj~ks3jdsSpFeS3K7XUEerwz~WhyebJEBXSTkx6JtdEevc5pMVlaFyGvCKPSw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" />
            <div style={{marginLeft: 10}}>
                <h3 className="userName" style={{margin: 0}}>LinaDes0921</h3>
                <div style={{display: 'flex'}}>
                    <p style={{margin: 0}} className="userAddress">oxE3e...0049</p>
                    <button style={{marginLeft: 10, border: 'none', backgroundColor: 'transparent', cursor: 'pointer'}}>
                        <Copy className="red-heart" />
                    </button>
                </div>
            </div>
        </div>
        <div style={{marginTop: 20}}>
            <button className="dashBut" style={{width: '100%', gap:15, cursor: 'pointer', padding: '12px', height: '50px', display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 600, textAlign: 'center'}}>
                <Dashboard/>
                Dashboard
            </button>
            <Link to="/faq">
            <button className="dashBut" style={{width: '100%', gap:15, cursor: 'pointer', padding: '12px', height: '50px', display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 600, textAlign: 'center'}}>
                <Help/>
                Help Centre
            </button></Link>
            <Link to="/">
            <button className="dashBut" style={{width: '100%', gap:15, cursor: 'pointer', padding: '12px', height: '50px', display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 600, textAlign: 'center'}}>
                <LogOut/>
                Log Out
            </button>
            </Link>
        </div>
    </div>
  )
}
