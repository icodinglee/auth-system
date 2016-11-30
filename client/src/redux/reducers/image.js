const RECEIVE_UPLOADIMAGE = 'RECEIVE_UPLOADIMAGE';
const LOADING_UPLOADIMAGE = 'LOADING_UPLOADIMAGE';
const INVALIDATE_UPLOADIMAGE = 'INVALIDATE_UPLOADIMAGE';
const CLEAR_INFO = 'CLEAR_INFO';

const ACTION_HANDLERS = {
  [INVALIDATE_UPLOADIMAGE]: (state: dataOj, action) => {
    return { ...state, didInvalidate: true, loading: false, success: false, errMsg: action.dat }
  },
  [LOADING_UPLOADIMAGE]: (state: dataOj, action) => {
    return { ...state, loading: true }
  },
  [RECEIVE_UPLOADIMAGE]: (state: dataOj, action) => {
    console.log(action.data)
    return { ...state, didInvalidate: false, loading: false, success: true, data: action.data }
  }
}

const initialState = {didInvalidate: false, success: false, loading: false, errMsg: '', data: {}}

function image(state = initialState, action = Action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default image;