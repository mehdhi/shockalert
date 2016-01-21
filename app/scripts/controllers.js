angular.module('starter.controllers', [])

.controller('NewAlertItemCtrl', function($scope, AlertItems) {
    $scope.addAlert = function(alert){
       AlertItems.add(alert);
    };
    
    $scope.clear = function(alert){
        alert = null;
    };
})

.controller('AlertsCtrl', function($scope, AlertItems) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.alertItems = AlertItems.all();
  $scope.remove = function(alertItem) {
    AlertItems.remove(alertItem);
  };
})

.controller('AlertItemControl', function($scope, $stateParams, AlertItems) {
  $scope.alertItem = AlertItems.get($stateParams.alertId);
  $scope.alertItem.icon = AlertItems.getIcon($stateParams.alertId);
})

/*.controller('NotifyCtrl',function($scope, $ionicPopup, $timeout) {

// Triggered on a button click, or some other target
    $scope.showPopup = function() {
        $scope.data = {};

        // An elaborate, custom popup
        $scope.showConfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'ATTENTION REQUIRED',
                template: 'Did u forget?'
            });

            confirmPopup.then(function(res) {
                if(res) {
                console.log('You are sure');
                } else {
                console.log('You are not sure');
                }
            });
        };
    };
})*/

.controller('SettingCtrl', function($scope) {
  $scope.settings = {
    vibrate: true,
    mute: false,
    volume: 100
  };
  
});


