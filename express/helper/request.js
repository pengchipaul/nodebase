module.exports = {
    filterParams: function(params, fillable) {
        var fields = {}
        fillable.forEach(param => {
            if (params[param]) {
                fields[param] = params[param]
            }
        })
        return fields
    }
} 