'use strict';
/**
 * controller  - Activity
 */


app.controller('ActivityCtrl', function($scope, $rootScope, $http, userFactory, $state,$ionicPopup,$ionicPopover,$localstorage, $stateParams,$ionicHistory){

  /************************************ User press back  ***************************************************/
  $scope.goBack = function() {
    console.log("Returning back!");
    //$ionicHistory.goBack();
    $state.go('tab.calendar');
  };

  /*********************************************************************************************************************************/


  /************************************ API call - receiving the user's activity  ***************************************************/
  function getSingleActivity() {
    $http.post(SERVER_ROOT_PATH + '/client/timetable/getOne',{id: $stateParams}).

      then(function (userActivity) {

        if (userActivity.data.error) {
          // handle error.
          console.log('Receiving activity error:', userActivity.data.error.message);
          return;
        }

        console.log("Mission: ", userActivity.data.result);
        $scope.activity = userActivity.data.result;

        //Converting moment time to human time
        //angular.forEach($scope.activities, function(key, val){
        //  key.start = moment(key.start).format('HH:mm');
        //});


      }, function (err) {
        console.log("Error - ajax call was failed:  /client/timetable/get - ", err);
        // var alertPopup = $ionicPopup.alert({
        //             title: "Connection Failed",
        //             template: "No connection to DB, update the app."
        //           });
      });
  }

  /*********************************************************************************************************************************/




  //1st initialized of the page
  var init = function(){

    console.log("From init(),stateParams: ", $stateParams);
    if(!$stateParams){
      $state.go('tab.calendar');
    }
    getSingleActivity();

  };


  init();


});
