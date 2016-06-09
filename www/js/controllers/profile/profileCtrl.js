'use strict';
/**
 * controller  - profile
*/

/////need to be in directive
//app.directive('clicker', function(){
//  var link = function(scope){
//    scope.showMessage = function(){
//      alert('you clicked the directive!');
//    };
//  };
//  return{
//    link: link,
//    template: "<ion-item ng-click='showMessage()'>Click me!</ion-item>"
//  }
//  });


app.controller('ProfileCtrl', function($scope, $rootScope, $http, userFactory, APP_REGEX, $localstorage, $state,$ionicPopup){

  console.log('I am a profileCtrl');
  var lsValue =  $localstorage.get($localstorage.localSTypes.BNSToken);
  $http.defaults.headers.post['x-access-token'] = lsValue;

  //START-getAllcategory
  var getAllCategory = function (options) {
    $http.post(SERVER_ROOT_PATH+"/client/category/getAll", options)
      .then(function(result){
        if (result.data.error) {
          // handle error.
          console.log('Receiving activities error:', userMissions.data.error.message);
          return;
        }
      console.log("category:",result.data.result);
    });
  };
  //END-getAllcategory

  //background photo need to be in user obj.
  var user=userFactory.getUser();
  console.log("User from profile page: ",user);

  //Background+Profile img need to be in user's profile.
  $scope.backgroundImg="../img/articles/backgroundProfile.jpg";
  $scope.profileImg='../img/articles/woman.jpg';

  //Static data user-info (hobby,favorit- articles && missions ),API-CAll
  $scope.userInfo=[
    {
      "id":"hooby",
      "name":"תחביבים",
      "items":["תירס","אוכל","ספורט"],
      "show":false,
      "addHobby":"ion-edit",
      "removeHobby":"ion-close"
    },
    {
      "id":"favoritArticles",
      "name":"כתבות",
      "items":["הכנסת בושי"],
      "show":false
    },
    {
      "id":"favoritMissions",
      "name":"פעילויות",
      "items":["האכלת גמלים"],
      "show":false
    }
  ];

  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    //if(group.id=="hooby" && group.items.length==0){
    //}
    return group.show;
  }
  //$scope.iconHobby=function(group){
  //    if(group.id=="hooby" && group.items.length>0){
  //      return 'ion-close';
  //    }
  //  if(group.id=="hooby" && group.items.length==0){
  //    return 'ion-edit';
  //  }
  //}

  ///////poopup
  //var myPopup = $ionicPopup.show({
  //  template: '<input type="password" ng-model="data.wifi">',
  //  title: 'Enter Wi-Fi Password',
  //  subTitle: 'Please use normal things',
  //  scope: $scope,
  //  buttons: [
  //    { text: 'Cancel' },
  //    {
  //      text: '<b>Save</b>',
  //      type: 'button-positive',
  //      onTap: function(e) {
  //        if (!$scope.data.wifi) {
  //          //don't allow the user to close unless he enters wifi password
  //          e.preventDefault();
  //        } else {
  //          return $scope.data.wifi;
  //        }
  //      }
  //    }
  //  ]
  //});

  function init(){
    getAllCategory();
  }
  init();
});
