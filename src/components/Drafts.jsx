import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Drafts = () => {
  const [drafts, setDrafts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const navigate = useNavigate()

  const openDeleteModal = (postId) => {
    setPostToDelete(postId);
    setShowModal(true);
};

const closeDeleteModal = () => {
  setShowModal(false);
  setPostToDelete(null);
};

  // Fetch the posts
  useEffect(() => {
    axios
      .get('http://localhost:3001/getDrafts')
      .then((response) => setDrafts(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDeletePost = async () => {
    if (!postToDelete) return;

    try {
      await axios.delete(`http://localhost:3001/deleteDraftJob/${postToDelete}`);
      setDrafts((prevPosts) => prevPosts.filter((post) => post._id !== postToDelete));
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting the post:', error);
      alert('Failed to delete the post. Please try again.');
    }
  };


  // Navigate to Edit Post page from Drafts
  const handleEditPost = (postId) => {
    navigate(`/dashboard/editPost/${postId}`, { state: { from: 'drafts' } });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">
      {drafts.length === 0 ? (
        <div className="text-center text-gray-500 font-semibold text-lg">
          No draft saved
        </div>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {drafts.map((draft) => (
            <div
              key={draft._id}
              className="bg-white rounded-lg shadow-md p-6 relative"
            >
              <h2 className="text-xl font-semibold mb-4 text-blue-600">
                {draft.jobTitle || 'No Title Available'}
              </h2>

              {draft.companyName && (
                <p className="text-gray-700 mb-2">
                  <strong>Company:</strong> {draft.companyName}
                </p>
              )}

              {draft.jobDescription && (
                <p className="text-gray-600 mb-4 whitespace-pre-line">
                  <strong>Description:</strong> {draft.jobDescription}
                </p>
              )}

              {draft.interviewAddress && (
                <p className="text-gray-700 mb-2">
                  <strong>Interview Address:</strong> {draft.interviewAddress}
                </p>
              )}

              {draft.interviewDate && (
                <p className="text-gray-700 mb-2">
                  <strong>Interview Date:</strong>{' '}
                  {new Date(draft.interviewDate).toLocaleDateString()}
                </p>
              )}

              {draft.startTime && (
                <p className="text-gray-700 mb-2">
                  <strong>Start Time:</strong>{' '}
                  {new Date(draft.startTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              )}

              {draft.endTime && (
                <p className="text-gray-700 mb-2">
                  <strong>End Time:</strong>{' '}
                  {new Date(draft.endTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              )}

              {draft.contactPerson && (
                <p className="text-gray-700 mb-4">
                  <strong>Contact:</strong> {draft.contactPerson}
                </p>
              )}

              {draft.slotBookingLink && (
                <a
                  href={draft.slotBookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 underline"
                >
                  Slot Booking Link
                </a>
              )}

              <hr className="my-4" />
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEditPost(draft._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Edit Post
                </button>

                <button
                  onClick={() => openDeleteModal(draft._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete Draft
                </button>
              </div>

              <p className="absolute bottom-2 right-2 text-xs text-gray-400">
                Posted on: {new Date(draft.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
        {/* Modal */}
        {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded shadow-lg">
                            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this post?</h3>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={closeDeleteModal}
                                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeletePost}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Delete Post
                                </button>
                            </div>
                        </div>
                    </div>
                )}
      </div>
    </div>
  );
};

export default Drafts;
