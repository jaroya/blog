const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_schema = new Schema({

	name: {
		type: String,
		validate:{
			validator: function(v){

				//write your own validation code
			},
			message: '{VALUE} is not a valid name'
		}
	},
	email:  {
		type: String,
		validate:{
			validator: function(v){
				//write your own validation code
			},
			message: '{VALUE} is not a valid email'
		}
	}

});

const User = mongoose.model("User", user_schema);
module.exports = User;

const user_resource = new User({
	name: 'John Doe',
	email: 'john@doe.com'
});


//==========================CREATE==================================
//Create entry
user_resource.save((error) => {
	if(error){
		console.log(error);
	}
	res.send({success: true, code: 200, msg: "User added!"});
});

//==========================READ =============================
//Read entry

User.find({},'name email',(error,users)=>{

	if(error){
		console.error(error);
	}

	res.send({
		users:users
	});
});

//Read entry by Id

User.findById(1,'name email',(error,user)=>{
	if(error){
		console.error(error);
	}

	res.send({
		users:user
	});
});


//===========================UPDATE==========================
//Update entry--> Find, set, and save
User.findById(1, 'name email',(error,user)=>{
	
	if(error){
		console.error(error);
	}

	//set
	user.name = 'Peter';
	user.email = 'petermagongo@gmail.com';

	//save
	user.save((error)=>{
		if(error){
			console.error(error);
		}

		res.send({
			success:true;
		});
	});
});

//Find one and update
User.findOneAndUpdate({name:'Peter'},{$set: {name:'Peter Magongo'}},(error,user)=>{
	if(error){
		console.error(error);
	}

	res.send(user);
});

//Find by Id and Update
User.findByIdAndUpdate(1, {$set:{name:'Ishmael Kronix'}}, (error,user)=>{
	if(error){
		console.error(error);
	}

	res.send(user);
});

//============================DELETE====================================
//Remove()

User.remove({_id: 1}, (error)=>{
	if(error){
		res.send(error);
	}

	
	res.send({success:true});
})

//Find One And Remove
User.findOneAndRemove({_id: 1}, (error, user)=>{
	if(error){
		res.send(error);
	}

	
	res.send({
		success:true,
		user:user
	});
});

//Find ById  And Remove
User.findByIdAndRemove({_id: 1}, (error, user)=>{
	if(error){
		res.send(error);
	}

	
	res.send({
		success:true,
		user:user
	});
})