const db = require("../../db");

const Plugin = {

    getDatabaseByName: function (name, callback) {
        return db.query("select name, `from`, server from `databases` where name = ?", [name], callback);
    }

};

module.exports = Plugin;