import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-hero-pattern"></div>
      <div className="relative bg-white p-16 rounded-3xl shadow-xl w-96 max-w-lg mx-auto border border-gray-200 z-10">
        <h2 className="text-5xl font-extrabold mb-10 text-center text-gray-800">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label className="block text-gray-600 text-lg font-semibold mb-3" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-6 py-4 border rounded-lg shadow-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-transform transform hover:scale-105 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>
          <div className="mb-12 relative">
            <label className="block text-gray-600 text-lg font-semibold mb-3" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-6 py-4 border rounded-lg shadow-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-transform transform hover:scale-105 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your password"
                aria-describedby="passwordHelp"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-110"
              >
                {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-between mb-12">
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-xl"
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
          <div className="flex flex-col items-center mb-8">
            <p className="text-gray-600 mb-4">Or sign in with</p>
            <div className="flex space-x-4">
              <button
                type="button"
                className="flex items-center justify-center p-3 bg-red-500 text-white rounded-full shadow-md transition-transform transform hover:scale-105"
              >
                <FaGoogle size={20} />
              </button>
              <button
                type="button"
                className="flex items-center justify-center p-3 bg-gray-900 text-white rounded-full shadow-md transition-transform transform hover:scale-105"
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
      </div>
    </div>
  );
};

export default LoginForm;

