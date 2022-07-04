import React,{useState} from 'react'
import './index.css'
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom'
import {useFormik} from "formik";
import axios from 'axios';
import ShowMessage from '../showMessage/ShowMessage';
const INITIAL_STATE={
    email:"",
    password:""
}
const VALIDATION_SCHEMA=Yup.object().shape({
    email:Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
    password:Yup.string().required("Password is Required")
})
function RegisterForm () {
  const [Show,SetMessage]=useState(false)
  const [success,setSuccess]=useState("")
  const [error,setError]=useState("")
  const Navigate=useNavigate()
    const formik=useFormik({
       initialValues:INITIAL_STATE,
       validationSchema:VALIDATION_SCHEMA,
        onSubmit:async values=>{
          try{
            const res= await axios.post('https://password-reset-webapp.herokuapp.com/register',values)
            console.log(res.data);
            if(res.status==200){
              SetMessage(true)
              setSuccess(res.data.message)
              Navigate('/')
            }
          }
          catch (error){
            console.log(error);
            SetMessage(true)
            setError(error.response.data.message)
          }
        
       }
    })
  return (
    <div className=' container '>
      <div className='Register-Form mx-auto  row '>
        <div className="col-sm-12">
        <div className='Header text-solid my-2'>
          <h4>
            Register <span> &nbsp;</span> Form
          </h4>
        </div>
        <div className='RegisterBody'>
          <div className='form my-4'>
            <form action='' onSubmit={formik.handleSubmit}>
              <div className='email'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Enter Email'
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  autoComplete="false"
                />
                {formik.errors.email && formik.touched && (
                <div>
                  <small className='text-danger'> {formik.errors.email}</small>
                </div>
              )}
              </div>
              <div className='password my-4'>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Enter password'
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  autoComplete="false"
                />
                {formik.errors.password && formik.touched && (
                <div>
                  <small className='text-danger'> {formik.errors.password}</small>
                </div>
              )}
              </div>
              <div className="submit">
                  <button type='submit' className='bg-primary'><strong>Register</strong></button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
      {success && <ShowMessage Show={Show} changeState={SetMessage} color={"success"} Text={success}></ShowMessage>}
      {error && <ShowMessage Show={Show} changeState={SetMessage} color={"danger"} Text={error}></ShowMessage>}
    </div>
  )
}

export default RegisterForm
