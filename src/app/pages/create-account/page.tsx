'use client'
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const RegisterAccount: React.FC = () => {
    const [isTyping1,setIsTyping1] = useState(false);
    const [target1,setTarget1] = useState('');
    const [isTyping2,setIsTyping2] = useState(false);
    const [target2,setTarget2] = useState('');
    const [isTyping3,setIsTyping3] = useState(false);
    const [target3,setTarget3] = useState('');
    const [isTyping4,setIsTyping4] = useState(false);
    const [target4,setTarget4] = useState('');

  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen"
        style={{
          backgroundImage: "url(/misc/competition/images/biology.jpg)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <form
          className="w-full sm:w-96 p-8 rounded-2xl shadow-lg  bg-opacity-70 flex flex-col gap-6 items-center max-w-xs sm:max-w-md animate-fadeIn"
          style={{
            backdropFilter: "blur(30px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <h2 className="text-3xl font-semibold text-center text-gray-900">Create Account</h2>
          {/* UserName */}
          <div className="relative w-full">
            <input
              className="w-full pl-10 pr-4 py-2 bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-indigo-500 transition-all box-border rounded"
              type="text"
              id="username"
              placeholder=" "
              onFocus={()=> setIsTyping1(true)}
              onBlur={()=> setIsTyping1(false)}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                 setTarget1(e.target.value);
              }}
            />
            <label
              htmlFor="username"
              className="absolute left-8 top-2 text-gray-500 transition-all transform scale-75 origin-left"
              style={{
                transform: isTyping1 ? 'translateY(-25px)' : '',
                transition:'0.3s ease-in-out',
                display: target1 == '' ? "block" : 'none'
              }}
            >
              User Name
            </label>
            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-3 top-2 text-gray-400"
            />
          </div>

          {/* Email Field */}
          <div className="relative w-full">
            <input
              className="w-full pl-10 pr-4 py-2 bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-indigo-500 transition-all box-border rounded"
              type="email"
              id="email"
              placeholder=" "
              onFocus={()=> setIsTyping2(true)}
              onBlur={()=> setIsTyping2(false)}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                 setTarget2(e.target.value);
              }}
            />
            <label
              htmlFor="email"
              className="absolute left-8 top-2 text-gray-500 transition-all transform scale-75 origin-left"
              style={{
                transform: isTyping2 ? 'translateY(-25px)' : '',
                transition:'0.3s ease-in-out',
                display: target2 == '' ? "block" : 'none'
              }}
            >
              Email
            </label>
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute left-3 top-2 text-gray-400"
            />
          </div>

          {/* Password Field  */}
          <div className="relative w-full">
            <input
              className="w-full pl-10 pr-4 py-2 bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-indigo-500 transition-all box-border rounded"
              type="password"
              id="password"
              placeholder=" "
              onFocus={()=> setIsTyping3(true)}
              onBlur={()=> setIsTyping3(false)}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                 setTarget3(e.target.value);
              }}
            />
            <label
              htmlFor="password"
              className="absolute left-8 top-2 text-gray-500 transition-all transform scale-75 origin-left"
              style={{
                transform: isTyping3 ? 'translateY(-25px)' : '',
                transition:'0.3s ease-in-out',
                display: target3 == '' ? "block" : 'none'
              }}
            >
              Password
            </label>
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-3 top-2 text-gray-400"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="relative w-full">
            <input
              className="w-full pl-10 pr-4 py-2 bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-indigo-500 transition-all box-border rounded"
              type="password"
              id="confirm-password"
              placeholder=" "
              onFocus={()=> setIsTyping4(true)}
              onBlur={()=> setIsTyping4(false)}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                 setTarget4(e.target.value);
              }}
            />
            <label
              htmlFor="confirm-password"
              className="absolute left-8 top-2 text-gray-500 transition-all transform scale-75 origin-left"
              style={{
                transform: isTyping4 ? 'translateY(-25px)' : '',
                transition:'0.3s ease-in-out',
                display: target4 == '' ? "block" : 'none'
              }}
            >
              Confirm Password
            </label>
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-3 top-2 text-gray-400"
            />
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center gap-2">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms" className="text-gray-700 text-sm">
              I agree to the terms and conditions
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 mt-4 text-white bg-indigo-600 rounded-lg border-none bg-gradient-to-tr to-blue-800  transition-all transform hover:scale-105"
          >
            Create Account
          </button>

          {/* Footer Text */}
          <div className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/pages/login" className="text-indigo-600 hover:underline">
              Log in here
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterAccount;
