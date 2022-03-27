import React, { useState } from 'react';
import { MdLogout } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setToken } from '../../redux/actions/UserActions';

export const Nav = ({
  isMenuOpen,
  setIsMenuOpen
}) => {
  const dispatch = useDispatch();

  function onLogoutRequest() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    dispatch(setToken(null))
  }

  return (
    <header className="shadow-2xl">
      <div className="max-w-screen-xl p-4 mx-auto">
        <div className="flex items-center justify-between space-x-4 lg:space-x-10">
          <div className="flex lg:w-0 lg:flex-1 ">
            <span className="  text-white text-center p-2 border-2 border-dashed rounded-lg font-press-start">Shortify</span>
          </div>
          <nav className="hidden space-x-8 text-sm font-medium md:flex">
            <a className="text-black" href="/">Home</a>
            <a className="text-black" href="/contact">Contact</a>
          </nav>
          <div className="items-center justify-end flex-1 hidden space-x-4 sm:flex">
            {/* <a className="px-5 py-2 text-sm font-medium text-black bg-gray-100 rounded-lg" href=""> Log in </a>

            <a className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg" href=""> Sign up </a> */}
            <Link to='/profile'>
              {JSON.parse(localStorage.getItem("user"))?.email}
            </Link>
            <div className='cursor-pointer'
              onClick={onLogoutRequest}
            >
              <MdLogout size={25} />
            </div>
          </div>
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 bg-gray-100 rounded-lg" type="button">
              <span className="sr-only">Open menu</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewbox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};