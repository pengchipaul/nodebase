module.exports = {
    index: function(req, res){
        return res.render('index/home')
    },
    app: function(req, res){
        return res.render('index/app')
    },
    about: function(req, res) {
        return res.send('about page')
    }
}