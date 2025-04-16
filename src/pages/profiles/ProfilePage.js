/*import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Fetch user info when component mounts
    const fetchUser = async () => {
      const res = await fetch('http://127.0.0.1:8000/profiles/me/', {
        credentials: 'include', // if using cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setUser(data);
      setImage(data.profileImageUrl); // or whatever field you use
    };

    fetchUser();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setIsUploading(true);

    const res = await fetch('http://127.0.0.1:8000/profiles/me', {
      method: 'POST',
      credentials: 'include', // or add auth headers
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setImage(data.profileImageUrl); // Update image in UI
    }

    setIsUploading(false);
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2>Welcome, {user.name}</h2>
      <img
        src={image || 'https://via.placeholder.com/150'}
        alt="Profile"
        width={150}
        height={150}
        style={{ borderRadius: '50%' }}
      />
      <div>
        <label htmlFor="upload">Change Profile Picture</label>
        <input id="upload" type="file" onChange={handleImageUpload} />
        {isUploading && <p>Uploading...</p>}
      </div>
      <div>
        <h3>Your Posts</h3>
        <p>(Coming soon...)</p>
      </div>
    </div>
  );
};

export default ProfilePage;*/

// ProfilePage.js using Axios

import { useEffect, useState } from 'react';
import api from '../../api/axiosDefaults';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('profiles/me/')
      .then((response) => {
        console.log('Fetched user profile:', response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.name || user.owner}</h2>
      {/* More profile info */}
    </div>
  );
};

export default ProfilePage;