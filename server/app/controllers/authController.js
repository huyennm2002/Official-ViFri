import bcrypt from 'bcrypt';
import { response } from 'express';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import { handleUploadFile } from '../services/fileHandler.js';

const hashPassword = (password) => {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
}

const checkPassword = (password, User) => {
    const match = bcrypt.compareSync(password, User.encrypted_password);
    return match;
}

export const createUser = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty"
        })
        return;
    }
    try {
        const data = await User.getFromEmail(req.body.email.toLowerCase());
        if (data.length > 0) {
            return res.status(409).send({message: "User already exist!"});
        }
        
        const newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            encrypted_password: hashPassword(req.body.password),
            dob: new Date(req.body.dob) || null,
            avatar: 0,
        })
        const insertId = await User.create(newUser);
        const avatarKey = `avatar_${insertId}.jpg`;

        if (req.file) {
            try {
                await handleUploadFile(req.file, avatarKey);
                return res.status(201).end();
            } catch(e) {
                return res.status(200).send({message: "Unable to upload avatar"});
            }
        }
    } catch(err) {
        return res.status(500).send({ message: "Internal Error. Unable to create user"});
    } 
};

export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.getFromEmail(email);
        console.log(user);
        if (user.length > 0 && checkPassword(password, user[0])) {
            const token = jwt.sign(
                { user_id: user[0].id, email },
                process.env.TOKEN_KEY,
                { expiresIn: "2h" }
            );
            console.log(token);
            return res.status(200).send(token);
        }
        return res.status(401).send({
            message: "Invalid Credentials"
        });
    } catch(err) {
        console.log(err);
        return res.status(500).send({message: "Internal Error"});
    }
}

export const logOut = (req, res) => {
    const { token } = req.headers;
    jwt.sign(token, "", { expiresIn: 1 } , (logout, err) => {
        if (logout) {
            return res.send({message : 'You have been Logged Out' });
        }
        return res.send({msg:'Error'});
    })
}