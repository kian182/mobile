/**
 * Created by kruiz on 04-Mar-15.
 */

'use strict';

angular.module('riotApp')
  .factory('Server', function ($http, $q, $log, $cookies, $location, $rootScope) {
    // Service logic

    var Server = function(url, method){
      this.method = method;
      this.data = [];
      this.params = {};
      this.headers = {
        api_key: $cookies.token
      };
      this.service = url;
    };

    Server.prototype.setData = function(data){
      this.data = data;
    };
    Server.prototype.setHeaders = function(headers){
      this.headers = headers;
    };
    Server.prototype.setParams = function(params){
      this.params = params;
      this.params.ts = new Date().getTime();  // adding timestamp to requests to avoid service response caching
    };

    Server.prototype.setService = function(service){
      this.service = service;
    };
    Server.prototype.setMethod = function(method){
      this.method = method;
    };
    Server.prototype.request = function(){
      var self = this;
      var deferred = $q.defer();
      $http({
        method: self.method,
        url:    "http://dev.riotplatform.com:8080/riot-core-services"+ self.service,
        params: self.params,
        data:   self.data,
        headers: self.headers
      }).
        success(function (data,status,headers,config){
          $log.info('SERVER SUCCESS : '+ self.method +' -- '+ self.service);
          deferred.resolve({data:data,status:status,headers:headers,config:config});
        }).
        error(function (data,status,headers,config){
          $log.error('SERVER ERROR: '+ self.service);
          deferred.reject({data:data,status:status,headers:headers,config:config});
        });
      return deferred.promise;
    };
    return Server;
  });

