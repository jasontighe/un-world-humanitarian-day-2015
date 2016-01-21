var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'local';
var config = require('./../config/db-config.js');
console.log('env', env);
var sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);
var db = {};
var dir = path.resolve(__dirname, '..', 'src/api/models');
try{
	var stats = fs.lstatSync(dir);
}
catch(e){
	dir = __dirname;
}


fs
  .readdirSync(dir)
  .filter(function(file) {
    console.log('file', file);
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(dir, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
