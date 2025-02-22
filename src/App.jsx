import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import FamilyHome from './components/FamilyHome';
import ElderHome from './components/ElderHome';
import Chat from './components/Chat';
import FamilyTasks from './components/FamilyTasks';
import ElderTasks from './components/ElderTasks';
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
          <Route path='/family-home' element={<FamilyHome username={username} userType={userType} setUserType={setUserType} />} />
          <Route path='/chat' element={<Chat username={username} userType={userType}/>} />
          <Route path='/family-task' element={< FamilyTasks userType={userType} username= {username}/>}></Route>
          <Route path='/elder-task' element={<ElderTasks userType={userType} username={username}/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;