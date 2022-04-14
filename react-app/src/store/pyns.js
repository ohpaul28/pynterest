//actions for pyns
const CREATED_PYN ='/pyns/createdPyn'
const READ_ALL_PYNS = '/pyns/readAllPyns'
const UPDATED_PYN = '/pyns/updatedPyn'
const DELETED_PYN = '/pyns/deletedPyn'


//action creators for pyns
const createPyn = (payload) => {
  return {
    type: CREATED_PYN,
    payload
  }
}

const readAllPyns = (payload) => {
  return {
    type: READ_ALL_PYNS,
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


//thunks for pyns
export const creatingPyns = (data) =>
async dispatch => {
  // const dataObj = {

  // }
  // for (let pair of data.entries()) {
  //   // console.log(`${pair[0]}, ${pair[1]}`);}
  //   dataObj[pair[0]] = pair[1]
  // }
  console.log(JSON.stringify(data))
  // console.log(dataObj)

  const res = await fetch('/api/pyns', {
    method: 'POST',
    body: data
  });
  // console.log(JSON.stringify({data}))

  const newPyn = await res.json()
  console.log(newPyn)


  // if (newPyn.error) {
  //   return newPyn.error
  // } else {
  //   await dispatch(createPyn(newPyn));
  //   return newPyn
  // }
}

export const readingAllPyns = () =>
async dispatch => {
  const res = await fetch('/api/pyns')
  if (res.ok) {
    const pyns = await res.json();
    dispatch(readAllPyns(pyns))
    return pyns
  }
}

export const updatingPyn = (formData) =>
async dispatch => {
  const res = await fetch(`/api/pyns/${formData.id}`, {
    method: 'PUT',
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
  dispatch(deletePyn(removedPyn));
  return removedPyn
}


// export default function reducer(state = {}, action) {
//   switch (action.type) {
//     case
//   }
// }
