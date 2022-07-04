import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../../home'
import Login from '../login'
import NewPasswordForm from '../NewPassword/NewPasswoed'
import Otp_Verification from '../OtpVerification'
import RegisterForm from '../Register/RegusterForm'
import ResetPassword from '../ResetPassword/resetPaaword'
function RouterConfig() {
  return (
  <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path='/otp' element={<Otp_Verification/>} ></Route>
      <Route path='/reset' element={<ResetPassword/>}/>
      <Route path='/register' element={<RegisterForm/>}/>
      <Route path='/new-password' element={<NewPasswordForm></NewPasswordForm>} ></Route>
      <Route path='/home' element={<Home/>} />
  </Routes>
  )
}

export default RouterConfig