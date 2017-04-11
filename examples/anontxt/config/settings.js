var path       = require('path');

var settings = {
  path       : path.normalize(path.join(__dirname, '..')),
  port       : process.env.NODE_PORT || 3000,
  database   : {
    protocol : "mysql", // or "mysql"
    query    : { pool: true },
    host     : "172.23.31.137",
    database : "orm2",
    user     : "root",
    password : "partner0315"
  }
};

module.exports = settings;
