import {Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Signup from './pages/Signup';
import axios from 'axios'
import Otp from './pages/Otp';
import Login from './pages/Login';
import AdminLog from './pages/Admin/AdminLog';
import EmailPage from './pages/EmailPage';


function App() {
  
  axios.defaults.baseURL='http://localhost:4000';
  axios.defaults.withCredentials=true;

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/signup/otp' element={<Otp/>} ></Route>
      <Route path='/signup/otp/verify' element={<EmailPage/>}></Route>
      <Route path='/login' element={<Login/>} ></Route>
      <Route path='/admin/login' element={<AdminLog/>}></Route>
    
    </Routes>
    </>
  )
}

export default App
