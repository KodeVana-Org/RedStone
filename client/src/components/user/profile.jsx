import { Img } from "react-image"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

import ProductsData from '../../assets/product'
import UserDp from '../../assets/icon-user.png'
import productsData from "../../assets/product"

function Profile() {
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setid] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem('token')
    if (!auth) {
      navigate('/login')
    }
  })

 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('http://localhost:6969/api/get-data', config);
        const data = response.data.responseData.userDetails;
        const data2 = response.data.responseData.purchaseDetails;

        if (data) {
          setProfileData(data);
          console.log("Data is available:", data);
        } else if (Array.isArray(data2) && data2.length > 0) {
          // Accessing the first element of purchaseDetails array
          setProfileData(data2[0].user);
          const allIds = data2.map(item => item.id);
          console.log("All IDs:", allIds);
          setid(allIds);
          // console.log("Data2 is available:", data2[0]);
        } else {
          console.log("No data available");
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    console.log("Updated Profile Data:", profileData);
  }, [profileData]);

console.log("id is idddd", id)
  return (
    <div className="mx-96 my-16">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mb-10 grid grid-cols-2 gap-16">
          
            <div className="mb-7 flex gap-7 items-center justify-center">
              <img className="h-14" src={UserDp} alt="User DP" />
              <span>
                <p className="text-lg font-medium">{profileData.name}</p>
                <p className="text-sm text-gray-600">Country: India</p>
              </span>
            </div>
          

         
            <div className="">
              <span className="mb-3 flex gap-2 px-3 py-2 shadow-inner bg-gray-50 border rounded-md">
                <p className="text-sm text-gray-600">Email:</p>
                <p className="text-sm text-gray-600">{profileData.email}</p>
              </span>
              <span className="mb-3 flex gap-2 px-3 py-2 shadow-inner bg-gray-50 border rounded-md">
                <p className="text-sm text-gray-600">Phone:</p>
                <p className="text-sm text-gray-600">{profileData.phoneNumber}</p>
              </span>
          <span className="mb-3 flex gap-3 px-2 py-2 shadow-inner bg-gray-50 border rounded-md">
            <p className="text-sm text-gray-600">Type:</p>
            <p className="text-sm text-gray-600">Prime User</p>
          </span>
          <button className="px-4 py-1.5 text-white bg-[#ff693b] hover:bg-[#ff3b3b] rounded-md">Logout</button>
        </div>
        
      </div>
      )}


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