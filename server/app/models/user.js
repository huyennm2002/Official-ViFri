import { query } from "express";
import sql from "../../config/sql.js";

const User = function(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.encrypted_password = user.encrypted_password;
    this.dob = user.dob;
    this.avatar = user.avatar;
    this.provider = user.provider;
}

User.create = (newUser, result) => {
    let query = "INSERT INTO users SET ?"
    sql.query(query, newUser, (err, res)=> {
        if (err) {
            console.log("Failed to create new user: ", err);
            result(err, null);
            return;
        }
        result(null, res.insertId);
        return;
    })
}

User.get = (id, result) => {
    let query = `SELECT * FROM users WHERE id = ?`;
    sql.query(query, [id], (err, res) => {
        if (err) {
            console.log("Cannot update: ", err);
            result(err,null);
        } else {
            console.log("User: ", res);
            result(null,res);
        }
    })
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

User.getFromEmail = (email, result) => {
    let query = `SELECT * FROM users WHERE email = ?`;
    sql.query(query, [email], (err, res) => {
        if (err) {
            console.log("Cannot update: ", err);
            result(err,null);
        } else {
            result(null,res);
        }
    })
}

export default User;
