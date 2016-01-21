angular.module('starter.services', [])

.factory('AlertItems', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var alertItems = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
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
    }
  };
});
