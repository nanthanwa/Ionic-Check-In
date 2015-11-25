IonicCheckIn.controller('HomeCtrl', function($scope, $ionicPlatform, $timeout, $cordovaSQLite, DatabaseService) {
	console.log("HomeCtrl");

	
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

	//console.log($scope.listActivityFromDatabase)


	$scope.Change = function(activity) {
		console.log("Selected :", activity.title, "value:", activity.owner);
		DatabaseService.setCurrentActivity(activity);

	};



	$scope.insert = function(std_id, firstname, lastname, gender){
		var db = DatabaseService.get();
		var query = "INSERT INTO student (std_id, firstname, lastname, gender) VALUES (?, ?, ?, ?)";
		$cordovaSQLite.execute(db, query, [std_id, firstname, lastname, gender]).then(function(result){
			console.log(result);
		}, function(error){
			console.log(error);
		})
	}

	$scope.select = function(std_id){
		var db = DatabaseService.get();
		var query = "SELECT std_id, firstname, lastname, gender FROM student WHERE std_id = ?";
		$cordovaSQLite.execute(db, query, [std_id]).then(function(result){
			if(result.rows.length > 0){
				console.log(result.rows.item(0));
			}
			else{
				console.log("No row exist");
			}
		}, function(error){
			console.log(error);
		})
	}


});