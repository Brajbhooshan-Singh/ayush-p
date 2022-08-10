import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(5);

    useEffect(()=>{
        localStorage.setItem("lastPath", window.location.pathname);
        navigate('/login')
    },[])
  return (
    <div className='container p-5 text-center'>
        <p>Redirecting you to {count} seconds.</p>
    </div>
  )
}

export default LoadingToRedirect