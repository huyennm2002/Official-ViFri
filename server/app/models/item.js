import { NoSuchKey } from "@aws-sdk/client-s3";
import { query } from "express";
import sql from "../../config/sql.js";
import { promisify } from "util";
import { runQuery } from "../../common/sqlUtils.js";

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

Item.getActiveItemList = async (user_id, result) => {
    let query = `SELECT id, name, image, quantity, unit, expiration, grocery_product_id FROM items WHERE user_id = ? AND is_active = true`;
    try {
        const rows = await runQuery(query, [user_id]);
        return rows;
    } catch(err) {
        throw err;
    }
    // sql.query(query, [user_id], (err, res) => {
    //     if (err) {
    //         result(err,null);
    //     } else {
    //         console.log("Item list: ", res);
    //         result(null,res);
    //     }
    // })
}

Item.getTotalItemsInFridge = async (user_id) => {
    let query = `SELECT COUNT(*) AS total_count FROM items where is_active = true and quantity > 0 and user_id = ?;`;
    try {
        const rows = await runQuery(query, [user_id]);
        return rows[0].total_count;
    } catch(err) {
        throw err;
    }
}

Item.getTotalExpiredItemsInFridge = async (user_id, result) => {
    let query = "SELECT COUNT(*) AS expired_count FROM items where is_active = true and quantity = 0 and user_id = ?;";
    try {
        const rows = await runQuery(query, [user_id]);
        return rows[0].expired_count;
    } catch(err) {
        throw err;
    }
}

Item.getTotalItemsExpiringInOneDay = async (user_id, result) => {
    const connection = await sql.getConnection();
    let query = "SELECT COUNT(*) AS expiring_today_count FROM items where is_active = true and quantity > 0 and DATEDIFF(expiration, CURDATE()) = 1 and user_id=?;";
    try {
        const rows = await runQuery(query, [user_id]);
        return rows[0].expiring_today_count;
    } catch(err) {
        throw err;
    }
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