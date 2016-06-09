angular.module('BNSApp.service', [])

.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (name == 'user' && pw == 'secret') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
  .service('apiCallService',function ($http, $q,userFactory) {
    //getAllCategory
    this.getAllCategory = function (options) {
      $http.post(SERVER_ROOT_PATH+"/" + "client" + "/category/getAll", options);
    };

  });




