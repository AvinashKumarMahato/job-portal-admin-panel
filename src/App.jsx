import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import AllPosts from './pages/AllPosts';   
import EditPost from './components/EditPost';
import EditBlogPost from './components/EditBlogPosts';
import Blogs from './components/Blogs';
import CreateAllPosts from '../src/pages/CreatePosts';
import AllDrafts from './pages/AllDrafts';
import Messages from './pages/Messages';

const PrivateRoute = ({ element }) => {
  const isLoggedIn = !!localStorage.getItem('token');
  return isLoggedIn ? element : <Navigate to="/" />;
};

const DashboardLayout = () => {
  return (
    <div>
      <Dashboard />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<PrivateRoute element={<DashboardLayout />} />}>
          <Route index element={<Navigate to="all-posts" />} />
          <Route path="all-posts" element={<AllPosts />} />
          <Route path="createAllPost" element={<CreateAllPosts />} />
          <Route path="drafts" element={<AllDrafts />} />
          <Route path="editPost/:postId" element={<EditPost />} />
          <Route path="edit/:id" element={<EditBlogPost />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="messages" element={<Messages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
