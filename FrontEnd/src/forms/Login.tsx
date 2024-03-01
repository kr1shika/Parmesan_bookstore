import axios from 'axios';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [message, setMessage] = useState<string | null>(null);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [username, setUsername] = useState<string | null>(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Fetch user information based on the token or use the extracted username
      // For simplicity, assuming you have an API endpoint to get user info
      axios.get('http://localhost:8086/api/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const fetchedUsername = response.data.username; // Adjust this based on your API response
        setUsername(fetchedUsername);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8086/api/user/login', user);
      console.log('Login Response:', response.data);
  
      const { token, userId } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
   
  
      setTimeout(() => {
        window.location.href = `/Landing?username=${username}`;
      }, 1000);
    } catch (error) {
      setMessage("----- Login failed. Please check your credentials -----");
      console.error('Error logging in:', error);
    }
  };
  
  const extractUsernameFromMessage = (message2: string) => {
    console.log('Extracting Username from Message2:', message2); // Add this line
    const match = message2.match(/Welcome, (.+)!/);
    return match ? match[1] : null;
  };

  return (
    <div className="flex flex-col items-center bg-[#F3EAE4] justify-center min-h-screen">
      {message && (
        <div className={`bg-[#20234A] border text-[#F3EAE4] rounded-md mb-4 text-l text-center text-${message.includes("failed") ? 'red' : 'green'}-500`}>
          {message}
        </div>
      )}
      <div className="bg-[#F3EAE4] border border-[#20234A] rounded-2xl p-6 shadow-md w-96 shadow-lg shadow-[#656ba4]">
        <div className="flex-shrink-0">
          <img
            src="src\parmasan_icons\MEOW.png"
            alt="Registration Image"
            className="mx-auto -mt-6 h-40 w-40 object-cover transition ease-in-out delay-120 hover:translate-y-2 hover:scale-90"
          />
        </div>

        <form onSubmit={handleLogin} className="space-y-4 font-jomhu tracking-wide">
          <div className="text-center r mb-4 text-[#20234A]">
            <h2 className="text-5xl font-bold tracking-wider text-[#20234A]">LOGIN</h2>
            <p className="text-2xl -mt-4 tracking-wide">To start your new journey!</p>
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

          <div className="mb-4 text-2xl tracking-wide">
            <input
              type="password"
              className="w-full h-12 p-3 tracking-wider bg-gray-100 border text-[#20234A] rounded-xl hover:border-[#20234A] active:border-[#20234A]"
              placeholder="Password"
              name="password"
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
              className="w-full h-10 p-3 bg-[#20234A] text-white text-4xl tracking-widest rounded-xl ring ring-[#20234A] ring-offset-0 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-90"
            >
              <p className="-m-2">LOGIN</p>
            </button>
          </div>

          <div className="text-center text-3xl tracking-wide text-[#20234A] transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
            <small>
              Don't have an account? <Link to="/Registration">Register</Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
