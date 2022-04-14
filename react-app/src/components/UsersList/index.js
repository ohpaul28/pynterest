import React, { useEffect, useState } from 'react';
import { User } from '../User'

function UsersList({ setSelected }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      <div onClick={() => setSelected(<User user={user}/>)}>
        {user.first_name}{user.last_name}
      </div>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;
