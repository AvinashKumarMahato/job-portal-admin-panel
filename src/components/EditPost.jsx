import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({
    postId,
    jobTitle: '',
    companyName: '',
    jobDescription: '',
    interviewDate: '',
    startTime: '',
    endTime: '',
    interviewAddress: '',
    slotBookingLink: '',
    contactPerson: ''
  });

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/update/${postId}`);
        setValues((prevValues) => ({
          ...prevValues,
          jobTitle: data.jobTitle,
          companyName: data.companyName,
          jobDescription: data.jobDescription,
          interviewDate: formatDate(data.interviewDate),
          startTime: formatTime(data.startTime),
          endTime: formatTime(data.endTime),
          interviewAddress: data.interviewAddress,
          slotBookingLink: data.slotBookingLink,
          contactPerson: data.contactPerson
        }));
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [postId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[1].slice(0, 5); // HH:MM format
  };

  const handleChange = (field, value) => {
    setValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure startTime and endTime are in the correct format for the backend
    const { startTime, endTime } = values;
    const formattedStartTime = startTime ? startTime + ":00" : '';
    const formattedEndTime = endTime ? endTime + ":00" : '';

    const updatedValues = {
      ...values,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    };

    try {
      await axios.put(`http://localhost:3001/update/${postId}`, updatedValues);
      navigate('/dashboard/all-posts');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleCancel = () => {
    const backTo = location.state?.from === 'all-posts' ? '/dashboard/all-posts' : '/dashboard/drafts';
    navigate(backTo);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-center">Edit Job Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Job Title"
                value={values.jobTitle}
                onChange={(e) => handleChange('jobTitle', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Company Name"
                value={values.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Job Description"
                value={values.jobDescription}
                onChange={(e) => handleChange('jobDescription', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
              <input
                type="date"
                value={values.interviewDate}
                onChange={(e) => handleChange('interviewDate', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                value={values.startTime}
                onChange={(e) => handleChange('startTime', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                value={values.endTime}
                onChange={(e) => handleChange('endTime', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Interview Address"
                value={values.interviewAddress}
                onChange={(e) => handleChange('interviewAddress', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="url"
                placeholder="Slot Booking Link"
                value={values.slotBookingLink}
                onChange={(e) => handleChange('slotBookingLink', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Contact Person"
                value={values.contactPerson}
                onChange={(e) => handleChange('contactPerson', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none"
              >
                Update Post
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
