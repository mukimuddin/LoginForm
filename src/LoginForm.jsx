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
    to: async (next) => {
      while (1) {
        await next({ background: 'linear-gradient(45deg, #FF4E50, #F9D423)' });
        await next({ background: 'linear-gradient(45deg, #24C6DC, #514A9D)' });
        await next({ background: 'linear-gradient(45deg, #FF512F, #F09819)' });
        await next({ background: 'linear-gradient(45deg, #00C9FF, #92FE9D)' });
        await next({ background: 'linear-gradient(45deg, #FF6B6B, #556270)' });
      }
    },
    config: { duration: 6000 },
  });

  const formSpring = useSpring({
    transform: `perspective(1200px) rotateX(${(cursorPosition.y - window.innerHeight / 2) / 20}deg) rotateY(${(cursorPosition.x - window.innerWidth / 2) / 20}deg)`,
    opacity: 0.7,  // Default opacity
    config: { tension: 280, friction: 60 },
  });

  const hoverSpring = useSpring({
    opacity: 1,  // Full opacity on hover
    config: { duration: 300 },
  });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

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

    if (!email) {
      emailError = 'Email is required.';
    } else if (!validateEmail(email)) {
      emailError = 'Please enter a valid email address.';
    }

    if (!password) {
      passwordError = 'Password is required.';
    } else if (password.length < 8) {
      passwordError = 'Password must be at least 8 characters long.';
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    // Handle form submission if no errors
    console.log('Form submitted');
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'email') {
      setEmail(value);
      if (value) {
        setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
      }
    } else if (id === 'password') {
      setPassword(value);
      if (value) {
        setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
      }
    }
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          ...formSpring,
          ...(isHovered ? hoverSpring : {}),  // Apply hover effect
          transformStyle: 'preserve-3d',
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto',
          padding: '20px',
          perspective: '1000px',
          background: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
          borderRadius: '15px',
          fontFamily: "'Roboto', sans-serif",
        }}
        className="p-8 border border-gray-200"
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-600 text-lg font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <animated.input
              type="email"
              id="email"
              value={email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg shadow-lg bg-gray-100 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-8 relative">
            <label className="block text-gray-600 text-lg font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <animated.input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg shadow-lg bg-gray-100 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your password"
                aria-describedby="passwordHelp"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-between mb-8">
            <animated.button
              type="submit"
              className="bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 focus:outline-none"
            >
              Sign In
            </animated.button>
            <a
              className="text-lg text-teal-400 hover:underline"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <div className="flex flex-col items-center mb-6">
            <p className="text-gray-600 mb-4">Or sign in with</p>
            <div className="flex space-x-4">
              <animated.button
                type="button"
                style={rippleSpring}
                className="flex items-center justify-center p-3 bg-red-500 text-white rounded-full shadow-md transition-transform transform hover:bg-red-600 hover:scale-110 active:bg-red-700 active:scale-95"
              >
                <FaGoogle size={20} className="transition-transform transform hover:scale-125 active:scale-110" />
              </animated.button>
              <animated.button
                type="button"
                style={rippleSpring}
                className="flex items-center justify-center p-3 bg-gray-900 text-white rounded-full shadow-md transition-transform transform hover:bg-gray-800 hover:scale-110 active:bg-gray-700 active:scale-95"
              >
                <FaGithub size={20} className="transition-transform transform hover:scale-125 active:scale-110" />
              </animated.button>
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
        <footer className="mt-8 text-center text-gray-500 text-sm">
          Developed By Mukim
        </footer>
      </animated.div>
    </animated.div>
  );
};

export default LoginForm;
