angular.module('starter.controllers', [])

.controller('NewAlertItemCtrl', function($scope) {})

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

.controller('SettingCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
