// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'BNSApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'BNSApp.services' is found in services.js
// 'BNSApp.controllers' is found in controllers.js


var SERVER_ROOT_PATH = 'http://localhost:3030';

var app = angular.module('BNSApp', ['ionic', 'BNSApp.service', 'BNSApp.factory', 'BNSApp.directive', 'ionic-datepicker']);

//Keeping everything in the scoop
app.constant('APP_REGEX', {
    'email': /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
    'password': /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,}$/,
});

/**
 *
 * App Configuration & Run
 */

app
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    console.log("$ionicPlatform.ready");
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


  });

})


.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

    $ionicConfigProvider.navBar.alignTitle('center');
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

    console.log("Entering to STATE!");

  $stateProvider

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })

  .state('loginForgot', {
      url: '/forgot',
      templateUrl: 'templates/login_forgot.html',
      controller: 'ForgotPassCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

    .state('tab.articles', {
      url: '/articles',
      views: {
        'tab-articles': {
          templateUrl: 'templates/tab-articles.html',
          controller: 'ArticlesCtrl'
        }
      }
    })

    .state('article', {
      url: '/articles',
      params: { obj: null },
      templateUrl: 'templates/article.html',
      controller: 'articleContent'
    })

  .state('tab.filter', {
    url: '/filter',
    views: {
      'tab-filter': {
        templateUrl: 'templates/tab-filter.html',
        controller: 'FilterCtrl'
      }
    }
  })

  .state('tab.calendar', {
      url: '/calendar',
      views: {
        'tab-calendar': {
          templateUrl: 'templates/tab-calendar.html',
          controller: 'CalendarCtrl'
        }
      }
    })

    .state('activity', {
      url: '/calendar/:activityId',
      templateUrl: 'templates/activity.html',
      controller: 'ActivityCtrl'
    })

    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.notification', {
    url: '/notification',
    views: {
      'tab-notification': {
        templateUrl: 'templates/tab-notification.html',
        controller: 'NotificationCtrl'
      }
    }
  })

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl'
      }
    }
  });

});
