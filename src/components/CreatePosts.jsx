import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation

const CreatePosts = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [interviewAddress, setInterviewAddress] = useState("");
  const [slotBookingLink, setSlotBookingLink] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isError, setIsError] = useState(false); // Error state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [modalMessage, setModalMessage] = useState(""); // Unified modal message
  const [modalButtons, setModalButtons] = useState([]); // Buttons for modal

  const navigate = useNavigate();

  const postData = {
    jobTitle,
    companyName,
    jobDescription,
    interviewAddress,
    slotBookingLink,
    contactPerson,
    interviewDate: interviewDate ? new Date(interviewDate).toISOString() : null,
    startTime: startTime ? new Date(`${interviewDate}T${startTime}`).toISOString() : null,
    endTime: endTime ? new Date(`${interviewDate}T${endTime}`).toISOString() : null
  };

  // Submit Post
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/posts`, postData);
      setModalMessage("Post Published Successfully!");
      setModalButtons([
        { text: "View Posts", action: () => navigate('/dashboard/all-posts') },
        { text: "Close", action: handleModalClose }
      ]);
      setIsError(false);
      setIsModalOpen(true); // Show modal on success
    } catch (error) {
      setModalMessage("Failed to create post. Please try again.");
      setIsError(true);
      setIsModalOpen(true); // Show modal on error
    }
  };

  // Save Draft
  const handleSaveDraft = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/drafts`, postData);
      setModalMessage("Draft Saved Successfully!");
      setModalButtons([
        { text: "View Draft", action: () => navigate('/dashboard/drafts') },
        { text: "Close", action: handleModalClose }
      ]);
      setIsError(false);
      setIsModalOpen(true); // Show modal on success
    } catch (error) {
      setModalMessage("Failed to save draft. Please try again.");
      setIsError(true);
      setIsModalOpen(true); // Show modal on error
    }
  };

  const handleModalClose = () => {
    // Reset all form fields by resetting the state variables
    setJobTitle("");
    setCompanyName("");
    setJobDescription("");
    setInterviewAddress("");
    setSlotBookingLink("");
    setContactPerson("");
    setInterviewDate("");
    setStartTime("");
    setEndTime("");


    setIsModalOpen(false);

    // Navigate internally to the create post page without reloading
    navigate('/dashboard/createAllPost');

  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-center">Create Job Post</h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Input fields */}
              <input
                type="text"
                placeholder="Job Title"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Company Name"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
              <textarea
                placeholder="Job Description"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              />
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                required
              />
              <input
                type="time"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
              <input
                type="time"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
              <input
                type="text"
                placeholder="Interview Address"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={interviewAddress}
                onChange={(e) => setInterviewAddress(e.target.value)}
                required
              />
              <input
                type="url"
                placeholder="Slot Booking Link"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={slotBookingLink}
                onChange={(e) => setSlotBookingLink(e.target.value)}
              />
              <input
                type="text"
                placeholder="Contact Person"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
              />

              <button
                type="button"
                onClick={handleSaveDraft}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
              >
                Save Draft
              </button>

              <button
                type="submit"
                className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none"
              >
                Publish
              </button>
            </form>

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
        </div>
      </div>
    </div>
  );
};

export default CreatePosts;
