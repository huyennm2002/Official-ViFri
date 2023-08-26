import User from "../models/user.js";
import Item from '../models/item.js';
import { getAuthorization } from '../helpers/APIHelper.js';
import pkg from 'lodash';
import { handleUploadFile } from "../services/fileHandler.js";

const { isEmpty } = pkg;

export const getUserInfo = async (req, res) => {
    const { user_id } = getAuthorization(req.headers);
    try {
        const user = await User.get(user_id);
        const result = {
            id: user[0].id,
            first_name: user[0].first_name,
            last_name: user[0].last_name,
            email: user[0].email,
            avatar: user[0].avatar,
            dob: user[0].dob
        }
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: "Internal Sever error. Can't retrieve user info"});
    }
}

export const updateUserInfo = async (req, res) => {
    const { user_id } = getAuthorization(req.headers);

    if (req.file) {
        try {
            const avatarKey = `avatar_${user_id}.jpg`;
            await handleUploadFile(req.file, avatarKey);
        } catch(e) {
            console.log(e);
            return res.status(500).send({message: "Unable to upload avatar"});
        }
    } else if (isEmpty(req.body)) {
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

export const getItemList = async (req, res) => {
    const { user_id } = getAuthorization(req.headers);
    try {
        const data = await Item.getActiveItemList(user_id);
        return res.status(200).json(data);
    } catch(err) {
        return res.status(500).send({
            message: "Internal Sever Error. Unable to retrieve item list"
        });
    }
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