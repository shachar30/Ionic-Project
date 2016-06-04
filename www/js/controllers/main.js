'use strict';
/**
*
*/
app.controller('AppCtrl', function($scope, $ionicModal, $timeout,$rootScope,$localstorage,$http,userFactory,$state) {


  // global app variable
  $rootScope.app = {
    name: 'BNS Solutions', // name of your project
    author: 'BNS Solutions', // author's name or company name
    description: '', // brief description
    version: '1.0', // current version
    year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
    platform:{
      isWebView:ionic.Platform.isWebView,
      isIPad:ionic.Platform.isIPad(),
      isIOS:ionic.Platform.isIOS(),
      isAndroid:ionic.Platform.isAndroid(),
      isWindowsPhone:ionic.Platform.isWindowsPhone()
    },
    currentPlatform:ionic.Platform.platform(),
    currentPlatformVersion:ionic.Platform.version(),
    deviceInformation:ionic.Platform.device()
  };




  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  $scope.$on('$ionicView.enter', function(e) {
    var lsValue =  $localstorage.get($localstorage.localSTypes.BNSToken);

    // if found no cookie at all
    if (!lsValue && $state.current.url.indexOf('login') == -1) {
      console.log("BNStoken was deleted");
      $state.go('login');
      return;
    }

    // only if cookie exists validate user.
    if (lsValue) {
      $http.post(SERVER_ROOT_PATH + '/public/login/validate', { token: lsValue }).
        then(function (response) {

          console.log('/public/login/validate response', response);

          if ($state.current.url.indexOf('forgot') > -1) {
            console.log("APP CONTROLLER - $scope.on(): .indexOf('forgot') before > -1");
            return;
          }

          // if validation's result is false and current page is NOT login.
          if (!response.data.status && $state.current.url.indexOf('login') == -1) {
            // redirect to login page.
            console.log("APP CONTROLLER - $scope.on(): .indexOf('login') before == -1");
            // window.location.pathname = 'login';
            $state.go('login');
            return;
          }


          // from here on, validation's result is true.
          // create header for token.
          $http.defaults.headers.post['x-access-token'] = lsValue;

          //check user is exist in userFactory.

          var userFac = userFactory.setUser(response.data.user);
          console.log('User Factory was assigned?', userFac);


          // if current page is login, redirect to dashboard page.
          if ($state.current.url.indexOf('login') > -1)
            $state.go('tab.calendar');

        }, function (response) {
          console.log("Error getting the data from - /public/login/validate response");
          if ($state.current.url.indexOf('login') == -1) {
            $state.go('login');
          }
        });
    }
  });
});
