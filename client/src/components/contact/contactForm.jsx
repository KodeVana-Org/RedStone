import axios from "axios"
import { useState } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';

function ContactForm() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      console.log(name, email, message)
      const response = await axios.post('http://localhost:6969/api/contact', { name, email, message, })
      const responses = await response.data;
      if (responses) {
        toast.success('Messege send ho gya ji!', {
          position: 'top-center',
          autoClose: 1500,
        })
        // window.location.reload('/contact');
        navigate('/')
      } else {
        console.log("see the response", response);
      }

    } catch (error) {
      console.log('Login error : ', error)
    
  }
}

  return (
    <div className="mx-96 py-20 justify-center">
      <div className="mb-9 grid grid-cols-2 gap-7">
        <div className="">
          <form className="" action="">
            <input className="mb-7 w-full px-6 py-3 border border-[#ff523b] rounded-md outline-none" type="text" placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)}/>
            <input className="mb-7 w-full px-6 py-3 border border-[#ff523b] rounded-md outline-none" type="text" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)}/>
            <textarea className="mb-7 w-full px-6 py-3 border border-[#ff523b] rounded-md outline-none" name="message" cols="30" rows="10" placeholder="Enter your message" onChange={(e) => setMessage(e.target.value)}/>
            <button className="px-5 py-2 text-[#ff523b] hover:text-white font-medium bg-white border hover:bg-[#ff523b] border-[#ff523b] rounded-md outline-none transition-all duration-300" type="submit" onClick={handleSubmit} >Send</button>
          </form>
        </div>
        <div>
          <p className="mb-7 text-sm text-gray-600">A cheerful welcome to the RedStore contact hub! We&lsquo;re thrilled that you&lsquo;ve chosen to connect with us. At RedStore, we believe in creating a community where your questions, feedback, and inquiries are not just heard but valued.</p>
          <p className="mb-7 text-sm text-gray-600">A cheerful welcome to the RedStore contact hub! We&lsquo;re thrilled that you&lsquo;ve chosen to connect with us. At RedStore, we believe in creating a community where your questions, feedback, and inquiries are not just heard but valued.</p>
          <p className="mb-7 text-sm text-gray-600">Whether you&lsquo;re seeking style advice, tracking an order, or just want to share your thoughts, our team is here and ready to assist you. Your satisfaction is our top priority, and we&lsquo;re dedicated to making your experience with RedStore as enjoyable and seamless as possible.</p>
          <p className="mb-7 text-sm text-gray-600">Feel free to drop us a line using the contact form below, shoot us an email, or give us a ring. We can&lsquo;t wait to engage with you and make your RedStore journey exceptional.</p>
        </div>
      </div>
      <p className="mb-7 text-sm text-center text-gray-600">Thank you for choosing RedStore - where your fashion desires meet unparalleled service.</p>
    </div>
  )
}

export default ContactForm