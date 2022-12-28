const { type } = require("ramda");
const { DataTypes } = require("sequelize");
const { Sequelize, sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User",{
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
          notEmpty: true,  
             },
         },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            foreignKey: true,
            validate: {
                notEmpty: true,
            },
        },
        
        put_milk: {
            type: DataTypes.INTEGER,
            allowNull: false,
            max: 300,
            validate: {
                notEmpty: true,
                get(){
                    return `${this.put_milk}`
                }
            },
        },
    });
    
    return User;
}