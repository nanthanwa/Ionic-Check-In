IonicCheckIn.controller('ActivitiesCtrl', function($scope, Chats, DatabaseService, $cordovaSQLite) {

	console.log("ActivitiesCtrl");

	$scope.listActivityFromDatabase = [];

	var db = DatabaseService.get();
	var query = "SELECT id, title, owner, date_start, date_end, place, student_max FROM activity";
	try{
		$cordovaSQLite.execute(db, query).then(function(result){
			if(result.rows.length > 0){
				for(var i = 0 ; i < result.rows.length ; i++){
					$scope.listActivityFromDatabase.push(result.rows.item(i));
				}
				DatabaseService.setAllActivity($scope.listActivityFromDatabase);
			}
			else{
				console.log("No row exist");
			}
		}, function(error){
			console.log(error);
		})
	}
	catch(e){
		console.log("Not work in browser");
	}

	$scope.remove = function(chat) {
		Chats.remove(chat);
	};
});

IonicCheckIn.controller('ActivityDetailCtrl', function($scope, $stateParams, $interval, $cordovaEmailComposer, DatabaseService) {
  	$scope.activities = DatabaseService.getActivity($stateParams.activityId);
  	var countInterval = 0;
  	var std_id;

	// $scope.$on('$ionicView.enter', function(e) {
	// 	console.log("test1");
	// });


  	DatabaseService.setJoinActivity($stateParams.activityId);

  	var getDataInterval = $interval(function(){
  		console.log(DatabaseService.getJoinActivity($stateParams.activityId).length);
        if(DatabaseService.getJoinActivity($stateParams.activityId).length > 0){
    		std_id = DatabaseService.getJoinActivity($stateParams.activityId);
    		console.log(std_id);
            $interval.cancel(getDataInterval);
        }
        if(countInterval == 10){
        	$interval.cancel(getDataInterval);
        }
        countInterval++;
    }, 100);

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