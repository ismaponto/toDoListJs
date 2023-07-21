const dbConnection = require('./db');

const UserModel = {
    createUser: async function(userData) {
        return new Promise((resolve, reject) => {
            dbConnection.query(
                'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)', [userData.username, userData.email, userData.password],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.insertId);
                    }
                }
            );
        });
    },

    findUserById: async function(userId) {
        return new Promise((resolve, reject) => {
            dbConnection.query('SELECT * FROM Users WHERE id = ?', [userId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    if (results.length === 0) {
                        resolve(null); // User not found
                    } else {
                        resolve(results[0]);
                    }
                }
            });
        });
    },

    findUserByUsername: async function(username) {
        return new Promise((resolve, reject) => {
            dbConnection.query('SELECT * FROM Users WHERE username = ?', [username], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    if (results.length === 0) {
                        resolve(null); // User not found
                    } else {
                        resolve(results[0]);
                    }
                }
            });
        });
    },

    // Add more functions as needed for your user model
};

module.exports = UserModel;