import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
// Just import the file
import SigninForm from './SigninForm.js';

const Signin: React.FC = () => {
  // And use it after the h1 tag
  const message = localStorage.getItem('message');
  localStorage.setItem('message', "");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        {message && <div className="text-center mt-4">
          <p className="text-sm text-red-600">{message}</p>
        </div>}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign in</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <SigninForm />
        </Suspense>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-800">Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}
export default Signin;