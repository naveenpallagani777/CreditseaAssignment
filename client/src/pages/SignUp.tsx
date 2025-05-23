import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiPost } from '../utils/https';
import Cookies from 'js-cookie';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'us',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let data = await apiPost('/signup', { ...formData, role: formData.role || 'user' });
      alert('Signup successful!');
      console.log(data.user);
      localStorage.setItem('role', data?.user?.role);
      Cookies.set('token', data?.token, { expires: 24 });
      window.location.href = '/';
      setFormData({ username: '', password: '', role: '' });
    } catch (error) {
      alert('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100 px-4">
      <div className="flex items-center mb-4">
        <span className="text-xl md:text-3xl font-bold text-green-900">CREDIT APP</span>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-green-800 tracking-wide">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="relative">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="peer w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-transparent bg-green-50/50 text-green-900 outline-none"
              placeholder="Username"
              required
            />
            <label
              htmlFor="username"
              className="absolute left-4 -top-2.5 text-sm text-green-700 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-green-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-green-700"
            >
              Username
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="peer w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-transparent bg-green-50/50 text-green-900 outline-none"
              placeholder="Password"
              required
            />
            <label
              htmlFor="password"
              className="absolute left-4 -top-2.5 text-sm text-green-700 bg-white px-1 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-green-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-green-700"
            >
              Password
            </label>
          </div>

          {/* Role */}
          <div className="relative">
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50/50 text-green-900 appearance-none outline-none"
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="verifier">Verifier</option>
            </select>
            <label
              htmlFor="role"
              className="absolute left-4 -top-2.5 text-sm text-green-700 bg-white px-1 transition-all duration-200"
            >
              Role
            </label>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-semibold tracking-wide transform hover:-translate-y-0.5 flex items-center justify-center ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing Up...
              </>
            ) : (
              'Sign Up'
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-green-700">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-green-600 hover:text-green-800 font-semibold underline transition-colors duration-200"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;