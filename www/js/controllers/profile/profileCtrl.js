'use strict';
/**
  * controller  - profile
*/
app.controller('ProfileCtrl', function($scope, $rootScope, $http, userFactory, APP_REGEX, $localstorage, $state,$ionicPopup){
	console.log('I am a profileCtrl');
  //background photo need to be in user obj.
  var user=userFactory.getUser();
  $scope.backgroundImg="../img/articles/backgroundProfile.jpg";
  //profile img need to be in user.
  $scope.profileImg='../img/articles/woman.jpg';
  $scope.testJqu=function(){
    $( "#e" ).slideToggle("slow" );
  };
  console.log("user display",user);
});
