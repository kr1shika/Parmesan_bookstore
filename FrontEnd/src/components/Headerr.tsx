import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ResponsiveSearchBar from '../components/ResponsiveSearchBar';
import '../styles.css';
// import { useHistory } from 'react-router-dom';

function Headerr() {





  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  // const history = useHistory();
  const [showLoginNotification, setShowLoginNotification] = useState(false);
  useEffect(() => {
    // Check if a token is present in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);


  const handleLogout = () => {
    // Perform logout logic, e.g., clear token from localStorage
    localStorage.removeItem('token');
    setIsLoggedIn(false);

    // Show logout message for 3 seconds
    setShowLogoutMessage(true);
    setTimeout(() => {
      setShowLogoutMessage(false);
    }, 3000);
  };

  const handleAddToCart = () => {
    if (isLoggedIn) {
      setTimeout(() => {
        window.location.href = `/Cart`;
      }, 500);
      console.log('u can view ur books');
    } else {
      // Show login notification and prevent navigating to Cart page
      setShowLoginNotification(true);
      setTimeout(() => {
        setShowLoginNotification(false);
      }, 2000);
    }
  };

  return (
    <nav className="relative bg-[#F3EAE4] shadow-md h-14 z-20">
      <div className="container mx-auto px-16 flex justify-between items-center h-full">
        <a href="#" className='flex items-center space-x-4'>
          {/* <img src={logo} alt="Parmesan Logo" className='h-12' /> */}
          <p className='mt-3 font-jomhu text-6xl font-bold tracking-wider text-[#20234A] max-[300px]:hidden max-[430px]:text-5xl'>Parmesan </p>
          {/* <p className='mt-3 font-jomhu text-5xl font-bold tracking-wider text-[#20234A] max-[300px]:hidden max-[430px]:text-4xl'>Book Store </p> */}
        </a>

        {/* Menu for md and larger screens */}
        <div className="hidden md:flex items-center space-x-10">
          <ResponsiveSearchBar />


          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="mt-3 font-jomhu font-extralight text-5xl text-[#20234A] cursor-pointer"
              >
                Logout
              </button>

            </>
          ) : (
            <Link to="/Login">
              <button className="mt-3 font-jomhu font-extralight text-5xl text-[#20234A]">LOGIN</button>
            </Link>
          )}


          <svg onClick={handleAddToCart} className="w-16 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>


        </div>

        {/* Hamburger menu for smaller screens */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-500 focus:outline-none" aria-label="toggle menu">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {!isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            )}
          </svg>
        </button>

        {/* Dropdown menu for smaller screens */}
        {isOpen && (
          <div className="absolute top-full right-0 w-full py-2 mt-2 bg-[#F3EAE4] shadow-lg flex flex-col items-center space-y-2 md:hidden">
            <div className=" w-80"><ResponsiveSearchBar alwaysExpanded={true} /></div>
            <div className="flex space-x-10">


              {isLoggedIn ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="mt-3 font-jomhu font-extralight text-5xl text-[#20234A] cursor-pointer"
                  >
                    Logout
                  </button>

                </>
              ) : (
                <Link to="/Login">
                  <button className="mt-3 font-jomhu font-extralight text-5xl text-[#20234A]">LOGIN</button>
                </Link>
              )}


              <a href="#" className="w-full text-center text-gray-700 flex items-center justify-center space-x-2">

                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <p className='mt-3 font-jomhu font-extralight	text-5xl text-[#20234A]'>CART</p>
              </a>
            </div>
          </div>
        )}
       
      </div>

      {showLogoutMessage && (
        <div className="font-salsa tracking-wide ml-[1220px]  mt-3 w-52  bg-[#20234A]  text-[#F3EAE4]  border rounded-lg  px-2 border-dotted">
           Successfully logged out.
        </div>
      )}
      {showLoginNotification && (
        <div className="font-salsa tracking-wide ml-[1250px]  mt-3 w-40  bg-[#20234A]  text-[#F3EAE4]  border rounded-lg  px-2 border-dotted">
          Please log in first
        </div>
      )}
    </nav>


    // { activeTab === 'customers' && <CustomerTable /> }
  );
}

export default Headerr;
