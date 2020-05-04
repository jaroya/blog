const User = require("../models/Watu");

module.exports.controller = (app) => {
// get users page
	app.get('/users', (req, res) => {

		User.find({}, 'name email',(error,users)=>{
			if(error){
				console.log(error);
			}

			res.send(users);
		})
		
	});
}