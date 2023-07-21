const dbConnection = require('./db');

const GroupModel = {
    createGroup: async function(groupData) {
        return new Promise((resolve, reject) => {
            dbConnection.query('INSERT INTO Groups (group_name, members) VALUES (?, ?)', [groupData.groupName, JSON.stringify(groupData.members)], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    },

    findGroupById: async function(groupId) {
        return new Promise((resolve, reject) => {
            dbConnection.query('SELECT * FROM Groups WHERE id = ?', [groupId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    if (results.length === 0) {
                        resolve(null); // Group not found
                    } else {
                        const group = results[0];
                        group.members = JSON.parse(group.members);
                        resolve(group);
                    }
                }
            });
        });
    },

    isGroupNameTaken: async function(groupName) {
        return new Promise((resolve, reject) => {
            dbConnection.query('SELECT COUNT(*) AS count FROM Groups WHERE group_name = ?', [groupName], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0].count > 0);
                }
            });
        });
    },

    updateGroup: async function(groupId, groupData) {
        return new Promise((resolve, reject) => {
            dbConnection.query('UPDATE Groups SET group_name = ?, members = ? WHERE id = ?', [groupData.groupName, JSON.stringify(groupData.members), groupId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows);
                }
            });
        });
    },

    deleteGroup: async function(groupId) {
        return new Promise((resolve, reject) => {
            dbConnection.query('DELETE FROM Groups WHERE id = ?', [groupId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows);
                }
            });
        });
    },
};

module.exports = GroupModel;