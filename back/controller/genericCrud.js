const boom = require('boom')

const genericCrud = (model) => ({
    async get({params: {id}}, res){
        try{
            const item = await model.findByPk(id);
            return res.status(200).send(item);
            }catch(err){
            return res.status(400).send(boom.boomify(err));
            } 
    },

    async getAll(_,res){
        try{
            const items = await model.findAll();
            return res.status(200).send(items);
            }catch(err){
            return res.status(400).send(boom.boomify(err));
            } 
    },

    async create({ body }, res){
        try{
            const item = new model(body);
            const newItem = await item.save();
            return res.status(200).send(newItem);
            }catch(err){
            return res.status(400).send(boom.boomify(err));
            } 
    },

    async update({params: {id}, body}, res){
        try{
            const item = await model.findByPk(id);
            item.update(body);
            return res.status(200).send(item);
            }catch(err){
            return res.status(400).send(boom.boomify(err));
            } 
    },

    async delete({params: {id}}, res){
        try{
            const item = await model.findByPk(id);
            if(item){
              await item.destroy();
            }
            return res.status(200).send({status: 'OK', message: "has been removed"});
            }catch(err){
            return res.status(400).send(boom.boomify(err));
            } 
    },

})

module.exports = genericCrud;