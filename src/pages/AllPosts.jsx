import React, { useEffect, useState } from 'react';
import Blogs from '../components/Blogs';
import Jobs from '../components/Jobs';
import { useLocation } from 'react-router-dom';

const AllPosts = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Jobs'); // Default state

  useEffect(() => {
    // Check if state is passed and set the active tab accordingly
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">All Posts</h1>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          {['Jobs', 'Blogs'].map((tab) => (
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
          {activeTab === 'Jobs' && <Jobs />} {/* Render Jobs component */}
          {activeTab === 'Blogs' && <Blogs />} {/* Render Blogs component */}
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
