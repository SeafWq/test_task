const db = require("../models")   
const Tank = db.tank;
const User = db.user;
 
const RelationsTankUser = db.RelationsTankUser;


async function  insertTank(name, total) {
    await Tank.create({name, total});
   }
   
   
async function  insertUser(name, put_milk) {
    await User.create({name, put_milk});
    
  }

async function junctionCreate(UserId) {

    return await RelationsTankUser.create({UserId});
     
     
 }
 
 async function findAllUsers(){
 
    const users= await User.findAll({
      include: [
        {
          model: Tank,
           
          attributes: ["name"],
          through: {
            attributes: ["UserId", "TankId"],
          }
     
        },
      ],
    });
     
    return users;
     
     
     
}

async function findUsersTank(id){
 
    const user = await User.findByPk(id, {
      include: [
        {
          model: Tank,
           
          attributes: ["name"],
          through: {
            attributes: ["UserId", "TankId"],
          }
     
        },
      ],
    });
     
    return user;
     
     
     
    }

async function findAllTanks(){
 
 const tanks = await Tank.findAll({
   include: [
     {
       model: User,
        
       attributes: ["name"],
       through: {
         attributes: ["UserId", "TankId"],
       }
  
     },
   ],
 });
  
 return tanks;
  
  
  
 }

 async function findTankUsers(id){
 
    const tank = await Tank.findByPk(id, {
      include: [
        {
          model: User,
           
          attributes: ["name"],
          through: {
            attributes: ["UserId", "TankId"],
          }
     
        },
      ],
    });
     
    return tank;
     
     
     
    }

    module.exports ={
  
        junctionCreate,
         insertUser,
         insertTank,
         findAllUsers,
         findUsersTank,
         findAllTanks,
         findTankUsers,
       };