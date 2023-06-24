import jwt from 'jsonwebtoken';

export const getAuthorization = (header) => {
    const token = header.authorization.split(' ')[1];
    return jwt.verify(token, process.env.TOKEN_KEY);
}