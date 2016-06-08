'use strict';
/**
  * controller  - filter
*/
app.controller('FilterCtrl', function($scope, $rootScope, $http, userFactory, APP_REGEX, $localstorage, $state,$ionicPopup){
	console.log('I am a filterCtrl');

  ///static data ,all users .
  var myUserId='1232';
  var Apartment=[
    {
      "numberApartment":'1',
      "users":[
      {"name":"shachar","img":"../img/articles/woman.jpg","id":"01"},
      {"name":"noam","img":"../img/articles/filter.png","id":"02"},
      {"name":"ben ari","img":"../img/articles/woman.jpg","id":"03"},
      {"name":"shalom","img":"../img/articles/filter.png","id":"04"}
      ]
    },
    {"numberApartment":'2',"users":[
      {"name":"dana","img":"../img/articles/woman.jpg","id":"05"},
      {"name":"lior","img":"../img/articles/filter.png","id":"06"},
      {"name":"sharon","img":"../img/articles/woman.jpg","id":"07"},
      {"name":"tuna","img":"../img/articles/filter.png","id":"08"}
    ]}
  ];

  //get all the apartments
  $scope.allApartment=null;
  function Apartments(){
    $scope.allApartment=Apartment;
    console.log("allApartments",$scope.allApartment);
  }
  $scope.test=function(user){
    console.log("yaaaa it is me:",user);
  }

  function init(){
    Apartments()
  }

  init();
});
