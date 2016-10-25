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
    .otherwise({redirectTo:"/"});
});

app.controller('login_controller',["$scope","$location","$firebaseObject",function($scope,$location,$firebaseObject){


 $scope.loginData={
    userName:"",
    password:""
 }
 
 
 

 $scope.loginUser=function(){
    var ref=firebase.database().ref('users/'+$scope.loginData.userName);
    var obj=$firebaseObject(ref);
    obj.password=$scope.loginData.password;
    obj.$save().then(function(re) {
  console.log(re.key);
}, function(error) {
  console.log("Error:", error);
});
    
    if(true){
        $scope.message='login OK!';
        setTimeout(function(){
         $location.path("/upload"); 
        },200);
    }
    else{
        $scope.message="login error";
        $scope.loginData.userName="";
        $scope.loginData.password="";
    }
 }

}]);

app.controller('upload_controller',function($scope,$cordovaCamera){
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