/**
 * Created by kruiz on 04-Mar-15.
 */


angular.module('riotApp')
  .factory('ThingMobileService', function (Server) {
    var connectServer = function(self, success, error){
      self.server.request()
        .then(function(object){
          success(object.data)
        },function(object){
          error(object.data);
        });
    };

    var ThingMobileService = function(id){
      this.activated = false;
      this.childrenFields = [];
      this.fields = [];
      this.id = id;
      this.name = '';
      this.serial = '';
      this.url = '/api/thing/' + id;
      this.x = '';
      this.y = '';
      this.parent = [];
      this.group = [];
      this.groupType = [];
      this.thingType = [];
      this.parentThingType = [];
      this.rules = [];
      this.server = new Server(this.url, 'GET');
    };

    ThingMobileService.prototype.loadData = function(id, callback){
      var self = this;
      var key = (id)?id:this.id;
      this.server.setMethod('GET');
      this.server.setService('/api/thing/' + key);
      //setServerAttributes(self, object);
      connectServer(self, callback);
    };

    ThingMobileService.prototype.putThing = function(data, callback){
      this.server.setMethod('PUT');
      this.server.setService('/api/thing');
      this.server.setData(data);
      console.log(data);
      connectServer(this,callback);
    };

    ThingMobileService.prototype.setField = function(callback, thingId, fieldId, data){
      var url = '/api/thing/' + thingId + '/field/' + fieldId;
      this.server.setMethod('POST');
      this.server.setData(data);
      this.server.setService(url);
      connectServer(this, callback);
    };

    ThingMobileService.prototype.patchThing = function (object, callback){
      this.server.setMethod('PATCH');
      this.server.setService('/api/thing/'+this.id);
      this.server.setData(data);
      this.server.setExtra('');
      connectServer(this,callback);
    };

    ThingMobileService.prototype.delete = function(id, callback){
      this.server.setMethod('DELETE');
      this.server.setService('/api/thing/'+this.id);
      connectServer(this,callback);
    };

    return ThingMobileService;
  });
