import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Auth from './components/Auth';
import Posts from './components/Posts';
import UserPosts from './components/UserPosts';
import PostDetail from './components/PostDetail';
import AddPost from './components/AddPost';
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  console.log(isLoggedIn);

  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/myposts" element={<UserPosts />} />
          <Route path="/myposts/:id" element={<PostDetail />} />
          <Route path="/posts/add" element={<AddPost />} />
        </Routes>
      </main>
    </React.Fragment>

  );
}

export default App;
