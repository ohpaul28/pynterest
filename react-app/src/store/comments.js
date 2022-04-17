const CREATED_COMMENT = '/comments/createdComment'
const READ_PYN_COMMENTS = '/comments/readPynComments'
const UPDATED_COMMENT = '/comments/updateComment'
const DELETED_COMMENT = '/comments/deleteComment'


//action creators for comments
const createComment = (payload) => {
  return {
    type: CREATED_COMMENT,
    payload
  }
}

const readPynComments = (payload) => {
  return {
    type: READ_PYN_COMMENTS,
    payload
  }
}

const updateComment = (payload) => {
  return {
    type: UPDATED_COMMENT,
    payload
  }
}

const deleteComment = (payload) => {
  return {
    type: DELETED_COMMENT,
    payload
  }
}


//thunks for comments
export const creatingComment = (data) =>
async dispatch => {
  const res = await fetch('/api/comments/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  const newComment = await res.json()
  if (res.ok) dispatch(createComment(newComment))
  return newComment
}


export const readingPynComments = (pynId) =>
async dispatch => {
  const res = await fetch(`/api/comments/${pynId}/`)
  if (res.ok) {
    const comments = await res.json();
    dispatch(readPynComments(comments))
    return comments
  }
}


export const updatingComment = (data) =>
async dispatch => {
  const res = await fetch(`/api/comments/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  const updated = await res.json()
  if (res.ok) dispatch(updateComment(updated))
  return updated
}


export const deletingComment = (commentId) =>
async dispatch => {
  const res = await fetch(`/api/comments/${commentId}`,{
    method: 'DELETE'
  })
  if (res.ok) {
    const deleted = await res.json()
    dispatch(deleteComment(deleted));
    return deleted.id
  }
}


export default function commentsReducer(state = {}, action) {
  const newState= {...state}

  switch (action.type) {
    case CREATED_COMMENT: {
      newState[action.payload?.id] = action.payload
      return newState
    }
    case READ_PYN_COMMENTS: {
      action.payload?.comments.forEach((comment) => newState[comment.id] = comment)
      return newState
    }
    case UPDATED_COMMENT: {
      newState[action.payload?.id] = action.payload
      return newState
    }
    case DELETED_COMMENT: {
      delete newState[action.payload]
      return newState
    }
    default:
      return state
  }
}
