import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Headerr from '../components/Headerr'
import Slider from '../components/Slider'
import blue_car from '../parmasan_icons/blue_car.png'
import d from '../parmasan_icons/d.jpg'
import ducky from '../parmasan_icons/ducky.png'
import eepy_rabbits from '../parmasan_icons/eepy_rabbits.png'

interface Book {
  id: number;
  title: string;
  bookImage: string;
  price: number;
}

export interface CartPojo {
  bookId: string;
  price: number;
  userId: number | null;
}

const Landing = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bestSellers, setBestSellers] = useState<Book[]>([]);
  const [newComers, setNewComers] = useState<Book[]>([]);
  const [headerBooks, setheaderBooks] = useState<Book[]>([]);
  useEffect(() => {

    axios.get('http://localhost:8086/api/book/getAll')
      .then(response => {

        setBestSellers(response.data.slice(0, 5));
        setNewComers(response.data.slice(5, 8));
        setheaderBooks(response.data.slice(0, 1));
      })
      .catch(error => console.error('Error fetching books:', error));

    const storedUserId = localStorage.getItem('userId');
    console.log('Stored User ID:', storedUserId); // Add this line to check the stored value

  }, []);

  const buttonclick = async (book: Book) => {

    if (!localStorage.getItem("userId")) {
      toast.error("Please login to continue!");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error('Token is missing. Please log in again.');
      return;
    }

    const payload: CartPojo = {
      bookId: book.id.toString(),
      price: book.price,
      userId: Number(localStorage.getItem("userId")),
    };

    console.log('Token:', token);
    console.log('Payload:', payload);

    try {
      const response = await axios.post("http://localhost:8086/api/cart/save", payload, {
        headers: { Authorization: "Bearer " + token },
      });

      console.log('Response:', response.data);
      toast.success('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding item to cart:', error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          toast.error('Unauthorized. Please log in again.');
        } else {
          toast.error('Error adding item to cart. Please try again.');
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }

  };



  return (
    <div className=' bg-[#20234A]'>
      <Headerr />
      <div className='flex justify-evenly bg-[#F3EAE4] shadow-md h-80 rounded-b-3xl'>
        <ToastContainer />
        <div className='flex xl:flex lg:hidden md:hidden'>
          <img src={eepy_rabbits} className=' lg:h-72 lg:mt-7 md:mt-8   lg:ml-28  ' alt="My Image" />
          <img src={ducky} className='lg:-ml-12 lg:h-52 lg:-mt-3  ' alt="My Image" />
        </div>

        <div className='flex flex-row mx-40 max-[780px]:w-auto'>
          <div className="grid grid-cols-1 content-center h-80 text-2xl font-salsa space-y-4 w-32 min-[630px]:grid min-[0px]:hidden">

            <button type="submit" className="h-8 pb-2 bg-[#20234A] text-white text-lg rounded-xl ring ring-[#20234A] ring-offset-0 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-90">
              <Link to="/All">
                <p className='text-2xl'> #view all </p>
              </Link>
            </button>


          </div>

          <div className='flex flex-col rounded-lg justify-center w-96 max-[380px]:w-auto items-center mt-10 max-[780px]:mt-0'>
            <p className='text-3xl text-center font-salsa text-[#20234A] font-bold my-4'> New Arrivals</p>

            <div className='flex flex-row justify-evenly space-x-6'>
              <img src={d} alt="" className='  h-40 w-28 rounded-lg' />
              {headerBooks.map(book => (
                <Link to={`/books/${book.id}`}>
                  <img src={"data:image/jpg;base64, " + book?.bookImage} alt="" className='  h-40 w-28 rounded-lg' />
                </Link>
              ))}
            </div>
          </div>
          <Slider />
        </div>
      </div>

      <div className=' min-[1700px]:mx-64 min-[1400px]:mx-40 min-[1100px]:mx-20 min-[800px]:mx-8 min-[500px]:mx-16'>
        <div>
          <div className='mt-10'>
            <img src={blue_car} className='h-32 mt-4 -ml-10' alt="My Image" />
            <p className='-mt-12 ml-1 font-jomhu font-medium text-5xl  text-[#F3EAE4] leading-6'> Best Sellers </p>
          </div>

          <div className='flex flex-row justify-evenly flex-wrap space-x-5'>

            {bestSellers.map(book => (
              <div key={book.id} className='flex items-center flex-col bg-[#F3EAE4] h-[405px] w-52 mt-8 rounded-xl border'>
                <Link to={`/books/${book.id}`}>
                  <img src={"data:image/jpg;base64, " + book?.bookImage} alt={book.title} className='h-[312px] mt-1 rounded-lg' />
                </Link>

                <div>
                  <p>{book.title}</p>
                  <p>Price: {book.price}</p>
                </div>

                <button onClick={() => buttonclick(book)} className='border border-[#20234A] px-2 font-small rounded-lg text-l font-salsa font-semibold text-[#20234A]'>
                  Add to cart
                </button>
              </div>
            ))}

          </div>
        </div>

        <div className=' New commers '>
          <div>
            <img src={blue_car} className='h-32 mt-24 -ml-10' alt="My Image" />
            <p className='-mt-12 ml-1 font-jomhu font-medium text-5xl  text-[#F3EAE4] leading-6'> New Comers </p>
          </div>

          <div className='flex flex-row justify-evenly flex-wrap space-x-5'>

            {newComers.map(book => (
              <div key={book.id} className='flex items-center flex-col bg-[#F3EAE4] h-[450px] w-60 mt-8 rounded-xl border'>
                <img src={"data:image/jpg;base64, " + book?.bookImage} alt={book.title} className='h-4/5 m-0 rounded-lg' />


                <div>
                  <p>{book.title}</p>
                  <p>Price: {book.price}</p>
                </div>

                <button className='border border-[#20234A] px-2 font-small rounded-lg text-l font-salsa font-semibold text-[#20234A]'>
                  Add to cart
                </button>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing