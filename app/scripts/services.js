angular.module('starter.services', [])

.factory('AlertItems', function() {
  // Might use a resource here that returns a JSON array

  //connect to database
  //var db = window.sqlitePlugin.openDatabase({name: "my.db", createFromLocation: 1});
  
  // Some fake testing data
  var alertItems = [{
    id: 0,
    name: 'Creately Tomcat Server Down',
    filter: 'tomcat server down',
    phone: '077165485',
    level: 1
  }, {
    id: 1,
    name: 'Water overflow',
    filter: 'tank over flow',
    phone: '0774585465',
    level: 0
  }, {
    id: 2,
    name: 'Intruder Alert',
    filter: 'exploited',
    phone: '077154585',
    level: 1
  }, {
    id: 3,
    name: 'Wife mad ',
    filter: 'mad',
    phone: '0774653446',
    level: 0
  }, {
    id: 4,
    name: 'Creately Apache Server Down',
    filter: 'apache server down',
    phone: '0771545555',
    level: 1
  }];

  return {
    all: function() {
      return alertItems;
    },
    remove: function(alertItem) {
      alertItems.splice(alertItems.indexOf(alertItem), 1);
    },
    get: function(alertId) {
      for (var i = 0; i < alertItems.length; i++) {
        if (alertItems[i].id === parseInt(alertId)) {
          return alertItems[i];
        }
      }
      return null;
    },
    add: function(alert){
        alert.id = alertItems.length + 1;
        alertItems.push(alert);
    },
    getIcon: function(alertId) {
      for (var i = 0; i < alertItems.length; i++) {
        if (alertItems[i].id === parseInt(alertId)) {
          if ( alertItems[i].level == 0 ){
              return "images/low.png";
          } else {
              return "images/high.png";
          }
        }
      }
      return null;
    }
  };
});
