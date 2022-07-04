import React from 'react'
import './index.css'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
function ShowMessage({Show ,changeState,Text,color}) {
    Show && setTimeout(()=>{
     changeState(false)
    },4000)
  return (
    
    <div className={`ShowMessage  rounded w-25 bg-${color}`}  id={Show ? "SHOWIT" :"HIDDEN"}>
        <div className="show"  >
            <div className="icon">
            <CheckCircleOutlineIcon  color='success' ></CheckCircleOutlineIcon>
            </div>
            <div className="message">
              {Text}
            </div>
        </div>
    </div>
  )
}

export default ShowMessage