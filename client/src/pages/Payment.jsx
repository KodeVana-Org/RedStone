import { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, Link ,useLocation} from 'react-router-dom';
import ProductsData from '../assets/product';

export const Payment = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const source = searchParams.get('source');
  const { id } = useParams();

  const [cardNumber, setCardNumber] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCVC] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [size, setSize] = useState('');

  const tour = ProductsData.find((tour) => tour.id === parseInt(id));
  if (!tour) {
    return <div>Product not found</div>;
  }
  
  useEffect(() => {
    if (source === 'product') {
      const selectedSize = localStorage.getItem('selectedSize');
      setSize(selectedSize);
    } else if (source === 'cart') {
      const selectedSize = localStorage.getItem('productsize');
      setSize(selectedSize);
    }
  }, [source]);


  const handlePayment = async (e) => {
    e.preventDefault();
    if (cardNumber.length === 16 && cvc.length === 3) {
      // Simulate payment details
      const paymentDetails = {
        cardNumber,
        cardHolderName,
       // expiryDate,
        cvc,
        amount: tour.price, 
        currency: 'INR',
        placeName: tour.name,
        size: size,
        id: id
      };

  //seding code to backend
      try {
        console.log(paymentDetails)
        const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
        const response = await axios.post('http://localhost:6969/api/payment-get', paymentDetails, config);

        if (response.status === 200) {
          setPaymentSuccess(true);
         
        } else {
          throw new Error('Failed to save payment details');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to process payment. Please try again.');
      }
    } else {
      alert('Please enter valid payment details.');
    }
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (

    <>
      <div className='grid grid-cols-2 mx-96 justify-center items-center'>
        <div className="payment ml-9">
          <h2 className="text-3xl font-bold mb-4">Payment Details</h2>
          <img src={tour.image} alt="tour.name" />
          <p className='font-medium'>Tour: {tour.name}</p>
          <p className='font-medium'>Price: ${tour.price}</p>
          <p className='font-medium'>Size: {size}</p>
          {/* Add payment form or payment processing details */}
        </div>

        <div className="min-h-screen flex items-center justify-center">

          {!paymentSuccess ? (
            <form
              onSubmit={handlePayment}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="">
                <select
                  value={selectedOption}
                  onChange={handleSelectChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Card</option>
                  <option value="option1">Debit Card</option>
                  <option value="option2">Credit Card</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              <div className="mb-4 mt-3">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Card Number:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={16}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Cardholder Name:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                />
              </div>
              <div className="flex">
                <div className="mb-4 mr-4 w-1/2">
                  <label className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Expiry Date (MM/YY):
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    maxLength={5}
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    CVC:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={cvc}
                    onChange={(e) => setCVC(e.target.value)}
                    maxLength={3}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Make Payment
              </button>
            </form>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-green-600 mb-4">
                Payment Successful!
              </h2>
              <p className="text-gray-700 mb-5">Thank you for your payment.</p>
              <Link
        to="/"
        className="bg-blue-500 mt-5 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md transition duration-300"
      >
        Go to Home
      </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
