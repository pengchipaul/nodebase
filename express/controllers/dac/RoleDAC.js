const Role = require('../../db/model/Role')
const requestHelper = require('../../helper/request')

const fillable = ["name"]

module.exports = {
    all: async function(){
        const roles = await Role.find()
        return roles
    },
    create: async function(params){
        const fields = requestHelper.filterParams(params, fillable)
        const role = new Role(fields)
        await role.save()
        return role
    },
    findByName: async function(name){
        const role = await Role.findOne({name: name})
        if(!role) {
            throw new Error('Unable to find role')
        }
        return role
    },
    findById: async function(id){
        const role = await Role.findOne({_id: id})
        if(!role){
            throw new Error('Unable to find role')
        }
        return role
    },
    findManyByIds: async function(ids) {
        const roles = await Role.find({_id: {$in: ids}})
        if(!roles) {
            throw new Error('Unable to find roles')
        }
        return roles
    }
}