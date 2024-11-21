import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TipTap from '../components/TipTap';

const EditBlogPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState({
    type: 'doc',
    content: [{ type: 'paragraph' }]
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/blogPosts/${id}`);
        setTitle(response.data.title);
        setContent(JSON.parse(response.data.content));
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching the blog post:', error);
      }
    };

    fetchBlogPost();
  }, [id]);

  const handleUpdate = async () => {
    const updatedData = {
      title,
      content: JSON.stringify(content)
    };

    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/blogPosts/${id}`, updatedData);
      console.log('Update Successful:', updatedData);  // Debugging log
      setSuccessMessageVisible(true);
      setErrorMessageVisible(false);

      setTimeout(() => {
        setSuccessMessageVisible(false);
        navigate('/dashboard/all-posts', { state: { activeTab: 'Blogs' } });
      }, 3000);
      
    } catch (error) {
      console.error('Error updating the blog post:', error);
      setErrorMessageVisible(true);
      setSuccessMessageVisible(false);

      setTimeout(() => {
        setErrorMessageVisible(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      {isLoaded ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>
          
          {successMessageVisible && (
            <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
              <span className="font-medium">Success!</span> Blog updated successfully.
            </div>
          )}
          
          {errorMessageVisible && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">Error:</span> Could not update the blog. Please try again.
            </div>
          )}
          
          <input
            type="text"
            className="border p-2 mb-4 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
          <TipTap content={content} setContent={setContent} />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            Update Post
          </button>

        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditBlogPost;
