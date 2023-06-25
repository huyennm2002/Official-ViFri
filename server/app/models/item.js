import { query } from "express";
import sql from "../../config/sql.js";

const Item = function(item) {
    this.name = item.name;
    this.image = item.image;
    this.quantity = item.quantity;
    this.unit = item.unit;
    this.expiration = item.expiration;
    this.grocery_product_id = item.grocery_product_id;
    this.user_id = item.user_id;
}

Item.create = (newItem, result) => {
    let query = "INSERT INTO items SET ?"
    sql.query(query, newItem, (err, res)=> {
        if (err) {
            console.log("Failed to create add new item: ", err);
            result(err, null);
            return;
        }
        return result(null, res);
    })
}

Item.get = (id, result) => {
    let query = `SELECT id, name, image, quantity, unit, expiration, grocery_product_id, added_time, is_active, user_id FROM items WHERE id = ?`;
    sql.query(query, [id], (err, res) => {
        if (err) {
            console.log("Cannot get: ", err);
            result(err,null);
        } else {
            console.log("Item: ", res);
            result(null,res);
        }
    })
}

Item.update = (updated_info, id, result) => {
    let query = `UPDATE items SET ? WHERE id = ?`;
    sql.query(query, [updated_info, id], (err, res) => {
        if (err) {
            console.log("Cannot update: ", err);
            result(err,null);
        } else {
            console.log("Updated: ", res);
            result(null,res);
        }
    })
}

Item.getActiveItemList = (user_id, result) => {
    let query = `SELECT id, name, image, quantity, unit, expiration, grocery_product_id FROM items WHERE user_id = ? AND is_active = true`;
    sql.query(query, [user_id], (err, res) => {
        if (err) {
            result(err,null);
        } else {
            console.log("Item list: ", res);
            result(null,res);
        }
    })
}

Item.getReminder = (user_id, result) => {
    let query = `SELECT * FROM items WHERE user_id = ? and is_active = 1 AND expiration BETWEEN CURRENT_DATE() AND DATE_ADD(CURRENT_DATE(), INTERVAL 2 DAY) ORDER BY expiration ASC`
    sql.query(query, [user_id], (err, res) => {
        if (err) {
            result(err,null);
        } else {
            result(null,res);
        }
    })
}

export default Item;