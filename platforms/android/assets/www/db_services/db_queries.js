var db_queries  = {

/*
function for the signup control of the user
*/
signup_service:function($firebaseObject,payload,callback){
	var username=payload.username.toString().trim().toLowerCase();
	var ref=firebase.database().ref('/tb_users/'+username);
	var obj=$firebaseObject(ref);
	this.username_service(obj.$ref(),username,function(result){
          if(result!=null){
               return callback("Username Already Taken",null);
          }
          else{
          	  payload.is_doctor=(payload.is_doctor)?1:0;
          	  payload.is_male=(payload.is_male)?1:0;
          	  obj.profile_details=payload;
          	  obj.$save().then(function(ref){
                 return callback(null,username);
          	  },function(error){
                 return callback("Something went wrong while updating",null);
          	  });

          }
	});

},

/*
function for the username uniqueness
*/
username_service:function(ref,username,callback){
	ref.once('value').then(function(snapshot){
        return callback(snapshot.val());
	});
},

/*
function to create a response object
*/
response_object:function(status,message,data){
	var response={};
	response.status=status;
	response.message=message;
	response.data=data;
	return response;
},

/*
function for the login control of the user
*/
login_service:function($firebaseObject,payload,callback){
	var username=payload.username.toString().trim().toLowerCase();
	var ref=firebase.database().ref('/tb_users/'+username);
	var obj=$firebaseObject(ref);
	this.username_service(obj.$ref(),username,function(result){
          if(result==null){
          	return callback("Username does not exist ",null);
          }
          else{
          	if(payload.password.toString().trim().toLowerCase()!=result.profile_details.password.toString().trim().toLowerCase()){
          		return callback("Incorrect Password",null);
          	}
          	else{
          		return callback(null,username);
          	}
          }
	});
},

/*
function to control the forgot password 
*/
forgot_password_service:function($firebaseObject,payload,callback){
var username=payload.username.toString().trim().toLowerCase();
var ref=firebase.database().ref('/tb_users/'+username);
  var obj=$firebaseObject(ref);
  this.username_service(obj.$ref(),username,function(result){
    if(result==null){
      return callback("Username Not registered!",null);
    }
    else{
      return callback(null,result);
    }
  });

},



};