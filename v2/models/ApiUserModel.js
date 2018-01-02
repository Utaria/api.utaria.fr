const db = require("../../db");

const ApiUser = {

    findByName: function (username, callback) {
        return db.query("select * from api_users where name = ?", [username], function(err, data) {
            if (err || !data || data.length === 0) {
                callback(err, null);
            } else {
                callback(null, data[0]);
            }
        });
    }

};

module.exports = ApiUser;