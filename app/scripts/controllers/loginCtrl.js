/**
 * Created by kruiz on 04-Mar-15.
 */

'use strict';

app.controller('LoginCtrl', function($scope, $http, $location, $cookies, $rootScope, LoginService){

  var userLog  = new LoginService();
  console.log("local User Login: "+$scope.localUser);

  $scope.login = function(){
    if($scope.pass == '' || $scope.pass == null || $scope.user == '' || $scope.user == null){
      console.log('Username and password are required.');
      return;
    }
    userLog.setPass($scope.pass);
    userLog.setUser($scope.user);
    userLog.login(function(data){
      console.log(data);
      $location.path("/openlayer");
    },function(error){
      if(error.status === 0){
        console.log('The request timed out, please try again.');
      }else{
        console.log('error Login');
        console.log('' + error.error);
      }
    });
  };
});
