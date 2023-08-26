import Item from "../models/item.js";
import { handleUploadFile } from "../services/fileHandler.js";
import { getAuthorization } from "../helpers/APIHelper.js";
import { rest } from "lodash";

export const addItem = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty"
        })
        return;
    }
    let imageUrl = ''
    if (req.file) {
        imageUrl = await handleUploadFile(req.file, req.file.filename);
    }
    const { user_id } = getAuthorization(req.headers)
    const newItem = new Item({
        name: req.body.name,
        image: imageUrl ? req.file?.filename : '',
        quantity: req.body.quantity,
        unit: req.body.unit,
        expiration: new Date(req.body.expiration),
        grocery_product_id: null,
        user_id
    })

    try {
        const rows = Item.create(newItem);
        return res.status(201).json(newItem);
    } catch(err) {
        return res.status(500).send({
            message: "Internal Sever Error. Unable to add new item"
        })
    }
}

export const getItemInfo = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty"
        });
    }
    const { user_id } = getAuthorization(req.headers);
    const { id } = req.query;

    try {
        const data = await Item.get(id);
        if (data[0].user_id === user_id) {
            return res.status(200).json(data[0]);
        } else {
            return res.status(403).send({
                message: "Unauthorized user"
            });
        }
    } catch(err) {
        return res.status(500).send({
            message: "Internal Sever Error. Unable to retrieve item info"
        });
    }
}

export const updateItemInfo = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty"
        });
    }
    const { user_id } = getAuthorization(req.headers);
    const updatedInfo = req.body;

    try {
        const data = await Item.get(updatedInfo.id);
        if (data[0].user_id !== user_id) {
            return res.status(403).send({
                message: "Unauthorized to update items"
            })
        }
        const rows = await Item.update(updatedInfo, updatedInfo.id);
        return res.status(200).json(updatedInfo);
    } catch (err) {
        return res.status(500).send({
            message: "Internal Error. Unable to udpate item"
        })
    }
}

export const deleteItem = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty"
        });
    }
    const { user_id } = getAuthorization(req.headers);
    const { id } = req.query;

    try {
        const data = await Item.get(id);

        if (data[0].user_id !== user_id) {
            return res.status(403).send({
                message: "Unauthorized to delete items"
            })
        }

        const rows = await Item.update({ is_active: false}, id);
        return res.status(204).end();
    } catch(err) {
        return res.status(500).send({
            message: "Internal Server Error. Unable to delete item"
        })
    }
}

export const getSummary = async (req, res) => {
    // const { user_id } = getAuthorization(req.headers);
    // console.log("user id is: " + user_id);
    // const result = new Object();
    // try {
    //     const totalItems = await Item.getTotalItemsInFridge(user_id);
    //     const totalExpiredItems = await Item.getTotalExpiredItemsInFridge(user_id);
    //     const totalExpiringInOneDay = await Item.getTotalItemsExpiringInOneDay(user_id);
        
    //     const result = {
    //         totalItems,
    //         totalExpiredItems,
    //         totalExpiringInOneDay
    //     }
    //     return res.json(result);
    // } catch(error) {
    //     console.log(error)
    //     return res.status(500).send({
    //         message: "Unable to fetch summarries of items"
    //     })
    // }
}