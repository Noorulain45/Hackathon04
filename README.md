# Hackathon OTT Streaming Platform (StreamVibe)

Welcome to the full-stack OTT streaming platform created for Hackathon 04! This project features role-based access control, a full admin panel for uploading and managing movies/shows, video streaming with categorized genres (Action, Drama, Comedy, Horror, etc), and a modern, responsive UI design.

## Technical Stack
- **Frontend**: React.js, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Media Hosting**: Cloudinary

## Quick Features
1. **User Authentication** - Role-based login and registration system. 
2. **Subscriptions System** - Only subscribed users or admins can watch exclusive content.
3. **Superadmin Dashboard** - Fully functional dashboard to upload new movies, manage users, and restrict user access.
4. **Dynamic Media Content** - Play videos, view custom thumbnails, and browse genres dynamically fetched from the database.

---

## 🔐 Login Credentials (Testing Data)

You can use the following pre-configured credentials to evaluate the project.

### Admin Account
The admin has full access to the Superadmin Dashboard to manage users, restrict access, and upload, edit, or delete content.

- **Email**: `admin@streamvibe.com`
- **Password**: `admin123`

### Standard User Accounts
These users can navigate the platform, manage subscriptions, and watch content if their plan is active.

- **Email**: `noor2@gmail.com`
- **Password**: `user123`

- **Email**: `Annie1@gmai.com`
- **Password**: `user123`

- **Email**: `noorr@gmail.com`
- **Password**: `user123`

---

## Local Development Setup

To run the platform locally, follow these steps:

1. Clone the repository
2. Open two terminal instances.
3. **Run the Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   # Make sure the backend server starts successfully and connects to MongoDB
   ```
4. **Run the Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
5. Navigate to `http://localhost:5173` to view the app in your browser!
