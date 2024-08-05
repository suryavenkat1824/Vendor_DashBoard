import React from 'react'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <>
    
       <div className='errorSection'>
      
        <h1>404</h1>
        <div>Page Not found</div>
        <Link to="/" style={{fontSize:'24px', color:'darkblue'}}>
        <p>Go Back</p>
        </Link>
    </div>
    </>
   
  )
}

export default NotFound