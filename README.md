# Admin Panel Documentation

## Overview
The **Admin Panel** is designed for managing job and blog posts and handling user messages. It consists of four main pages: **All Posts**, **Create Post**, **Drafts**, and **Messages**. The tech stack for the admin panel includes **React.js** and **Tailwind CSS**.

---

## Live Preview
You can access the live version of the admin panel here:  
**Admin Panel Live Preview**:[https://job-portal-admin-panel-omega.vercel.app/](https://job-portal-admin-panel-omega.vercel.app/)

---

## Setup and Installation

### Prerequisites
- **Node.js** (v16 or later)
- **npm** or **yarn**
- Code editor (e.g., Visual Studio Code)

### Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**
   Run the following command to install all the required packages:
   ```bash
   npm install
   ```
   Or, if using yarn:
   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add necessary environment variables (e.g., API keys, backend URL). Example:
   ```env
   REACT_APP_API_URL=<your-backend-api-url>
   ```

4. **Start the Development Server**
   To run the application locally:
   ```bash
   npm start
   ```
   Or, if using yarn:
   ```bash
   yarn start
   ```
   The application will be available at `http://localhost:3000`.

5. **Build for Production**
   To create an optimized build for production:
   ```bash
   npm run build
   ```
   Or, if using yarn:
   ```bash
   yarn build
   ```
   The build files will be located in the `build` directory.

---

## Pages and Features

### 1. **All Posts**
This page allows you to manage all published job and blog posts.

#### Tabs:
- **Jobs**
  - Displays all published job posts.
  - Actions:
    - **Edit**: Modify existing job posts.
    - **Delete**: Permanently remove job posts.
- **Blogs**
  - Displays all published blog posts.
  - Actions:
    - **Edit**: Modify existing blog posts.
    - **Delete**: Permanently remove blog posts.

---

### 2. **Create Post**
This page allows you to create and manage draft job and blog posts.

#### Tabs:
- **Jobs**
  - Create new job posts.
  - Options:
    - **Save to Draft**: Save the post as a draft.
    - **Publish**: Make the post publicly available.
- **Blogs**
  - Create new blog posts.
  - Options:
    - **Save to Draft**: Save the post as a draft.
    - **Publish**: Make the post publicly available.

---

### 3. **Drafts**
This page lists all job and blog posts saved as drafts.

#### Tabs:
- **Jobs**
  - Displays all draft job posts.
  - Actions:
    - **Edit**: Modify draft job posts.
    - **Delete**: Permanently remove draft job posts.
- **Blogs**
  - Displays all draft blog posts.
  - Actions:
    - **Edit**: Modify draft blog posts.
    - **Delete**: Permanently remove draft blog posts.

---

### 4. **Messages**
This page displays all messages sent by users via the **Contact Us** page on the user panel.

#### Features:
- View all received messages.
- Option to delete messages.

---

## Tech Stack
- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS

---

## Notes
- The admin panel is focused on ease of use for managing posts and messages.
- Ensure all changes to posts (edit/delete) are confirmed before saving to avoid accidental data loss.
- Test the panel thoroughly before deploying any updates.

---

## Future Enhancements
Consider adding the following features:
- Search functionality for posts and messages.
- Filters for job posts and blog posts by category or date.
- Notifications for new messages received.
