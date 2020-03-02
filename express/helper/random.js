function randomStr(num) {
    const lib = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    var result = ""
    for(var i = 0; i <= num; i++){
        result += lib[Math.floor(Math.random() * lib.length)]
    }
    return result
}

module.exports = {
    generateStr: function(num) {
        return randomStr(num)
    }
}