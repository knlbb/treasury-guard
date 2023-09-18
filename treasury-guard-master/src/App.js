import './App.css';
import Home from './components/Home'
import Welcome from './components/Welcome';
import {Routes, Route } from "react-router-dom";
import FAQ from './components/FAQ';
import JoinAccount from './components/JoinAccount';
import CreateChest from './components/CreateChest';

function App() {
  return (
    <>
      <div style={{height: '100vh'}}>
      <Routes>
          <Route path="/" element={<Welcome />}/>
          <Route path="/join" element={<JoinAccount />}/>
          <Route path="/create" element={<CreateChest />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/faq" element={<FAQ />} />
      </Routes>
      </div>

      
    </>

  );
}

export default App;
