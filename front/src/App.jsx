import { useEffect } from 'react'
import './App.css'
import { Login } from './pages/login'
import { Register } from './pages/register'
import Home from './pages/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { setToken } from './redux/actions/UserActions'
import Profile from './pages/profile'
import UploadArticle from './components/UploadArticle'
import ReadArticle from './pages/ReadArticle'
import Contact from './pages/contact'

export const App = ({ token }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    try {
      let token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        dispatch(setToken(token))
      }
    } catch (error) {
      console.log(error);
    }
    return () => {
      isMounted = false;
    };
  }, []);


  return (
    <div className="bg-gradient-to-r from-pink-900 h-full via-blue-200 to-green-500">
      <BrowserRouter>
        {
          token == null ? (
            <>
              <Routes>
                <Route path="/" exact element={<Login />} />
                <Route path="/signup" exact element={<Register />} />
              </Routes>
            </>
          ) : (
            <>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/Read/Article/:name" element={<ReadArticle />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/profile" element={<Profile />} />
              </Routes>
            </>
          )
        }
      </BrowserRouter>
    </div >
  )
};

const mapStateToProps = (state) => ({
  token: state.userDetails.token
});


export default connect(mapStateToProps)(App);
