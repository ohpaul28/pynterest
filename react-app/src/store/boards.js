const CREATED_BOARD = '/boards/createdBoard'
const READ_ALL_BOARDS = '/boards/readAllBoards'
const READ_USER_BOARDS = '/boards/readUserBoards'
const UPDATED_BOARD = '/boards/updatedBoard'
const DELETED_BOARD = '/boards/deletedBoard'
const UNPYNNED_BOARD = '/boards/unpynnedBoard'
const PYNNED_TO_BOARD = '/boards/pynnedToBoard'


//action creators for pyns
const createBoard = (payload) => {
  return {
    type: CREATED_BOARD,
    payload
  }
}

const readAllBoards = (payload) => {
  return {
    type: READ_ALL_BOARDS,
    payload
  }
}

const readUserBoards = (payload) => {
  return {
    type: READ_USER_BOARDS,
    payload
  }
}

const updateBoard = (payload) => {
  return {
    type: UPDATED_BOARD,
    payload
  }
}

const deleteBoard = (payload) => {
  return {
    type: DELETED_BOARD,
    payload
  }
}

const unpynBoard = (payload) => {
  return {
    type: UNPYNNED_BOARD,
    payload
  }
}

const pynToBoard = (payload) => {
  return {
    type: PYNNED_TO_BOARD,
    payload
  }
}


//thunks for boards

export const creatingBoard = (data) =>
async dispatch => {
  const res = await fetch('/api/boards/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  const newBoard = await res.json()
  dispatch(createBoard(newBoard))
  return newBoard
}


export const readingBoards = () =>
async dispatch => {
  const res = await fetch('/api/boards/')
  if (res.ok) {
    const boards = await res.json();
    dispatch(readAllBoards(boards))
    return boards
  }
}

export const readingUserBoards = (userId) =>
async dispatch => {
  const res = await fetch(`/api/boards/${userId}`)
  if (res.ok) {
    const boards = await res.json();
    dispatch(readAllBoards(boards))
    return boards
  }
}

export const updatingBoard = (data) =>
async dispatch => {
  const res = await fetch(`/api/boards/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  const updated = await res.json()
  if (res.ok) dispatch(updateBoard(updated))
  return updated
}

export const deletingBoard = (data) =>
async dispatch => {
  const res = await fetch(`/api/boards/${data}`, {
    method: 'DELETE'
  })
  const removedBoard = await res.json();
  dispatch(deleteBoard(removedBoard));
  return removedBoard
}

export const unpynningFromBoard = (id) =>
async dispatch => {
  const res = await fetch(`/api/boards/${id}/removeFromBoard/`, {
    method: 'PUT'
  })

  const updatedBoard = await res.json();
  dispatch(unpynBoard(updatedBoard));
  return updatedBoard

}

export const pynningToBoard = (id) =>
async dispatch => {
  const res = await fetch(`/api/boards/${id}/addToBoard/`, {
    method: 'PUT'
  })

  const updatedBoard = await res.json();
  dispatch(pynToBoard(updatedBoard));
  return updatedBoard

}


export default function boardReducer(state = {}, action) {
  const newState = {...state}

  switch (action.type) {
    case CREATED_BOARD: {
      newState[action.payload.id] = action.payload
      return newState;
    }
    case READ_ALL_BOARDS: {
      action.payload.boards.forEach(board => newState[`${board.id}`] = board)
      return newState;
    }
    case UPDATED_BOARD: {
      newState[action.payload?.id] = action.payload
      return newState;
    }
    case DELETED_BOARD: {
      delete newState[action.payload]
      return newState;
    }
    case PYNNED_TO_BOARD: {
      newState[action.payload?.id] = action.payload
      return newState;
    }
    case UNPYNNED_BOARD: {
      newState[action.payload?.id] = action.payload
      return newState;
    }
    default:
      return state
  }
}
