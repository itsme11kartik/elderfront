import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './components/Signup'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './components/Login'
import FamilyHome from './components/FamilyHome'
import ElderHome from './components/ElderHome'
import Chat from './components/Chat'
function App() {
  const [username, setUsername] = useState(""); 
  // useEffect(()=>{
  //   FetchTask()
  // },{});

  return (
    <BrowserRouter>
     
        <div>
          <Routes>
            <Route path='/' element={<Signup/> } ></Route>
            <Route path='/login' element={<Login setUsername={setUsername}/> }></Route>
            <Route path='/elder-home' element={<ElderHome username={username}/>}></Route>
            <Route path='/family-home' element={<FamilyHome/>}></Route>
            <Route path='/chat' element={<Chat username={username}/>}></Route>
          </Routes>
        </div>
      
    </BrowserRouter>
  )
}

export default App
