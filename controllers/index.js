/* GET home page. */
module.exports = {
	home: function(req, res){
	  res.render('index.html', { title: 'Express' });
	}
}
