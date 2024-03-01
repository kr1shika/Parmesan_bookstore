
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Registration() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
    confirm: '',
    userName: '',
    address: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8086/api/user/save', user);
      console.log(response.data);
      alert("Account created")
      navigate("/Login");
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };



  return (
    <div className="flex items-center bg-[#F3EAE4] justify-center min-h-screen">


      <div className="bg-[#F3EAE4] border border-[#20234A] rounded-xl p-6 w-100 shadow-lg shadow-[#44486d]">
        <div className="flex-shrink-0 ">
          <img
            src="src\parmasan_icons\MEOW.png"
            alt="Registration Image"
            className="mx-auto -mt-6  h-40 w-32  object-cover transition ease-in-out delay-120 hover:translate-y-2 hover:scale-90"
          />
        </div>
        <form className="space-y-4 font-jomhu ">
          <div className="mb-4 text-center">
            <h2 className="text-5xl font-bold tracking-wider text-[#20234A]">REGISTER</h2>
            <p className="text-2xl -mt-4 tracking-wide">To start your new journey!</p>
          </div>

          <div className="flex ">
            <div className="mb-4 text-2xl ">
              <input
                type="text"
                className="w-48 mr-4 h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A]"
                placeholder="UserName"
                name="userName"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4 text-2xl ">
              <input
                type="text"
                className="w-full h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A]"
                placeholder="Email Address"
                name="email"
                onChange={handleInputChange}
              />
            </div>

          </div>


          <div className="mb-4 text-2xl ">
            <input
              type="text"
              className="w-full h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A]"
              placeholder="address"
              name="address"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4 text-2xl">
            <input
              type="password"
              className="w-full h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A]"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4 text-2xl">
            <input
              type="password"
              className="w-full h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A]"
              placeholder="Confirm Password"
              name="confirm"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="form-checkbox" id="formCheck" />
            <label htmlFor="formCheck" className="ml-2 text-xl tracking-wide text-gray-600">
              Remember Me
            </label>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              onClick={handleRegistration}
              className="w-full h-10 p-3 bg-[#20234A] text-white text-4xl tracking-widest rounded-xl ring ring-[#272E87] ring-offset-0 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-90"
            >
              <p className="-m-2"> REGISTER </p>
            </button>
          </div>

          <div className="text-center text-3xl tracking-wide text-[#20234A] transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
            <small className="-mb-10">
              Already have an account?<Link to="/Login"> LOGIN</Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
