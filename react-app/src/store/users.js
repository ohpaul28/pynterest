const GET_USERS = 'users/GET_USERS';

const getUsers = (payload) => {
  return {
    type: GET_USERS,
    payload
  }
}

export const gettingUsers = () =>
async dispatch => {
  const res = await fetch('api/users/')
  const data = await res.json()
  dispatch(getUsers(data))
}


export default function usersReducer(state = {}, action) {
  const newState = {...state}
  switch (action.type) {
    case GET_USERS: {
      action.payload.users?.forEach(user => newState[user.id] = user)
      return newState
    }
    default:
      return state;
  }
}
