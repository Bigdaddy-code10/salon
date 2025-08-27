import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    // optionally: preview or upload
  };

  const handleSave = () => {
    // Add logic here to save updated name or upload image
    console.log("Saving name:", name);
    console.log("Uploading image:", image);
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* content */}

      <div className="max-w-md mx-auto p-6 mt-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow">
        <div className="w-14 h-14 bg-blue-200 text-blue-800 dark:bg-blue-600 dark:text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
          {user?.name?.[0]}
        </div>

        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
          My Profile
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
