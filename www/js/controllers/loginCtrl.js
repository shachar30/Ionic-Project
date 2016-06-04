'use strict';
/**
  * controller for user Login to the system
*/
app.controller('LoginCtrl', function ($scope, $rootScope, $http, userFactory, APP_REGEX, $localstorage, $state, $stateParams, $ionicPopup) {
        var userRoles = null;

        $scope.app = $rootScope.app;

        // login object.
        $scope.login = {
            password: {
                value: 'client1',
                key: 'password',
                placeholder: 'Password'
            },
            username: {
                value: '201159657',
                key: 'username',
                placeholder: 'Username'
            },
            isDisabled: function () {
                return APP_REGEX.password.test($scope.login.password.value);
            },
            isRemember: {
                value: true,
                lable: 'Remember Me'
            },
            signIn: function () {
                // $rootScope.safeApply(function () {
                    var data = { username: $scope.login.username.value, password: $scope.login.password.value, isRemember: $scope.login.isRemember.value };

                    $http.post(SERVER_ROOT_PATH + '/public/login', { data: data }).
                    then(function (response) {

                        // console.log('login response', response);
                        if (response.data.err) {
                            // handle error.
                            console.log('login error. Handle it');
                            var alertPopup = $ionicPopup.alert({
                                  title: "Login Failed",
                                  template: "Please check your credentials!"
                                });
                            return;
                        }

                        var user = response.data.result;
                        console.log("user: ", user);

                        if (!userFactory.setUser(user)) {
                            // if here, could not set user,
                            // handle error
                            console.log("!userFactory.setUser(user) = true:  if here, could not set user,handle error");
                        }

                        //This is the first way - for strings
                        $localstorage.set($localstorage.localSTypes.BNSToken, user.token.token);

                        //This is the second way - for objects
                        // $localstorage.setObject('post', {
                        //   name: 'Thoughts',
                        //   text: 'Today was a good day'
                        // });
                        // console.log($localstorage.getObject('post'));

                        // create header for token.
                        $http.defaults.headers.post['x-access-token'] = user.token.token;
                        // root scope user object.
                        $rootScope.user = user;

                        // Redirect to page according to role
                        //if(userRoles[user.role] && userRoles.guide.value <= userRoles[user.role].value)

                        // set user as connected @ server.
                        // $rootScope.socket.emit('userStatus', { isConnect:true, user: $rootScope.user });
                        // redirect to dashboard page.
                        // $location.path('tab.dash');

                        $state.go('tab.groups');

                    }, function (err) {
                      console.log("Error: ", err);
                      var alertPopup = $ionicPopup.alert({
                                  title: "Connection Failed",
                                  template: "No connection to DB, make sure you turned on the server."
                                });
                    });
                // });
            }
        };

        $scope.getEnums = function () {
            $http.post(SERVER_ROOT_PATH + '/public/getUserRoleTypes').
                    then(function (response) {
                    //console.log('getUserRoleTypes response', response);
                    if (response.data.error) {
                        // handle error.
                        //console.log('getUserRoleTypes error. Handle it');
                        return;
                    }

                    userRoles = response.data.result;

                }, function (response) {
                    console.log("Error trying getting the Enum. Response: ",response);
                });
            };

        // init function.
        $scope.init = function () {
            $scope.getEnums();
        };

        $scope.init();
});


/**
  * controller for password forgoten procedure
*/
app.controller('ForgotPassCtrl', ["$scope", "$http", "$state", "$stateParams", "$location","APP_REGEX", "$ionicPopup",
  function ($scope, $http, $state, $stateParams, $location, APP_REGEX,$ionicPopup) {


        var fpid = null;

        $scope.init = function () {
            // check if fpid exists as a query string
            fpid = $location.search().fpid;
            $scope.isForgotPassword = fpid ? true : false;
            // if true, forgot password screen should appear
            if ($scope.isForgotPassword) {
                // validate fpid.
                // if fpid is not valid, redirect to forgot password screen \ login screen \ let user know and add button to forgot password screen.
                $http.post(SERVER_ROOT_PATH + '/public/login/validateForgotPasswordToken', { token: fpid }).
                    then(function (response) {
                    console.log('validateForgotPasswordToken response', response);
                    if (response.data.err || !response.result) {
                        // redirect to login page.
                        console.log('forgotPassword error. Handle it', response);
                        //$state.go('login.signin');
                        return;
                    }
                }, function (response) {

                });
            } else {

            }
        }


        $scope.forgotPassword = {
            legend: 'חדש/י סיסמא',
            text: 'הכנס/י סיסמא חדשה',
            password: {
                first: {
                    value: '',
                    name: 'password1',
                    placeholder: 'הכנס/י סיסמא חדשה',
                },
                second: {
                    value: '',
                    name: 'password2',
                    placeholder: 'הכנס/י סיסמא בשנית',
                },
            },
            button: {
                login: {
                    uiSref: 'login.signin',
                    value: 'התחבר',
                },
                isDisabled: function () {

                    if (APP_REGEX.password.test($scope.forgotPassword.password.first.value) &&
                        $scope.forgotPassword.password.first.value == $scope.forgotPassword.password.second.value)
                        return true;

                    return false;
                },
                // forgot password section
                submit: {
                    value: 'שנה סיסמא',
                    action: function () {
                        console.log('$scope.forgotPassword.password', $scope.forgotPassword.password);

                        if ($scope.forgotPassword.password.first.value == '' ||
                            $scope.forgotPassword.password.first.value != $scope.forgotPassword.password.second.value)
                            return;

                        $http.post(SERVER_ROOT_PATH + '/public/login/changePassword', { token: fpid, password: $scope.forgotPassword.password.first.value }).
                        then(function (response) {
                            console.log('forgotPassword response', response);
                            if (response.data.err) {
                                // handle error.
                                console.log('forgotPassword error. Handle it');
                                return;
                            }

                        }, function (response) {

                        });
                    }
                },
            }
        };

        $scope.form = {
            legend: 'שכחת סיסמא?',
            text: 'הכנס אימייל או תעודת זהות על מנת לשחזר את סיסמתך',
            username: {
                value : '',
                placeholder: 'ת.ז או אמייל',
                name: 'username'
            },
            login: {
                value: 'התחבר',
                uiSref: 'login.signin'
            },
            // forgot password section
            submit: {
                value: 'אפס סיסמא',
                action: function () {

                    if ($scope.form.username.value == '')
                        return;

                    $http.post(SERVER_ROOT_PATH + '/public/login/forgotPassword', { username: $scope.form.username.value }).
                    then(function (response) {
                        console.log('forgotPassword response', response);
                        if(response.data.result == true){
                            var alertPopup = $ionicPopup.alert({
                                  title: "Password was reset!",
                                  template: "Please check your emails"
                                });
                        }
                        if (response.data.err) {
                            // handle error.
                            console.log('forgotPassword error. Handle it');
                            var alertPopup = $ionicPopup.alert({
                                  title: "בעיה!",
                                  template: "בדוק שוב את הפרטים שהזנת!"
                                });
                            return;
                        }

                    }, function (response) {

                    });
                }
            },

        };


        $scope.init();
}]);
