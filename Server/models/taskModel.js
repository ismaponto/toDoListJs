const dbConnection = require('./db');

const TaskModel = {
    createPersonalTask: async function(personalTaskData) {
        return new Promise((resolve, reject) => {
            dbConnection.query(
                'INSERT INTO PersonalTasks (user_id, task_description, deadline, completed) VALUES (?, ?, ?, ?)', [personalTaskData.userId, personalTaskData.taskDescription, personalTaskData.deadline, personalTaskData.completed],
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

    createGroupTask: async function(groupTaskData) {
        return new Promise((resolve, reject) => {
            dbConnection.query(
                'INSERT INTO GroupTasks (group_id, task_description, deadline, completed) VALUES (?, ?, ?, ?)', [groupTaskData.groupId, groupTaskData.taskDescription, groupTaskData.deadline, groupTaskData.completed],
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

    findPersonalTaskById: async function(taskId) {
        return new Promise((resolve, reject) => {
            dbConnection.query('SELECT * FROM PersonalTasks WHERE id = ?', [taskId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    if (results.length === 0) {
                        resolve(null); // Personal task not found
                    } else {
                        resolve(results[0]);
                    }
                }
            });
        });
    },

    findGroupTaskById: async function(taskId) {
        return new Promise((resolve, reject) => {
            dbConnection.query('SELECT * FROM GroupTasks WHERE id = ?', [taskId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    if (results.length === 0) {
                        resolve(null); // Group task not found
                    } else {
                        resolve(results[0]);
                    }
                }
            });
        });
    },

    markPersonalTaskAsCompleted: async function(taskId) {
        return new Promise((resolve, reject) => {
            dbConnection.query('UPDATE PersonalTasks SET completed = true WHERE id = ?', [taskId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows);
                }
            });
        });
    },

    markGroupTaskAsCompleted: async function(taskId) {
        return new Promise((resolve, reject) => {
            dbConnection.query('UPDATE GroupTasks SET completed = true WHERE id = ?', [taskId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows);
                }
            });
        });
    },

    deletePersonalTask: async function(taskId) {
        return new Promise((resolve, reject) => {
            dbConnection.query('DELETE FROM PersonalTasks WHERE id = ?', [taskId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows);
                }
            });
        });
    },

    deleteGroupTask: async function(taskId) {
        return new Promise((resolve, reject) => {
            dbConnection.query('DELETE FROM GroupTasks WHERE id = ?', [taskId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows);
                }
            });
        });
    },
};

module.exports = TaskModel;