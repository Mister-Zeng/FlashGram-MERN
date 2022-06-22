import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import Posts from './components/Posts';
import UserPosts from './components/UserPosts';
import PostDetail from './components/PostDetail';
import AddPost from './components/AddPost';
import MainPage from "./components/MainPage";

function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  console.log(isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(authActions.login());
    }
  }, [dispatch])

  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>) :
            <>
              <Route path="/posts" element={<Posts />} />
              <Route path="/myposts" element={<UserPosts />} />
              <Route path="/myposts/:id" element={<PostDetail />} />
              <Route path="/posts/add" element={<AddPost />} />
            </>}
        </Routes>
      </main>
    </React.Fragment >

  );
}

export default App;
