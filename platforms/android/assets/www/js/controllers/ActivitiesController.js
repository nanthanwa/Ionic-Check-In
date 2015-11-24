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

IonicCheckIn.controller('ActivityDetailCtrl', function($scope, $stateParams, Chats, $cordovaEmailComposer) {
  	$scope.activities = Chats.get($stateParams.chatId);
  	
  	$scope.exportCSV = function(){
  		try{
	  		$cordovaEmailComposer.isAvailable().then(function() {
	  			console.log("is available");
	  		}, function () {
	  			console.log("not available");
	  		});

	  		var email = {
	  			to: 'thanwa.npl@gmail.com',
	  			subject: 'Cordova Icons',
	  			body: 'How are you? Nice greetings from Leipzig',
	  			isHtml: true
	  		};

	  		$cordovaEmailComposer.open(email).then(null, function () {
	  			console.log("canceled.")
	  		});
	  	}
	  	catch(e){
	  		console.log("Not work in browser.");
	  	}
  	}
  	
});