var indexController = require('../controllers/index');

module.exports = function (app, options) {  

	app.get('/', indexController.home);

}