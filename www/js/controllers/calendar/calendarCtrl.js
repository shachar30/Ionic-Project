'use strict';
/**
  * controller  - Calendar
*/


app.controller('CalendarCtrl', function($scope, $rootScope, $http, userFactory, $state,$ionicPopup,$ionicPopover,$localstorage){

  var lsValue =  $localstorage.get($localstorage.localSTypes.BNSToken);
  $http.defaults.headers.post['x-access-token'] = lsValue;

  $scope.isDataRecieved = false;

  //$scope.user = {};
	$scope.activities = [];
  $scope.user = userFactory.getUser();



  /**************************  User press on Activity  ********************************/
    $scope.gotoActivity = function(activity){
    console.log("gotoActivity");
    if(!activity || activity._id == ''){
      return;
    }
    $state.go('activity', {activityId: activity._id});
  };
  /**********************************************************************************************************************/




  /************************** Page opacity while scrolling ********************************/
  $(window).scroll(function() {
    console.log('scrolling');
    if ($(this).scrollTop() > 400) {
      console.log('scroll > 400');
      $( ".card" ).fadeIn();
    } else {
      console.log('there');
      $( ".card" ).fadeOut();
    }
  });


  /**********************************************************/

  /************************** Date picker params********************************/
  $scope.currentDate = new Date();

  $scope.datePickerCallback = function (val) {
    if (!val) {
      console.log('Date not selected');
    } else {
      console.log('Selected date is : ', val);
    }
  };

  $scope.changeDay = function($event){
    console.log("Event: ",$event.srcElement.className);
    if($event.srcElement.className == 'afterDate activated'){
      console.log("The next day");
      return;
    }
    console.log("The day before");
  };


  /**********************************************************/

  /**
   * Icons section
   * @type {string}
   */




  $scope.selectedTime = {};
  $scope.clockPressed = false;
  $scope.heartPressed = false;



  /**
   * User press on reminder
   */
  $scope.chooseTime = function(activity){
    console.log("User press on time");
    $scope.clockPressed = !$scope.clockPressed;
    activity.notify = !activity.notify;

    if($scope.clockPressed == true){
      var alertPopup = $ionicPopup.alert({
        title: "תזכורת",
        template: "15 דק' לפני תקבל תזכורת"
      });
    }
  };



  /**
   * User add activity to his favorites
   */
  $scope.favoritesBtn = function(activity){
    $scope.heartPressed = !$scope.heartPressed;
    activity.favorit = !activity.favorit;
  };
/**********************************************************************************************************************/


  /**
   * This section treat all the API calls - get all the user's activities
   */

  //This function receive all activity per connected user
  $scope.getMissionById = function(){

    $http.post(SERVER_ROOT_PATH + '/client/timetable/get').

    then(function (userMissions) {
        console.log('/client/timetable/get', userMissions);
        if (userMissions.data.error) {
          // handle error.
            console.log('Receiving activities error:', userMissions.data.error.message);
            return;
        }
        console.log("Missions: ", userMissions.data.result);
        $scope.activities = userMissions.data.result;
        //Converting moment time to human time
        angular.forEach($scope.activities, function(key, val){
          console.log("Key: ", key);
          key.start = moment(key.start).format('HH:mm');
          key.favorit = false;
          key.notify = false;
        });
        // root scope user object.
        //$rootScope.user = $scope.user;
        $scope.isDataRecieved = true;
        console.log("After data was recieved: ",$scope.isDataRecieved);


    }, function (err) {
        console.log("Error - ajax call was failed:  /client/timetable/get - ", err);
        // var alertPopup = $ionicPopup.alert({
        //             title: "Connection Failed",
        //             template: "No connection to DB, update the app."
        //           });
        });

    };


  /**************************  Set the current Activity to be displayed  ********************************/
  function jumpto(activities){
    var currentDate = new Date();
    currentDate = moment(currentDate).format('HH:mm');
    console.log("JumpTo, currentDate: ",currentDate);

    angular.forEach(activities, function(key, val){
      if(key.start >= currentDate){
        console.log("key.start >= currentDate");
        return window.location.href = "#" + key._id;
      }
      else{
        return console.log("key.start < currentDate");
      }
    });
  }
  /**********************************************************************************************************************/


  //1st initialized of the page
  var init = function(){
      $scope.getMissionById();
      console.log("Init Calendar Page");
  };


  init();


  angular.element(document).ready(function () {
    jumpto($scope.activities);
  });


});
