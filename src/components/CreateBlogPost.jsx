import React, { useState } from 'react';
import axios from 'axios';
import TipTap from '../components/TipTap';
import { useNavigate } from 'react-router-dom';

const CreateBlogPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState({
    type: 'doc',
    content: [
      {
        type: 'paragraph'
      }
    ]
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState([]);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handlePublish = async () => {
    const postData = {
      title,
      content: JSON.stringify(content),
    };

    try {
      const response = await axios.post('http://localhost:3001/blogPosts', postData);
      console.log('Post created:', response.data);
      setModalMessage('Post Published Successfully!');
      setModalButtons([
        {
          text: 'View Blog Posts',
          action: () => navigate('/dashboard/all-posts', { state: { from: 'blogs' } }),
        },
        { text: 'Close', action: handleModalClose },
      ]);

      setIsError(false);
      setIsModalOpen(true); // Show modal on success
    } catch (error) {
      setModalMessage('Failed to save draft. Please try again.');
      setIsError(true);
      setIsModalOpen(true); // Show modal on error
    }
  };

  const handleModalClose = () => {
    setTitle('');
    setContent({
      type: 'doc',
      content: [
        {
          type: 'paragraph'
        }
      ]
    });
    setIsModalOpen(false);
    navigate('/dashboard/createAllPost');
  };

  // Save Draft
  const handleSaveDraft = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      content: JSON.stringify(content),
    };

    try {
      await axios.post('http://localhost:3001/draftBlogPost', postData);
      setModalMessage('Draft Saved Successfully!');
      setModalButtons([
        {
          text: 'View Draft',
          action: () => navigate('/dashboard/drafts', { state: { activeTab: 'Draft Blog Post' } }), // Pass activeTab state
        },
        { text: 'Close', action: handleModalClose },
      ]);
      setIsError(false);
      setIsModalOpen(true); // Show modal on success
    } catch (error) {
      setModalMessage('Failed to save draft. Please try again.');
      setIsError(true);
      setIsModalOpen(true); // Show modal on error
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Blog Post Title
          </label>
          <textarea
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
            rows="2"
            placeholder="Enter the title of your blog post"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Write Blog Post
          </label>
          <div className="rounded-lg">
            <TipTap setContent={setContent} content={content} />
          </div>
        </div>
        <button
          onClick={handleSaveDraft}
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
        >
          Save Draft
        </button>

        <button
          onClick={handlePublish}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Publish Post
        </button>
      </div>
      {/* Modal for Success/Error */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{modalMessage}</h2>
            <div className="flex justify-between">
              {modalButtons.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={btn.action}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  {btn.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBlogPost;
