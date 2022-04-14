import React from 'react';


export const User = ({ user }) => {
  return (
    <div>
      <div>
        <strong>User Id</strong> {user.id}
      </div>
      <div>
        <strong>First Name</strong> {user.first_name}
      </div>
      <div>
        <strong>Last Name</strong> {user.last_name}
      </div>
      <div>
        <strong>Email</strong> {user.email}
      </div>
    </div>
  );
}
