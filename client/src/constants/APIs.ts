const HOSTNAME = '10.0.75.128'
export const AUTHENTICATED_AXIOS_HEADER = (token: string)  => ({
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${token}`
});
export const AUTHENTICATED_AXIOS_HEADER_FORM = (token: string)  => ({
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${token}`,
    'content-type': 'multipart/form-data'
});
export const LOGIN_API = `http://${HOSTNAME}:3005/login`
export const LOGOUT_API = `http://${HOSTNAME}:3005/logout`
export const SIGNUP_API = `http://${HOSTNAME}:3005/signup`
export const GET_USER_INFO_API = `http://${HOSTNAME}:3005/users`
export const GET_USER_ITEM_LIST_API = `http://${HOSTNAME}:3005/users/items`
export const ITEMS_API = `http://${HOSTNAME}:3005/items`