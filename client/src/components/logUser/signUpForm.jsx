import { Img } from 'react-image'
import { Link } from "react-router-dom"

import UserIcon from '../../assets/icon-user.png'
import MailIcon from '../../assets/icon-email.png'
import LockIcon from '../../assets/icon-lock.png'

function SignUpForm() {
  return (
    <div className='mx-auto h-screen bg-gray-950'>
      <div className='py-80 w-80 mx-auto h-screen text-center justify-center items-center'>
        <div className='mb-5 flex h-14'>
          <Img className='p-2 h-full bg-gray-800 border-y border-l border-gray-500 rounded-s' src={UserIcon} />
          <input className='h-14 px-4 w-80 text-gray-400 border-y border-r border-gray-500 bg-gray-700 rounded-e outline-none' type="text" placeholder='Name' />
        </div>
        <div className='mb-5 flex h-14'>
          <Img className='p-2 h-full bg-gray-800 border-y border-l border-gray-500 rounded-s' src={MailIcon} />
          <input className='h-14 px-4 w-80 text-gray-400 border-y border-r border-gray-500 bg-gray-700 rounded-e outline-none' type="text" placeholder='Email' />
        </div>
        <div className='mb-9 flex h-14'>
          <Img className='p-2 h-full bg-gray-800 border-y border-l border-gray-500 rounded-s' src={LockIcon} />
          <input className='h-14 px-4 w-80 text-gray-400 border-y border-r border-gray-500 bg-gray-700 rounded-e outline-none' type="text" placeholder='Password' />
        </div>
        <Link className="px-20 py-4 text-white bg-[#ff523b] hover:bg-[#ff3b3b] rounded-md transition-all duration-150">Signup</Link>
        <p className='mt-8 text-gray-400'>Already a member? <button className='text-white'>Login now -&gt;</button></p>
      </div>
    </div>
  )
}

export default SignUpForm
