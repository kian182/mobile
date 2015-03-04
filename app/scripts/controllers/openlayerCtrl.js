/**
 * Created by kruiz on 04-Mar-15.
 */

'use strict';

app.controller('Openlayer', function ($scope , $compile, $cordovaDevice, $cordovaGeolocation, ThingMobileService) {

  // map center in [lon, lat]

  $scope.indexFlag = false;
  console.log("OpLy Controller");

    /* alert('Device: ' + device + '\n'
     + 'Cordova: ' + cordova + '\n'
     + 'Model: ' + model + '\n'
     + 'Platform: ' + platform+ '\n'
     + 'Uuid: ' + uuid
     + '\n' + 'Version: ' + version + '\n');*/



  var setPositionValues = function(position){
    $scope.latitude = position.coords.latitude;
    $scope.longitude = position.coords.longitude;
    console.log("Latitude: "+$scope.latitude);
    console.log("Longitude: "+$scope.longitude);
  };

  var cordovaPluggins = function(){

    //Cordova plugins
    try {
      $scope.device = $cordovaDevice.getDevice();
      $scope.cordova = $cordovaDevice.getCordova();
      $scope.model = $cordovaDevice.getModel();
      $scope.platform = $cordovaDevice.getPlatform();
      $scope.uuid = $cordovaDevice.getUUID();
      $scope.version = $cordovaDevice.getVersion();

      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          $scope.lat = position.coords.latitude
          $scope.longt = position.coords.longitude
        }, function (err) {
          // error
        });

      var watchOptions = {
        frequency: 1000,
        timeout: 3000,
        enableHighAccuracy: false // may cause errors if true
      };

      var watch = $cordovaGeolocation.watchPosition(watchOptions);
      watch.then(
        null,
        function (err) {
          // error
        },
        function (position) {
          var lat = position.coords.latitude
          var long = position.coords.longitude
        });
      watch.clearWatch();
    }
    catch(err) {
      console.log(err.message);
      alert("You must access from mobile device");
    }
  };

  $scope.createThing = function() {

    console.log("Gets Thing Create");
    /*$scope.finalObject['name'] = $scope.thingName;
    $scope.finalObject['serial'] = $scope.thingSerial;
    $scope.finalObject['fields'] = $scope.thingFieldMocks.map(function (val) {
      val.type = parseInt(val.type);
      return val;
    });
    $scope.finalObject['thingType.id'] = $scope.thingTypeId.id;*/
    var thing = new ThingMobileService();
    $scope.finalObject =
    {
      "group.id": 3,
      "name": "thing1",
      "serial": "serial1",
      "fields": [
        {
          "id": 15,
          "unit": "",
          "timeSeries": true,
          "symbol": "",
          "name": "os_version",
          "type": 1,
          "typeLabel": "String",
          "$$hashKey": "03I"
        },
        {
          "id": 16,
          "unit": "",
          "timeSeries": true,
          "symbol": "",
          "name": "position",
          "type": 2,
          "typeLabel": "Coordinate",
          "$$hashKey": "03J"
        },
        {
          "id": 17,
          "unit": "",
          "timeSeries": true,
          "symbol": "",
          "name": "temperature",
          "type": 1,
          "typeLabel": "String",
          "$$hashKey": "03K"
        }
      ],
      "thingType.id": 2
    }

    thing.putThing($scope.finalObject, function (data) {
      console.log(JSON.stringify(data,null,4));
        thing.loadData(data.id , function(object){
          console.log(JSON.stringify(object,null,4));
          for(var i=0;i<object.fields.length;i++){
            thing.setField(function () {
            }, data.id, object.fields[i].id,{value:"IoS"});
          }
        })
    });
  };

  var init =  function (){

    cordovaPluggins();
    //Overlayer
    /*$scope.localUser = localStorage.getItem("username");
    console.log("local User Main: "+$scope.localUser);
    if(!isEmpty($scope.localUser)){
      $scope.indexFlag = true;
    }
    //localStorage.removeItem("username");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPositionValues);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }*/

  };

  var isEmpty = function(str) {
    return (!str || /^\s*$/.test(str));
  }

  init();

  angular.extend($scope, {
    defaults: {
      layers: {
        main: {
          source: {
            type: "OSM",
            url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png"
          }
        }
      },
      maxZoom: 14,
      "interactions": {
        "mouseWheelZoom": true
      },
      controls: {
        zoom: false,
        rotate: false,
        attribution: false
      }
    }
  });

  angular.extend($scope, {
    center: {
      lat: -16.5,
      lon: -68.14999999999999,
      zoom: 14
    }
  });

});