import Item from "../models/item.js";
import { handleUploadFile } from "../services/fileHandler.js";
import { getAuthorization } from "../helpers/APIHelper.js";

export const addItem = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty"
        })
        return;
    }
    let imageUrl = ''
    if (req.file) {
        imageUrl = handleUploadFile(req.file, req.file.filename);
    }
    console.log(imageUrl);
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

    Item.create(newItem, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: "An error has occured"
            })
        } else {
            return res.status(201).end();
        }
    })
}

export const getItemInfo = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty"
        });
    }
    const { user_id } = getAuthorization(req.headers);
    const { id } = req.query;
    Item.get(id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: "An error has occured"
            })
        }
        if (data[0].user_id === user_id) {
            return res.status(200).json(data[0]);
        }
        return res.status(403).end();
    })
}

export const updateItemInfo = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty"
        });
    }
    const { user_id } = getAuthorization(req.headers);
    const updatedInfo = req.body;
    Item.get(updatedInfo.id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: "An error has occured"
            })
        }
        if (data[0].user_id !== user_id) {
            return res.status(403).end();
        }
    })

    Item.update(updatedInfo, updatedInfo.id, (err, data) => {
        if (err) return res.status(500).send({message: "An error has occured"});
        return res.status(200).end();
    })
}

export const deleteItem = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty"
        });
    }
    const { user_id } = getAuthorization(req.headers);
    const { id } = req.query;
    Item.get(id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: "An error has occured"
            })
        }
        if (data[0].user_id !== user_id) {
            return res.status(403).end();
        }
    })

    Item.update({ is_active: false }, id, (err, data) => {
        if (err) return res.status(500);
    })
    return res.status(204).end();
}