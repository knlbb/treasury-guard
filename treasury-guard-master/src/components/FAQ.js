import * as React from 'react';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import logoPNG from './Group3.png'
import { Link } from "react-router-dom";


export default function FAQ() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
        <Link to="/home">
            <div style={{justifyContent:'center', alignItems:'center', display:'flex', margin: 20}}>
                <img style={{height:30}} src={logoPNG} alt="" />
                <h1 className='text-xl text-black' style={{margin:0}}>TreasuryGuard</h1>
            </div>
        </Link>
        <div style={{justifyContent:'center', alignItems:'center', display:'flex', margin: 20}}>
            <h1 className='text-3xl font-bold m-12'>How can we help you?</h1>
        </div>
      <div style={{height: '100vh', margin:'10%', marginTop: 0}}>
        
        {/* <Home/> */}
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />} //CAN USE MY OWN ICON HERERERERERERERERERERERERERERERERERERERERERRE
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={expanded==='panel1' ? {backgroundColor:'rgb(0,159,227,0.04)'} : {backgroundColor:'rgb(0,0,0,0.04)'}}
        >
          <Typography sx={{ width: '5%',height:'50px', flexShrink: 0, color:'#607ADD'}}>
            01
          </Typography>

          <Typography sx={{color:'#001A4C'}}>What is a Chest in Treasury Guard Wallet?</Typography>
        </AccordionSummary>

        <AccordionDetails sx={{backgroundColor:'rgb(0,159,227,0.04)'}}>
          <Typography>
          A Chest refers to a shared fund managed by the smart wallet using account abstraction. It allows participants (app users) to pool their funds together for certain activities. Each participant has a spending limit based on their share in the Chest. Once created, the list of participants is fixed and cannot be altered.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />} //CAN USE MY OWN ICON HERERERERERERERERERERERERERERERERERERERERERRE
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={expanded==='panel2'  ? {backgroundColor:'rgb(0,159,227,0.04)'} : {backgroundColor:'rgb(0,0,0,0.04)'}}
        >
          <Typography sx={{ width: '5%', height:'50px',flexShrink: 0, color:'#607ADD' }}>
            02
          </Typography>

          <Typography sx={{color:'#001A4C'}} >Who are Participants in Treasury Guard Wallet?</Typography>
        </AccordionSummary>

        <AccordionDetails sx={{backgroundColor:'rgb(0,159,227,0.04)'}}>
          <Typography>
          Participants are app users who join a specific Chest to contribute funds for collective activities. They can deposit a certain amount, known as a share, into the Chest. The spending limit for each participant is equal to their share in the Chest. After earning yields or making withdrawals/deposits, the share value may change for each participant. 
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />} //CAN USE MY OWN ICON HERERERERERERERERERERERERERERERERERERERERERRE
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={expanded==='panel3'  ? {backgroundColor:'rgb(0,159,227,0.04)'} : {backgroundColor:'rgb(0,0,0,0.04)'}}
        >
          <Typography sx={{ width: '5%',height:'50px', flexShrink: 0, color:'#607ADD'}}>
            03
          </Typography>

          <Typography sx={{color:'##F7F9FB'}} >What is a Share in the context of the Treasury Guard Wallet?</Typography>
        </AccordionSummary>

        <AccordionDetails sx={{backgroundColor:'#F7F9FB'}}>
          <Typography>
          A Share represents the amount a participant deposits into the Chest for collective spending. The spending limit for each participant is set to the same value as their share. As the Chest generates yields or experiences fund movements, the share amount may fluctuate for each participant.           </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />} //CAN USE MY OWN ICON HERERERERERERERERERERERERERERERERERERERERERRE
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={expanded==='panel4'  ? {backgroundColor:'rgb(0,159,227,0.04)'} : {backgroundColor:'rgb(0,0,0,0.04)'}}
        >
          <Typography sx={{ width: '5%',height:'50px', flexShrink: 0, color:'#607ADD'}}>
            04
          </Typography>

          <Typography sx={{color:'##F7F9FB'}} >Rules for User Trading:</Typography>
        </AccordionSummary>

        <AccordionDetails sx={{backgroundColor:'#F7F9FB'}}>
          <Typography>
            <ol>
                <li>1. Participants are responsible for managing their spending within the defined spending limit, which is equal to their share in the Chest.</li>
                <li>2. Any transaction exceeding the spending limit will be rejected by the smart wallet.</li>
                <li>3. Participants cannot change the list of participants in a Chest after it has been created to ensure transparency and fairness.</li>
                <li>4. Participants can deposit additional funds or withdraw their share, but this may impact their spending limit.</li>
                <li>5. Yields generated by the Chest will be distributed proportionally among the participants based on their current share.</li>
                <li>6. The smart wallet will handle all transaction parsing and pricing using ERC 4337-based mechanisms to enforce spending limits.</li>
                <li>7. The Chest will operate on the Polygon zk-EVM network, providing faster and cost-efficient transactions.</li>
            </ol>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <div style={{justifyContent:'center', alignItems:'center', display:'flex', margin: 20}}>
          <h1>Need more help? Contact us: <a style={{color:'#9b78ff'}}>help@guard.com</a></h1>
        </div>
      </div>
    </div>
      
  );
}
