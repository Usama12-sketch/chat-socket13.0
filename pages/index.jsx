// pages/UserPage.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const UserPage = () => {
  const session = useSession()
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://node-js-usama-project.onrender.com/api/users`);
        const userData = await response.json();
        setUser(userData);
        console.log(userData)
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      {/* Render additional user data here */}
    </div>
  );
};

export default UserPage;
