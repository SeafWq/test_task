const express =require('express');
const apiRouter = express.Router();
const  { insertUser, findAllUsers, insertTank, junctionCreate,findUsersTank,findAllTanks,findTankUsers} = require('../controller/controller');
const { sequelize, Sequelize } = require('../models');
const db = require('../models');
const Tank = db.tank;
const User = db.user;
const RelationsTankUser = db.RelationsTankUser;

    apiRouter.post('/user',  async ({body}, res, next)=>{
        try{
            const user = new User(body)
            const newUser = user.save()

            return res.status(200).send(newUser).message("cool");
            }catch(err){
            return res.status(400)
            } 
     });
     

     //create tank
     apiRouter.post('/tank',  async ({body}, res, next)=>{
        try{ 
            const tank = new Tank(body)
            const newTank = tank.save()
            return res.status(200).send(newTank).message("cool");
            }catch(err){
            return res.status(400)
            } 
     });


      // Create a record in the junction table relationsTankUser
      apiRouter.post('/tank-user',  async ({body}, res, next)=>{
          try{

              const tank = await Tank.findOne({
                  where: {
                      total: await(Tank.min('total'))
                  }
              })
              const user = await User.findOne({
                  where: {
                      name: body.UserName
                  }
              })
              tank.total += user.put_milk;
              await tank.save()
              console.log(user);


              if (!user) {
                  return res.sendStatus(400);
              }
              const relationsTankUser = new RelationsTankUser(body)
              relationsTankUser.NameTank = tank.name;
              relationsTankUser.UserName = user.name;
              relationsTankUser.PutMilk = user.put_milk;
              const newRelations = relationsTankUser.save()
              return res.status(200).send(newRelations).message("cool");
          }catch(err){
              return res.status(400)
          }
      });

     //get all users and tanks junction
     apiRouter.get('/tank-user', async (req, res, next)=>{
        try {
            const users = await findAllUsers();
            res.status(200).json({users: users});
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
     });


     //get all tanks
     apiRouter.get('/tanks', async(req, res)=> {
        try{
            const tanks = await Tank.findAll();
            res.status(200).send(tanks)
        }catch(e){
            console.log(e);
            res.sendStatus(500)
        }
    })

    //get all users
    apiRouter.get('/users', async(req, res)=> {
        try{
            const users = await User.findAll();
            res.status(200).send(users)
        }catch(e){
            console.log(e);
            res.sendStatus(500)
        }
    })
    


     //get an users tanks
     apiRouter.param('userId', async (req, res, next, userId)=> {
        try{
            const user = await findUsersTank(userId);
            console.log(user);
            req.user = user;
            next(); // go to apiRouter.get('/user/:userId')
        } catch(e) {
            console.log(e);
            res.sendStatus(404);
        }
     });

     apiRouter.get("/relations", async(req, res) => {
        try{
            const all = await RelationsTankUser.findAll();
            res.status(200).send(all)
        }catch(e){
            console.log(e);
            res.sendStatus(500)
        }
     }),
         
       
     apiRouter.get('/user/:userId',  (req, res, next)=>{
        res.status(200).json({user: req.user});
     });


     //get tank users junction
     apiRouter.get('/tank-users', async (req, res, next)=>{
        try {
            const tanks = await findAllTanks();
            res.status(200).json({tanks: tanks});
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
     });


     // Get a tank users
     apiRouter.param('tankId', async (req, res, next, tankId)=> {
        try{
            const tank = await findTankUsers(tankId);
            req.tank = tank;
            next(); // go to apiRouter.get('/tank/:tankId')
        } catch(e) {
            console.log(e);
            res.sendStatus(404);
        }
     });
       
       
     apiRouter.get('/tank/:tankId',  (req, res, next)=>{
        res.status(200).json({tank: req.tank});
     });


     module.exports = apiRouter;