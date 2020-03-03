module.exports = {
    getDistinctObj: function(array, property){
        const map = new Map()
        const result = []
        for(const item of array){
            if(!map.has(item[property])){
                map.set(item[property], true)
                result.push(item)
            }
        }
        return result
    }
}