export const USER_SIGN_IN = (data) => ({
    type: 'USER_SIGN_IN',
    payload: data
})
export const USER_LOG_OUT = { type: 'USER_LOG_OUT' }
export const UPDATE_USER = (payload) => ({
    type: 'UPDATE_USER',
    payload
})
export const ADD_ITEM = { type: 'ADD_ITEM' }
export const UPDATE_ITEM = (payload) => ({
    type: 'UPDATE_ITEM',
    payload
})
export const DELETE_ITEM = (payload) => ({
    type: 'DELETE_ITEM',
    payload
})