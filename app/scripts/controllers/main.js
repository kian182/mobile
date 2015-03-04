'use strict';

/**
 * @ngdoc function
 * @name riotApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the riotApp
 */
angular.module('riotApp')
  .controller('MainCtrl', function ($rootScope, $scope, $cordovaBatteryStatus, $cordovaDevice) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    console.log("Gets Main");

    document.addEventListener("deviceready", function () {

      console.log("Gets Here");

      $scope.device = $cordovaDevice.getDevice();

      $scope.cordova = $cordovaDevice.getCordova();

      $scope.model = $cordovaDevice.getModel();

      $scope.platform = $cordovaDevice.getPlatform();

      $scope.uuid = $cordovaDevice.getUUID();

      $scope.version = $cordovaDevice.getVersion();

     /* alert('Device: ' + device + '\n'
        + 'Cordova: ' + cordova + '\n'
        + 'Model: ' + model + '\n'
        + 'Platform: ' + platform+ '\n'
        + 'Uuid: ' + uuid
        + '\n' + 'Version: ' + version + '\n');*/

    }, false);


    $scope.alertDeviceInfo = function() {
      console.log("gets device info");
      var deviceInfo = ('Device Platform: ' + device.platform + '\n'
        + 'Device Version: ' + device.version + '\n' + 'Device Model: '
        + device.model + '\n' + 'Device UUID: ' + device.uuid + '\n');
      navigator.notification.alert(deviceInfo);
    };

    $scope.alertGeoLocation = function() {
      var onSuccess = function(position) {
        alert('Latitude: ' + position.coords.latitude + '\n'
          + 'Longitude: ' + position.coords.longitude + '\n'
          + 'Altitude: ' + position.coords.altitude + '\n'
          + 'Accuracy: ' + position.coords.accuracy + '\n'
          + 'Altitude Accuracy: ' + position.coords.altitudeAccuracy
          + '\n' + 'Heading: ' + position.coords.heading + '\n'
          + 'Timestamp: ' + position.timestamp + '\n'); };
      navigator.geolocation.getCurrentPosition(onSuccess);
    };

    $scope.beepNotify = function() {
      navigator.notification.beep(1);
    };

    $scope.vibrateNotify = function() {
      navigator.notification.vibrate(1000);
    };

  });
