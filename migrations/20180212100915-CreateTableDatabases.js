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
  return db.createTable("databases", {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      name: { type: 'string', length: 60, notNull: true },
      from: { type: 'string', length: 60, notNull: true },
      server: { type: 'string', length: 60, notNull: true }
  });
};

exports.down = function(db) {
  return db.dropTable("databases");
};

exports._meta = {
  "version": 1
};
