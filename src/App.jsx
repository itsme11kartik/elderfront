import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import FamilyHome from './components/FamilyHome';
import ElderHome from './components/ElderHome';
import Chat from './components/Chat';
import FamilyTasks from './components/FamilyTasks';
import ElderTasks from './components/ElderTasks';
import CommunityForum from './components/CommunityForum';

function App() {
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [userType, setUserType] = useState(localStorage.getItem("userType") || "");

    useEffect(() => {
        // Load stored user details on refresh
        const storedUsername = localStorage.getItem("username");
        const storedUserType = localStorage.getItem("userType");

        if (storedUsername && storedUserType) {
            setUsername(storedUsername);
            setUserType(storedUserType);
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Signup />} />
                <Route path='/login' element={<Login setUsername={setUsername} setUserType={setUserType} />} />
                <Route path='/elder-home' element={userType ? <ElderHome username={username} userType={userType} /> : <Navigate to="/login" />} />
                <Route path='/family-home' element={userType ? <FamilyHome username={username} userType={userType} /> : <Navigate to="/login" />} />
                <Route path='/chat' element={userType ? <Chat username={username} userType={userType}/> : <Navigate to="/login" />} />
                <Route path='/family-task' element={userType ? <FamilyTasks userType={userType} username={username}/> : <Navigate to="/login" />} />
                <Route path='/elder-task' element={userType ? <ElderTasks userType={userType} username={username}/> : <Navigate to="/login" />} />
                <Route path='/forum' element={userType ? <CommunityForum userType={userType} username={username}/> : <Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
