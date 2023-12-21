import { Img } from 'react-image'
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios'

import Logo from '../../assets/logo.png'
import MailIcon from '../../assets/icon-email.png'
import LockIcon from '../../assets/icon-lock.png'

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem('token')
    if (auth) {
      navigate("/")
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:6969/api/login', { email, password, })
      const responses = await response.data;
      if (responses) {
        const token = response.data.data;
        // console.log(token);
        localStorage.setItem('token', token);
        window.location.reload('/');
        navigate('/');
      } else {
        console.log("see the response", response);
      }

    } catch (error) {
      console.log('Login error : ', error)
      toast.error('Kuch toh garbar hai daya !', {
        position: 'top-center',
        autoClose: 500, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }


  return (
    <div className='mx-auto h-screen bg-gray-950'>
      <div className='py-80 w-80 mx-auto h-screen text-center justify-center items-center'>
      <Link to={'/'}>
        <Img className="h-14 mb-4" src={Logo} alt="Cart icon" />
      </Link>
        <div className='mb-5 flex h-14'>
          <Img className='p-2 h-full bg-gray-800 border-y border-l border-gray-500 rounded-s' src={MailIcon} />
          <input className='h-14 px-4 w-80 text-gray-400 border-y border-r border-gray-500 bg-gray-700 rounded-e outline-none' type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-9 flex h-14'>
          <Img className='p-2 h-full bg-gray-800 border-y border-l border-gray-500 rounded-s' src={LockIcon} />
          <input className='h-14 px-4 w-80 text-gray-400 border-y border-r border-gray-500 bg-gray-700 rounded-e outline-none' type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <Link className="px-20 py-4 text-white bg-[#ff523b] hover:bg-[#ff3b3b] rounded-md transition-all duration-150" onClick={handleSubmit}>Login</Link>
        <p className='mt-8 text-gray-400'>Not a member? <Link to= '/signup' className='text-white'>Sign up now -&gt;</Link></p>
      </div>
    </div>
  )
}

export default LoginForm
