import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import FamilyHome from './components/FamilyHome';
import ElderHome from './components/ElderHome';
import Chat from './components/Chat';

function App() {
  const [username, setUsername] = useState(""); 
  const [userType, setUserType] = useState("");

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login setUsername={setUsername} setUserType={setUserType} />} />
          <Route path='/elder-home' element={<ElderHome username={username} userType={userType} />} />
          <Route path='/family-home' element={<FamilyHome userType={userType} setUserType={setUserType} />} />
          <Route path='/chat' element={<Chat username={username} userType={userType}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;