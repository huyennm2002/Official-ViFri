import { query } from "express";
import sql from "../../config/sql.js";
import { runQuery} from "../../common/sqlUtils.js";

const User = function(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.encrypted_password = user.encrypted_password;
    this.dob = user.dob;
    this.avatar = user.avatar;
    this.provider = user.provider;
}

User.create = async (newUser, result) => {
    let query = "INSERT INTO users SET ?";
    try {
        const rows = await runQuery(query, [newUser]);
        return rows.insertId;
    } catch(err) {
        throw err;
    }
}

User.get = async (id) => {
    let query = `SELECT * FROM users WHERE id = ?`;
    try {
        const rows = await runQuery(query, [id]);
        return rows;
    } catch(err) {
        throw err;
    }
}

User.update = (updated_user, id, result) => {
    let query = `UPDATE users SET ? WHERE id = ?`;
    sql.query(query, [updated_user, id], (err, res) => {
        if (err) {
            console.log("Cannot update: ", err);
            result(err,null);
        } else {
            console.log("All users: ", res);
            result(null,res);
        }
    })
}

User.getFromEmail = async (email) => {
    let query = `SELECT * FROM users WHERE email = ?`;
    try {
        const rows = await runQuery(query, [email]);
        return rows;
    } catch(err) {
        throw err;
    }
}

export default User;
