import { useState } from 'react';
import { Img } from 'react-image';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import NavBar from '../components/navBar';
import Footer from '../components/footer';

import ProductsData from '../assets/product';

export default function Product() {
  const [selectedSize, setSelectedSize] = useState(null);
  const { id } = useParams();
  const product = ProductsData.find((product) => product.id === parseInt(id));

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  const handleSizeCheck = (size) => {
    setSelectedSize(size);
    console.log(size);
  };

  if (!product) {
    return <div className='text-[#ff523b]'>Product not found!</div>;
  }

  return (
    <div>
      <NavBar />
      <div className='mt-20 mb-16 mx-96'>
        <div className='grid grid-cols-2 gap-7 justify-center'>
          <div>
            <p className='mb-5 px-3 w-fit text-lg text-white bg-[#000]'>Bestseller</p>
            <p className='mb-5 text-lg font-medium'>{product.name}</p>
            <div className='mb-5 flex gap-2'>
              {sizes.map((size) => (
                <span
                  key={size}
                  className={`relative py-3 h-14 w-14 hover:text-white hover:bg-[#ff523b] border border-[#ff523b] text-center items-center justify-center rounded-full ${selectedSize === size ? 'text-white bg-[#ff523b]' : 'text-[#ff523b] bg-white'
                    }`}
                >
                  <input
                    className='h-full w-full absolute opacity-0 z-10 cursor-pointer'
                    type='radio'
                    name='size'
                    id={size}
                    onClick={() => handleSizeCheck(size)}
                  />
                  <label className='' htmlFor='size'>
                    {size}
                  </label>
                </span>
              ))}
            </div>
            <p className='mb-5 text-base'>{product.price}</p>
            <div className='mb-16 flex gap-2 w-fit text-[#ff523b]'>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star-half-o'></i>
              <i className='fa fa-star-o'></i>
            </div>
            <div className='flex gap-7'>
              <Link
                className='px-3 py-2 text-[#ff523b] hover:text-white font-medium bg-white hover:bg-[#ff523b] border-2 border-[#ff523b] transition-all duration-300 rounded-md'
                to={'/cart'}
              >
                Buy Now
              </Link>
              <Link
                className='px-3 py-2 text-[#ff523b] hover:text-white font-medium bg-white hover:bg-[#ff523b] border-2 border-[#ff523b] transition-all duration-300 rounded-md'
                to={'/cart'}
              >
                Add to Cart
              </Link>
            </div>
          </div>
          <Img className='mb-10 h-96' src={product.image} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
