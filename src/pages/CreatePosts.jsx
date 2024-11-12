import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CreatePosts from '../components/CreatePosts';
import CreateBlogPost from '../components/CreateBlogPost';

const CreateAllPosts = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Create Job Post'); // Default state

  useEffect(() => {
    // Check if state is passed and set the active tab accordingly
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Create Posts</h1>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          {['Create Job Post', 'Create Blog Post'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold ${
                activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              } rounded-md mx-2`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Conditional rendering of components based on active tab */}
        <div>
          {activeTab === 'Create Job Post' && <CreatePosts />} {/* Render Jobs component */}
          {activeTab === 'Create Blog Post' && <CreateBlogPost />} {/* Render Blogs component */}
        </div>
      </div>
    </div>
  );
};

export default CreateAllPosts;