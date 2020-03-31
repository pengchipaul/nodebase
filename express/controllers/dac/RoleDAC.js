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
        try {
            const role = await Role.findOne({name: name})
            return role
        } catch (e){
            throw new Error("unable to get role")
        }
    },
    findById: async function(id){
        try {
            const role = await Role.findOne({_id: id})
            return role
        } catch(e) {
            throw new Error("unable to get role")
        }
    }
}