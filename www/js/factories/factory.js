angular.module('BNSApp.factory', ['ngSanitize'])

  .factory('safeApply', [function ($rootScope) {
        return function ($scope, fn) {
            var phase = $scope.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn) {
                    $scope.$eval(fn);
                }
            } else {
                if (fn) {
                    $scope.$apply(fn);
                } else {
                    $scope.$apply();
                }
            }
        }
    }])

  .factory('userFactory', function () {
    
        var user = null;
        
        var setUser = function (userObj) { 
            if (!userObj)
                return false;

            user = userObj;
            return true;
        }
        
        var getUser = function () { 
            return user;
        }

        return {
            setUser: setUser,
            getUser: getUser,
        }
    })
  
  .factory('$localstorage', ['$window', function($window) {

        var localSTypes = {
            BNSToken: 'BNSToken',
          }

          return {
            set: function(key, value) {
              if (value == null || value == '' || value == undefined || !localSTypes[key])
                    return;

              $window.localStorage[key] = value;
            },
            get: function(key) {
              return $window.localStorage[key]; //|| defaultValue
            },
            setObject: function(key, value) {
              if (value == null || value == '' || value == undefined || !localSTypes[key])
                    return;

              $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
              return JSON.parse($window.localStorage[key] || '{}');
            },
            localSTypes: localSTypes
      } 
    }]);
