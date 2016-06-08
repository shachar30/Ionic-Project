
'use strict';
/**
 * controller  - Article
 */


app.controller('articleContent', function($scope, $rootScope, $http, userFactory, $state,$ionicPopup,$ionicPopover,$localstorage, $stateParams,$ionicHistory){


  $scope.articleObj=$state.params.obj;
  console.log("art object:",$scope.articleObj);
  /************************************ User press back  ***************************************************/
  $scope.goBack = function() {
    console.log("Returning back!");
    //$ionicHistory.goBack();
    $state.go('tab.articles',{obj:null});

  };



  /*********************************************************************************************************************************/





});
