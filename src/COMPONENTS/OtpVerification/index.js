import React, {useState} from 'react'
import './index.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import ShowMessage from '../showMessage/ShowMessage'
const Otp_Verification = (props) => {
    const Navigate = useNavigate()
    const [Otp, SetOtp] = useState()
    const [change, setChange] = useState(true)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const Verify_Otp=async()=>{
        try {
            const res = await axios.post('http://localhost:5000/verification', {
                OtpString: Otp,
                email:localStorage.getItem('email')
            })
            if(res.status==200){
                setMessage(res.data.message)
                Navigate('/new-password')

            }
        } catch (error) {
            console.log(error);
            setError(error.response.data.message)
        }
    }
    return ( 
    <div className ='otp' >
        <h3 className='text-success' > OTP Verification </h3>  
        <div className='otp-form' >
        <input type={"text"}onChange = { (e) => SetOtp(e.target.value)}
        placeholder="enter Otp"
        className='form-control'/>
        <div className='mt-2' >
        <button className='btn btn-primary'onClick = {(e) => {
              e.preventDefault()
                Verify_Otp()
            }
        } 
        > Verify 
        </button>
        <p className='text-danger'>link expires after 8 minutes</p>  
        </div > 
        </div>   
        {message && <ShowMessage 
        color = "success"
        Text = {message}
        changeState = {setChange}
        Show = {change} 
        > 
        </ShowMessage>} 
        {error && <ShowMessage 
        color = "danger"
        Text = {error}
        changeState = {setChange}
        Show = {change} 
        > </ShowMessage>
        } 
    </div>

    )
}

export default Otp_Verification;