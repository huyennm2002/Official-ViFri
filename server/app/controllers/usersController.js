import User from "../models/user.js";
import Item from '../models/item.js';
import { getAuthorization } from '../helpers/APIHelper.js';
import pkg from 'lodash';
import { handleUploadFile } from "../services/fileHandler.js";

const { isEmpty } = pkg;

export const getUserInfo = (req, res) => {
    const { user_id } = getAuthorization(req.headers);

    User.get(user_id, (err, data) => {
        if (err) {
            return res.status(500).send({message: "Cannot retrieve user info"})
        }
        const result = {
            id: data[0].id,
            first_name: data[0].first_name,
            last_name: data[0].last_name,
            email: data[0].email,
            avatar: data[0].avatar,
            dob: data[0].dob
        }
        return res.status(200).json(result);
    })
}

export const updateUserInfo = async (req, res) => {
    const { user_id } = getAuthorization(req.headers);

    if (req.file) {
        try {
            const avatarKey = `avatar_${user_id}.jpg`;
            await handleUploadFile(req.file, avatarKey);
            return res.status(201).end();
        } catch(e) {
            console.log(e);
            return res.status(500).send({message: "Unable to upload avatar"});
        }
    }

    if (isEmpty(req.body)) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    }
    let updatedInfo = req.body;
    User.update(updatedInfo, user_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "An error has occured while creating new user"
            })
        } else {
            return res.status(204).end();
        }
    })
}

export const getItemList = (req, res) => {
    const { user_id } = getAuthorization(req.headers);

    Item.getActiveItemList(user_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: "An error has occured"
            })
        }
        return res.status(200).json(data);
    })
}

export const getReminderList = (req, res) => {
    const { user_id } = getAuthorization(req.headers);

    Item.getReminder(user_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: "An error has occured"
            })
        }
        return res.status(200).json(data);
    })
}