IonicCheckIn.controller('ActivitiesCtrl', function($scope, Chats) {

	console.log("ActivitiesCtrl");

  //to refresh data avoid cache
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
});

IonicCheckIn.controller('ActivityDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.activities = Chats.get($stateParams.chatId);

});