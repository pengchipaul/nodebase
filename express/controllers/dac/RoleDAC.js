const Role = require('../../db/model/Role')

module.exports = {
    all: async function(){
        try {
            const roles = await Role.find()
            return roles
        } catch (e) {
            throw new Error("unable to get all roles")
        }
    },
    create: async function(params){
        const role = new Role(params)
        try{
            await role.save()
            return {role, success: true}
        } catch(error) {
            console.log(error)
            return {error, success: false}
        }
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