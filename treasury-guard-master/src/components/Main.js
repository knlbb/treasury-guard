import React, { useState } from 'react'
import Copy from '../svg/CopySVG'
import Plus from '../svg/PlusSVG'
import Graph from './Graph'

import sortA from './shape.png'
import './Main.css'
import ethLogo from './eth.svg'

import wCon from './WalletConnect.svg'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { ReactComponent as Weth } from './weth.svg';
import WalletModal from './WalletModal';
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'


function createData(no, address, id, funds, percentage) {
  return { no, address, id, funds, percentage };
}

const rows = [
  createData('1', '0xfaf27B...0a7AE8B976a', 'dasr12', '24.2 wETH 2 ETH', '40%'),
  createData('2', '0xfaf27B...0a7AE8B976a', 'dasr12', '24.2 wETH 2 ETH', '40%'),
  createData('3', '0xfaf27B...0a7AE8B976a', 'dasr12', '24.2 wETH 2 ETH', '20%'),
];

export default function Main() {

  const [openModal, setOpenModal] = useState(false);
  const [openDeposit, setDeposit] = useState(false);
  const [openWithdraw, setWithdraw] = useState(false);

  const handleDeposit = () => {
    setDeposit(!openDeposit)
  }

  const handleWithdraw = () => {
    setWithdraw(!openWithdraw)
  }

  return (
    <div className='container' style={{overflowY:'scroll', height:'100vh', paddingBottom:'150px'}}>
      <WalletModal open={openModal} closeModal={setOpenModal}/>

      <DepositModal open={openDeposit} closeModal={setDeposit}/>

      <WithdrawModal open={openWithdraw} closeModal={setWithdraw}/>

      <div style={{marginTop: 30, position:'relative', display: 'flex'}}>
          <div style={{}}>
            <h1 className='text-sm font-bold mb-4'>Chest Address</h1>
            <div style={{display:'flex'}}>
              <h2 className='text-xl font-bold' style={{margin:0}}>0x987...7621</h2>
              <button style={{marginLeft: 10, border: 'none', backgroundColor: 'transparent', cursor: 'pointer'}}>
                  <Copy className="address" />
              </button>
            </div>
          </div>
          <div style={{position:'absolute', right: 20, bottom: 20}}>
            <div style={{display: 'flex', gap: 20}}>
              <button onClick={() => setOpenModal(!openModal)} className="wconn" style={{borderRadius: '4px', cursor:'pointer', display: 'flex', gap:5, padding: '8px 16px', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--text-secondary, rgba(0, 26, 76, 0.60))'}}>
                  {/* <Plus/> */}
                  <img src={wCon} alt="" />
                  WalletConnect
              </button>

              <button onClick={handleDeposit} className="wconn" style={{borderRadius: '4px', cursor:'pointer', display: 'flex', gap:5, padding: '8px 16px', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--text-secondary, rgba(0, 26, 76, 0.60))'}}>
                  Deposit
              </button>
              <button onClick={handleWithdraw} className="wconn" style={{borderRadius: '4px', cursor:'pointer', display: 'flex', gap:5, padding: '8px 16px', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--text-secondary, rgba(0, 26, 76, 0.60))'}}>
                  Withdraw
              </button>
            </div>
          </div>
      </div>

      <div style={{display:'flex',marginTop: 20, gap: 20}}>
        <div style={{backgroundColor:'#F7F9FB', width:'50%', borderRadius: 5, padding:12, position:'relative'}}>
          <div style={{display:'flex', width:'100%', padding:12, alignItems:'center'}}>
            <h3 className='text-lg font-bold'>Weekly Team Balance Chart</h3>
            <div style={{display:'flex', right: 20, position:'absolute'}}>
              {/* <button style={{borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px', borderRight: 'none',cursor:'pointer', display: 'flex', gap:5, padding: '8px 16px', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--text-secondary, rgba(0, 26, 76, 0.60))', color: 'white', backgroundColor:'blue'}}>
                  Team Balance
              </button>
              <button style={{borderTopRightRadius: '4px', borderBottomRightRadius: '4px', cursor:'pointer', display: 'flex', gap:5, padding: '8px 16px', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--text-secondary, rgba(0, 26, 76, 0.60))', backgroundColor:'transparent'}}>
                  Your Share
              </button> */}
            </div>
          </div>

          <div style={{display:'flex', borderBottom: '1px solid gray'}}>
            {/* <button style={{borderBottom: '2px solid black', borderLeft:'none',borderTop:'none',borderRight:'none',cursor:'pointer', display: 'flex', gap:5, padding: '8px 16px', justifyContent: 'center', alignItems: 'center', backgroundColor:'transparent'}}>
                Weekly
            </button> */}
            {/* <button style={{borderBottom: 'none', borderLeft:'none',borderTop:'none',borderRight:'none',cursor:'pointer', display: 'flex', gap:5, padding: '8px 16px', justifyContent: 'center', alignItems: 'center', backgroundColor:'transparent'}}>
                Monthly
            </button>
            <button style={{borderBottom: 'none', borderLeft:'none',borderTop:'none',borderRight:'none',cursor:'pointer', display: 'flex', gap:5, padding: '8px 16px', justifyContent: 'center', alignItems: 'center', backgroundColor:'transparent'}}>
                3 Months
            </button> */}
          </div>

          <Graph/>
        </div>
        <div style={{backgroundColor:'#F7F9FB', width:'50%', borderRadius: 5, padding:12, position: 'relative'}}>
          <div style={{display:'flex', width:'100%', padding: 12, alignItems:'center'}}>
            <h3 className='text-lg font-bold'>Asset Allocation</h3>
            <div style={{display:'flex', right: 20, position:'absolute'}}>
              <button style={{borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px', borderRight: 'none',cursor:'pointer', display: 'flex', gap:5, padding: '8px 16px', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--text-secondary, rgba(0, 26, 76, 0.60))', backgroundColor:'transparent'}}>
                  <img style={{height: 12}} src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_list_48px-512.png" alt="" />
              </button>
              <button style={{borderTopRightRadius: '4px', borderBottomRightRadius: '4px', cursor:'pointer', display: 'flex', gap:5, padding: '8px 16px', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--text-secondary, rgba(0, 26, 76, 0.60))', backgroundColor:'transparent'}}>
                <img style={{height: 12}} src="https://cdn.iconscout.com/icon/free/png-256/free-circle-dashed-3601581-3003151.png" alt="" />
              </button>
            </div>
          </div>
          
          <div style={{ padding:10, height:'80%'}}>
            <button style={{width:'100%', textAlign:'left', height:'40%', alignItems:'center', borderBottom: '1px solid grey'}}>
              <div>
                <div style={{display:'flex', alignItems:'center', gap: 5,  height: '10px'}}>
                  <Weth/>
                  <h5 style={{margin:0}}>wETH</h5>
                  <h5 style={{color:'gray', margin:0, fontSize: '12px'}}>Wrapped ETH</h5>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ml-5" style={{width:'40%', right:90, position:'absolute'}}>
                    <div className=" h-2.5 rounded-full" style={{width: '70%', backgroundColor:'#ec1c79'}}></div>
                  </div>
                  <h3 style={{right:20,margin:0, position:'absolute'}}>70%</h3>
                </div>
                <div style={{display:'flex', alignItems:'center', width:'100%'}}>
                  <h2 className='font-bold text-sm mt-5'>154.28800 wETH</h2>
                  <h2 className='text-sm mt-5' style={{position:'absolute', right:20, color:'#76808F'}}>$152,000</h2>
                </div>
              </div>
            </button>

            <button style={{width:'100%', textAlign:'left', paddingTop: 20,height:'50%', alignItems:'center', borderBottom: '1px solid grey'}}>
              <div>
                <div style={{display:'flex', alignItems:'center', gap: 5,  height: '10px'}}>
                  {/* <Weth/> */}
                  <img src={ethLogo} alt="" />
                  <h5 style={{margin:0}}>ETH</h5>
                  <h5 style={{color:'gray',margin:0, fontSize: '12px'}}>Ethereum</h5>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ml-5" style={{width:'40%', right:90, position:'absolute'}}>
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '30%'}}></div>
                  </div>
                  <h3 style={{right:20, margin:0, position:'absolute'}}>30%</h3>
                </div>
                <div style={{display:'flex', alignItems:'center', width:'100%'}}>
                  <h2 className='font-bold text-sm mt-5'>51.11100  ETH</h2>
                  <h2 className='text-sm mt-5' style={{position:'absolute', right:20, color:'#76808F'}}>$152,000</h2>
                </div>
              </div>
            </button>

            {/* <button style={{width:'100%', textAlign:'left', height:'40%', alignItems:'center'}}>
              <div>
                <div style={{display:'flex', alignItems:'center', gap: 5,  height: '10px'}}>
                  <Weth/>
                  <h5 style={{margin:0}}>wETH</h5>
                  <h5 style={{color:'gray', margin:0, fontSize: '12px'}}>Wrapped ETH</h5>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ml-5" style={{width:'40%'}}>
                    <div className="bg-red-600 h-2.5 rounded-full" style={{width: '30%'}}></div>
                  </div>
                  <h3 style={{right:20, margin:0, position:'absolute'}}>30%</h3>
                </div>
                <div style={{display:'flex', alignItems:'center', width:'100%'}}>
                  <h2 className='font-bold text-sm mt-5'>154.28800 wETH</h2>
                  <h2 className='text-sm mt-5' style={{position:'absolute', right:20, color:'#76808F'}}>$152,000</h2>
                </div>
              </div>
            </button> */}
          </div>
        </div>

      </div>
      <div style={{backgroundColor:'#F7F9FB', marginTop: 20, padding: 12, borderRadius: 5}}>
        <div style={{width:'100%', padding: 12, alignItems:'center'}}>
            <h3 className='text-lg font-bold mb-5'>Participants List</h3>
            <div style={{}}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>No.</TableCell>
                      <TableCell align="right">Wallet Address</TableCell>
                      <TableCell align="right">ID</TableCell>
                      <TableCell align="right">Funds</TableCell>
                      <TableCell align="right">Share Percentage <button>
                          <img style={{height: 10, width: 10}} src={sortA} alt="" />
                        </button> </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.no}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.no}
                        </TableCell>
                        <TableCell align="right">{row.address}</TableCell>
                        <TableCell align="right">{row.id}</TableCell>
                        <TableCell align="right">{row.funds}</TableCell>
                        <TableCell align="right">{row.percentage}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
      </div>

    </div>

  )
}
