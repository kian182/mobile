/**
 * Created by kruiz on 04-Mar-15.
 */

'use strict';
/**
 * Created by kruiz on 24-Feb-15.
 */

angular.module('riotApp')
  .factory('LoginService', function (Server, $location, $rootScope, $cookies) {

      var connectServer = function(self, success, error){
        self.server.request()
          .then(function(object){
            success(object.data)
          },function(object){
            error(object.data);
          });
      };

      var LoginService = function(){
        this.user = '';
        this.pass = '';
        this.url = '/api/user/';
        this.server = new Server(this.url, 'POST');
      };
      LoginService.prototype.setPass = function(pass){
        this.pass = pass;
      };
      LoginService.prototype.setUser = function(user){
        this.user = user;
      };

      LoginService.prototype.login = function(success, error){
        var self = this;
        var object = {
          username:self.user,
          password:self.pass
        };
        self.server.setParams({});
        self.server.setData(object);
        self.server.setHeaders({});
        self.server.setService(self.url+'login');
        connectServer(self, function(data) {
          $cookies.token = data.apiKey;
          success(data);
        }, function(data){
          error(data);
        });
      };

      return LoginService;
    });
