//actions for pyns
const CREATED_PYN = '/pyns/createdPyn'
const READ_ONE_PYN = '/pyns/readOnePyn'
const READ_ALL_PYNS_HOME = '/pyns/readAllPyns'
const UPDATED_PYN = '/pyns/updatedPyn'
const DELETED_PYN = '/pyns/deletedPyn'
const CREATED_COMMENT = '/comments/createdComment'
const READ_PYN_COMMENTS = '/comments/readPynComments'
const UPDATED_COMMENT = '/comments/updateComment'
const DELETED_COMMENT = '/comments/deleteComment'

//action creators for pyns
const createPyn = (payload) => {
  return {
    type: CREATED_PYN,
    payload
  }
}

const readOnePyn = (payload) => {
  return {
    type: READ_ONE_PYN,
    payload
  }
}

const readAllPynsHome = (payload) => {
  return {
    type: READ_ALL_PYNS_HOME,
    payload
  }
}

const updatePyn = (payload) => {
  return {
    type: UPDATED_PYN,
    payload
  }
}

const deletePyn = (payload) => {
  return {
    type: DELETED_PYN,
    payload
  }
}

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


//thunks for pyns
export const creatingPyns = (data) =>
async dispatch => {
  const res = await fetch('/api/pyns/', {
    method: 'POST',
    body: data
  });
  const newPyn = await res.json()
  if (newPyn.errors) {
    return Object.values(newPyn.errors)
  } else {
    await dispatch(createPyn(newPyn))
    return newPyn
  }

}

export const readingOnePyn = (id) =>
async dispatch => {
  const res = await fetch(`/api/pyns/${id}`)
  if (res.ok) {
    const pyn = await res.json();
    dispatch(readOnePyn(pyn))
    return pyn
  }
}

export const readingAllPyns = () =>
async dispatch => {
  const res = await fetch('/api/pyns/')
  if (res.ok) {
    const pyns = await res.json();
    dispatch(readAllPynsHome(pyns))
    return pyns
  }
}

export const updatingPyn = (formData) =>
async dispatch => {
  const res = await fetch(`/api/pyns/${formData.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  const update = await res.json()

  if (update.errors) {
    return update.errors
  } else {
    dispatch(updatePyn(update));
    return update;
  }
}

export const deletingPyn = (id) =>
async dispatch => {
  const res = await fetch(`/api/pyns/${id}`, {
    method: 'DELETE'
  })
  const removedPyn = await res.json();
  dispatch(deletePyn(id));
  return removedPyn
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
  const res = await fetch(`/api/comments/${pynId}`)
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
    return deleted
  }
}


export default function reducer(state = {}, action) {
  const newState = {...state}
  switch (action.type) {
    case CREATED_PYN: {
      newState[action.payload?.id] = action.payload
      return newState;
    }
    case READ_ALL_PYNS_HOME: {
      action.payload.pyns.forEach(pyn => newState[`${pyn.id}`] = pyn)
      return newState
    }
    case READ_ONE_PYN: {
      newState[action.payload?.id] = action.payload
      return newState
    }
    case UPDATED_PYN: {
      newState[action.payload?.id] = action.payload
      return newState
    }
    case DELETED_PYN: {
      delete newState[action.payload]
      return newState;
    }
    case CREATED_COMMENT: {
      newState[action.payload.pyn_id].comments[action.payload.id] = action.payload
      return newState
    }
    case DELETED_COMMENT: {
      delete newState[action.payload.pyn_id].comments[action.payload.id]
      return newState
    }
    default:
      return state;
  }
}
