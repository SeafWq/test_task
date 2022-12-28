'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const Tank = require('../models/Tank');
const { DataTypes } = require("sequelize");
const User = require('../models/User');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize,  Sequelize.DataTypes);;
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

db.tank = require("../models/Tank")(sequelize, Sequelize);
db.user = require("../models/User")(sequelize, Sequelize)

const RelationsTankUser = sequelize.define("RelationsTankUser",{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  TankId: {
    type: DataTypes.INTEGER,
    references: {
      model: Tank, 
      key: 'id'
    }
  },
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, 
      key: 'id'
    }
  },
  UserName:{
      type: DataTypes.STRING
  },
  NameTank: {
    type: DataTypes.STRING
  },
  PutMilk: {
    type: DataTypes.INTEGER
  }
},
);

db.tank.belongsToMany(db.user, {through: RelationsTankUser});
db.user.belongsToMany(db.tank, {through: RelationsTankUser});


db.RelationsTankUser = RelationsTankUser;
module.exports = db