module.exports = {
    index: function(req, res){
        res.render('index/home')
    },
    app: function(req, res){
        res.render('index/app')
    },
    about: function(req, res) {
        res.send('about page')
    }
}