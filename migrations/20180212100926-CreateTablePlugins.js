'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
    return db.createTable("plugins", {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        key: { type: 'string', length: 50, notNull: true },
        name: { type: 'string', length: 100, notNull: true },
        from: { type: 'string', notNull: true },
        environment: { type: 'string', length: 15, notNull: true, defaultValue: 'production' },
        priority: { type: 'boolean', defaultValue: 0, notNull: true }
    });
};

exports.down = function(db) {
    return db.dropTable("plugins");
};

exports._meta = {
  "version": 1
};
