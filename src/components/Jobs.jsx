import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const navigate = useNavigate();

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
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/getPosts`);
                setPosts(response.data);
            } catch (err) {
                console.error('Error fetching posts:', err);
            }
        };

        fetchPosts();
    }, []);


    // Navigate to Edit Post page with origin tracking
    const handleEditPost = (postId) => {
        navigate(`/dashboard/editPost/${postId}`, { state: { from: 'all-posts' } });
    };

    const handleDeletePost = async () => {
        if (!postToDelete) return;
    
        try {
          await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/deleteJobPost/${postToDelete}`);
          setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postToDelete));
          closeDeleteModal();
        } catch (error) {
          console.error('Error deleting the post:', error);
          alert('Failed to delete the post. Please try again.');
        }
      };

    


    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <div className="container mx-auto px-4">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div key={post._id} className="bg-white rounded-lg shadow-md p-6 relative">
                            <h2 className="text-xl font-semibold mb-4 text-blue-600">
                                {post.jobTitle || 'No Title Available'}
                            </h2>

                            {post.companyName && (
                                <p className="text-gray-700 mb-2">
                                    <strong>Company:</strong> {post.companyName}
                                </p>
                            )}

                            {post.jobDescription && (
                                <p className="text-gray-600 mb-4 whitespace-pre-line">
                                    <strong>Description:</strong> {post.jobDescription}
                                </p>
                            )}

                            {post.interviewAddress && (
                                <p className="text-gray-700 mb-2">
                                    <strong>Interview Address:</strong> {post.interviewAddress}
                                </p>
                            )}

                            {post.interviewDate && (
                                <p className="text-gray-700 mb-2">
                                    <strong>Interview Date:</strong> {new Date(post.interviewDate).toLocaleDateString()}
                                </p>
                            )}

                            {post.startTime && (
                                <p className="text-gray-700 mb-2">
                                    <strong>Start Time:</strong> {new Date(post.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            )}

                            {post.endTime && (
                                <p className="text-gray-700 mb-2">
                                    <strong>End Time:</strong> {new Date(post.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            )}

                            {post.contactPerson && (
                                <p className="text-gray-700 mb-4">
                                    <strong>Contact:</strong> {post.contactPerson}
                                </p>
                            )}

                            {post.slotBookingLink && (
                                <a
                                    href={post.slotBookingLink}
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
                                    onClick={() => handleEditPost(post._id)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                >
                                    Edit Post
                                </button>

                                <button
                                    onClick={() => openDeleteModal(post._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                >
                                    Delete Post
                                </button>
                            </div>

                            <p className="absolute bottom-2 right-2 text-xs text-gray-400">
                                Posted on: {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
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

export default Jobs;
