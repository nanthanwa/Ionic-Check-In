IonicCheckIn.controller('HomeCtrl', function($scope, $ionicPlatform, $cordovaSQLite, DatabaseService) {
	console.log("HomeCtrl");
	

	function insertAllStudent(){
		var query = "INSERT INTO student (std_id, firstname, lastname, gender) VALUES (?, ?, ?, ?)";
		$cordovaSQLite.execute(db, query, [std_id, firstname, lastname, gender]).then(function(result){
			console.log(result);
		}, function(error){
			console.log(error);
		})
	}


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