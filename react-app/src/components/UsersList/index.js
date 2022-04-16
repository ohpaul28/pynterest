import React, { useEffect, useState, useContext } from 'react';
import SelectedContext from '../context/selectedContext';
import { User } from '../User'

function UsersList() {
  const [users, setUsers] = useState([]);
  const { setSelected } = useContext(SelectedContext)

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
      <div>{userComponents}</div>
    </>
  );
}

export default UsersList;
