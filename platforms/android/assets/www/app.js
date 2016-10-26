    var current_user=null;
    var app=angular.module("myApp",['ngRoute',"ngCordova","firebase"]);

    /*
    utility function to config the app to different routes
    */
    app.config(function($routeProvider){
        $routeProvider.when("/",{
            controller:"login_controller",
            templateUrl:"views/login.html"
        })
        .when("/upload",{
            controller:"upload_controller",
            templateUrl:"views/upload.html",
        })
        .when("/signup",{
            controller:"signup_controller",
            templateUrl:"views/signup.html",
        })
        .when("/forgot_password",{
            controller:"forgot_password_controller",
            templateUrl:"views/forgot_password.html",
        })
        .otherwise({redirectTo:"/"});
    });

    app.controller('login_controller',["$scope","$location","$firebaseObject",function($scope,$location,$firebaseObject){


        $scope.loginData={
            username:"",
            password:""
        }




        $scope.loginUser=function(){
            db_queries.login_service($firebaseObject,$scope.loginData,function(error,result){
             if(error){
                $scope.message=error;
                $scope.loginData.username="";
                $scope.loginData.password="";

            }
            else{
                $scope.message="Successfull";
                current_user=$scope.loginData.username;
                $location.path("/upload");
            }
        });
        }

        $scope.signupClick=function(){
            $location.path("/signup"); 

        }


        $scope.forPassClick=function(){
            $location.path("/forgot_password"); 
        }

    }]);


    /*
    Image upload controller
    */
    app.controller('upload_controller',function($scope,$cordovaCamera){

        $scope.message="Hello "+ current_user;
        $scope.image_source="";
        $scope.gallery_func=function(){
            var options={
                quality:50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                cameraDirection:0,

            }
            $cordovaCamera.getPicture(options).then(function(imageDATA){
                $scope.image_source="data:image/jpeg;base64," + imageDATA;
            },function(error){
             alert("Error in gallery retrievel");
         });


        }
        $scope.camera_func=function(){
            var options={
                quality:50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                saveToPhotoAlbum: true,
                cameraDirection:0,

            }
            $cordovaCamera.getPicture(options).then(function(imageURI){
                $scope.image_source=imageURI;
            },function(error){
             alert("Error in camera capture");
         });
        }

    });

    /*
    signup controller
    */
    app.controller('signup_controller',['$scope','$location','$firebaseObject',function($scope,$location,$firebaseObject){
        $scope.signupData={
            fullname:"",
            username:"",
            age:20,
            email:"",
            password:"",
            is_doctor:true,
            is_male:true,
            speciality:"",
            is_deleted:0,
        }
        $scope.signupUser=function(){
            db_queries.signup_service($firebaseObject,$scope.signupData,function(error,result){
               if(error){
                $scope.message=error;
            }
            else{
                $scope.message="Successfull";
                current_user=$scope.signupData.username;
                $location.path("/upload");
            }
        });
        } 
    }]);

    /*
    forgot password controller
    */
    app.controller('forgot_password_controller',['$scope','$location','$firebaseObject','$cordovaEmailComposer',function($scope,$location,$firebaseObject,$cordovaEmailComposer){
        $scope.forgotPassword={
            username:"",
        }

        $scope.forgotPasswordUser=function(){
           db_queries.forgot_password_service($firebaseObject,$scope.forgotPassword,function(error,result){
               if(error){
                $scope.message=error;
            }
            else{
                var to=result.profile_details.email;
                var password=result.profile_details.password;

               $scope.message="Your Password : "+password;

            }
        });
       }


   }]);