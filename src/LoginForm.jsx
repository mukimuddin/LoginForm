import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const backgroundSpring = useSpring({
    loop: true,
    to: [
      { backgroundPosition: '0% 0%', backgroundColor: '#1a1a1a' },
      { backgroundPosition: '100% 100%', backgroundColor: '#333' },
    ],
    config: { duration: 15000 },
  });

  const formSpring = useSpring({
    transform: `perspective(1200px) rotateX(${(cursorPosition.y - window.innerHeight / 2) / 20}deg) rotateY(${(cursorPosition.x - window.innerWidth / 2) / 20}deg)`,
    config: { tension: 280, friction: 60 },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let emailError = '';
    let passwordError = '';

    if (!email || !validateEmail(email)) {
      emailError = 'Please enter a valid email address.';
    }

    if (!password || password.length < 8) {
      passwordError = 'Password must be at least 8 characters long.';
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    // Handle form submission if no errors
    console.log('Form submitted');
  };

  return (
    <animated.div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        ...backgroundSpring,
      }}
    >
      <animated.div
        style={{
          ...formSpring,
          transformStyle: 'preserve-3d',
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto',
          padding: '20px',
          perspective: '1000px',
          background: 'linear-gradient(135deg, #222, #444)', // Unique gradient for the form
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        }}
        className="p-8 rounded-3xl border border-gray-200"
      >
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-100">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-300 text-lg font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg shadow-lg bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.email ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-8 relative">
            <label className="block text-gray-300 text-lg font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg shadow-lg bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Enter your password"
                aria-describedby="passwordHelp"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300 hover:text-gray-100"
              >
                {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
              </button>
              {/* <div id="passwordHelp" className="absolute top-full left-0 mt-1 text-gray-500 text-sm">
                Password must be at least 8 characters long and include a number.
              </div> */}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-between mb-8">
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            >
              Sign In
            </button>
            <a
              className="text-lg text-teal-400 hover:underline"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <div className="flex flex-col items-center mb-6">
            <p className="text-gray-300 mb-4">Or sign in with</p>
            <div className="flex space-x-4">
              <button
                type="button"
                className="flex items-center justify-center p-3 bg-red-500 text-white rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
              >
                <FaGoogle size={20} />
              </button>
              <button
                type="button"
                className="flex items-center justify-center p-3 bg-gray-900 text-white rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
              >
                <FaGithub size={20} />
              </button>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-lg">
              Don't have an account?{' '}
              <a
                className="text-teal-500 hover:underline"
                href="#"
              >
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </animated.div>
    </animated.div>
  );
};

export default LoginForm;
