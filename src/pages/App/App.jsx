import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import Posts from '../AllPostPage/AllPostPage';
import PostDetails from '../PostDetailsPage/PostDetailsPage';
import CreatePost from '../CreatePost/CreatePost';
import UserPosts from '../UserPosts/UserPosts';


export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/" element={<Posts />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/my-posts" element={<UserPosts/>} />
              <Route path="/post-details/:id" element={<PostDetails />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
