import React,{useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './index.css'
import ShowMessage from '../showMessage/ShowMessage'
function NewPasswordForm () {
 const [Show,SetMessage]=useState(false)
 const Navigate=useNavigate()
  const INITIAL_STATE = {
    password: '',
    passwordConfirmation: ''
  }

  const VALIDATION_SCHEMA = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    )
  })

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: async values => {
      try {
        const Changed = await axios.post('https://password-reset-webapp.herokuapp.com/Change', values)
        if(Changed.status===200){
          SetMessage(true)
          Navigate('/')
        }
      } catch (error) {
        console.log(error)
      }
    }
  })
  return (
    <div className=' container'>
      <div className='NewPassword mx-auto'>
        <div className="col-sm-12">
        <div className='title'>
          <h4>
            New <span> &nbsp;</span> Password
          </h4>
        </div>
        <div className='Body col-sm-12'>
          <div className='Form'>
            <form action='' onSubmit={formik.handleSubmit}>
              <div className='New my-4'>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='New Password'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.errors.password && formik.touched && (
                  <div className='error'>
                    <small className='text-danger'>
                      {' '}
                      {formik.errors.password}
                    </small>
                  </div>
                )}
              </div>
              <div className='Confirm my-4'>
                <input
                  type='password'
                  name='passwordConfirmation'
                  id='passwordConfirmation'
                  placeholder='Confirm Password'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirmation}
                />
                {formik.errors.passwordConfirmation && formik.touched && (
                  <div className='error'>
                    <small className='text-danger'>
                      {' '}
                      {formik.errors.passwordConfirmation}
                    </small>
                  </div>
                )}
              </div>
              <div className='button row'>
                <button className='btn btn-primary col-sm-12 col-md-8 mx-auto ' type='submit'>
                  <strong className='button'>Change</strong>
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
      <ShowMessage
        Show={Show}
        changeState={SetMessage}
        Text={'Pssword Changed Succes Fully'}
      ></ShowMessage>
    </div>
  )
}

export default NewPasswordForm
