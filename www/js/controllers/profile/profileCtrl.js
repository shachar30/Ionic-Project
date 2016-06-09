'use strict';
/**
 * controller  - profile
 */
app.controller('ProfileCtrl', function($scope, $rootScope, $http, userFactory,apiCallService, APP_REGEX, $localstorage, $state,$ionicPopup){

  console.log('I am a profileCtrl');
  var lsValue =  $localstorage.get($localstorage.localSTypes.BNSToken);
  $http.defaults.headers.post['x-access-token'] = lsValue;
  //START-getAllcategory
  $scope.category = null;
  function getAllCategory() {
    var promise = apiCallService.getAllCategory();
    promise.then(function (result) {
      if (result.err) {
        // error validation
        $scope.category = [];
        return;
      }
      // validation on result.data
      if (result.result.length == 0) {
        $scope.category = [];
        return;
      }
      $scope.category = result.result;
    }, function (reason) {
    });
  }

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
      "name":"תחביבים",
      "items":["כדורגל","מסעדות","ציור"],
      "show":false,
      "addHobby":"ion-edit",
      "removeHobby":"ion-close"
    },
    {
      "name":"כתבות",
      "items":["הכנסת בושי"],
      "show":false
    },
    {
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
    return group.show;
  }
  $scope.iconHobby=function(group){

  }

  ///poopup
  var myPopup = $ionicPopup.show({
    template: '<input type="password" ng-model="data.wifi">',
    title: 'Enter Wi-Fi Password',
    subTitle: 'Please use normal things',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      }
    ]
  });

  function init(){
    getAllCategory();
  }
  init();
});
