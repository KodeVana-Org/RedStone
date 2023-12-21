import { Img } from "react-image"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import ProductsData from '../../assets/product'
import UserDp from '../../assets/icon-user.png'

function Profile() {

  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem('token')
    if (!auth) {
      navigate('/login')
      alert('login first')
    }
  })

  return (
    <div className="mx-96 my-16">
      <div className="mb-10 grid grid-cols-2 gap-16">
        <div className="mb-7 flex gap-7 items-center justify-center">
          <Img className="h-14" src={UserDp} />
          <span>
            <p className="text-lg font-medium">John William</p>
            <p className="text-sm text-gray-600">Age: 23</p>
          </span>
        </div>
        <div className="">
          <span className="mb-3 flex gap-2 px-3 py-2 shadow-inner bg-gray-50 border rounded-md">
            <p className="text-sm text-gray-600">Email:</p>
            <p className="text-sm text-gray-600">johnwilliam@gmail.com</p>
          </span>
          <span className="mb-3 flex gap-2 px-3 py-2 shadow-inner bg-gray-50 border rounded-md">
            <p className="text-sm text-gray-600">Phone:</p>
            <p className="text-sm text-gray-600">+1 (124) 34562</p>
          </span>
          <span className="mb-3 flex gap-3 px-2 py-2 shadow-inner bg-gray-50 border rounded-md">
            <p className="text-sm text-gray-600">Type:</p>
            <p className="text-sm text-gray-600">Prime User</p>
          </span>
          <button className="px-4 py-1.5 text-white bg-[#ff693b] hover:bg-[#ff3b3b] rounded-md">Logout</button>
        </div>
      </div>
      <div>
        <h3 className="mb-7 text-3xl font-medium">Your Orders</h3>
        <div className="flex gap-7 justify-center">
          {ProductsData.slice(4, 8).map((product) => (
            <Link key={product.id} className="transition-all duration-300 hover:-translate-y-2" to={`/product/${product.id}`}>
              <Img className="mb-1 h-80" src={product.image} alt={product.name} />
              <h3 className="mb-1 text-gray-600">{product.name}</h3>
              <div className="mb-1 flex gap-2 w-fit text-[#ff523b]">
                <i className="fa fa-star" ></i>
                <i className="fa fa-star" ></i>
                <i className="fa fa-star" ></i>
                <i className="fa fa-star-half-o" ></i>
                <i className="fa fa-star-o" ></i>
              </div>
              <p className="text-gray-600">${product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile