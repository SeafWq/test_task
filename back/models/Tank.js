 const { DataTypes } = require("sequelize");
const { tank } = require(".");
const db = require("../config/db")

module.exports = (sequelize, DataTypes) => {
    const Tank = sequelize.define("Tank",{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            validate: {
                notEmpty: true,
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                max: 300,
            }
        }

        
    });

    // Tank.create({
    //     id: 1,
    //     name_tank: "First tank",
    //     total: 0
    // }).then(res =>{
    //     console.log(res)
    // }).catch(err => console.log(err))


    // Tank.getAllTanks = async() => {
    //     return console.log( db.query("select * from tanks"))
    // }

    return Tank;
}
