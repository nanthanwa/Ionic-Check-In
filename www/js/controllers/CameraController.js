IonicCheckIn.controller('CameraCtrl', function($scope, $rootScope, $cordovaBarcodeScanner, $ionicPlatform, $ionicPopup, $timeout, $interval, $cordovaSQLite, DatabaseService) {

console.log("CameraCtrl");

	$scope.scan = function(){
		try{
			$ionicPlatform.ready(function() {
				$cordovaBarcodeScanner
				.scan()
				.then(function(result) {
		            var db = DatabaseService.get();
		            var query = "SELECT std_id, firstname, lastname, gender FROM student WHERE std_id = ?";
		            $cordovaSQLite.execute(db, query, [result.text]).then(function(result){
		            	if(result.rows.length > 0){
		            		//console.log(result.rows.item(0));
		            		$scope.scanResults = "Student ID : " + result.rows.item(0).std_id + "<br>" +
		            		"Name : " + result.rows.item(0).firstname + " " + result.rows.item(0).lastname;
		            		var count = 1;
		            		var interval = $interval(function(){
		            			//$scope.saveText = 'Save (' + count + ')';
		            			count--;
		            			if(count == -1){
		            				$scope.saveText = 'Saved';
		            				$interval.cancel(interval);
		            				joinActivity(result.rows.item(0).std_id, $scope.data.repeatSelect);
		            			}
		            		}, 500, 2);
		            	}
		            	else{
		            		console.log("No row exist");
		            	}
		            }, function(error){
		            	console.log(error);
		            })
			    }, function(error) {
			        $scope.scanResults = 'Error: ' + error;
			    });
			});
		}
		catch(e){
			console.log("Not work in browser.");
		}
	};

	$scope.insertManual = function(){
		$scope.data.std_id = "";
		var myPopup = $ionicPopup.show({
			template: '<input type="number" ng-model="data.std_id" autofocus>',
			title: 'Enter Student ID',
			subTitle: 'Please make sure to insert Student ID correctly!',
			scope: $scope,
			buttons: [
			{ text: 'Cancel' },
			{
				text: '<b>OK</b>',
				type: 'button-positive',
				onTap: function(e) {
					if (!$scope.data.std_id) {
						e.preventDefault();
					} else {
						return $scope.data.std_id;
					}
				}
			}
			]
		});
		myPopup.then(function(res) {
			var db = DatabaseService.get();
			var query = "SELECT std_id, firstname, lastname, gender FROM student WHERE std_id = ?";
			$cordovaSQLite.execute(db, query, [res]).then(function(result){
				if(result.rows.length > 0){
					$scope.scanResults = "Student ID : " + result.rows.item(0).std_id + "<br>" +
					"Name : " + result.rows.item(0).firstname + " " + result.rows.item(0).lastname;
					var count = 1;
					var interval = $interval(function(){
						//$scope.saveText = 'Save (' + count + ')';
						count--;
						if(count == -1){
							$scope.saveText = 'Saved';
							$interval.cancel(interval);
							joinActivity(result.rows.item(0).std_id, $scope.data.repeatSelect);
						}
					}, 500, 2);
				}
				else{
					console.log("No row exist");
				}
			}, function(error){
				console.log(error);
			})
		});
	};

	function joinActivity(std_id, activity_id){
		var date = new Date();
		var db = DatabaseService.get();
		var query = "INSERT INTO join_activity (std_id, activity_id, date) VALUES (?, ?, ?)";
		$cordovaSQLite.execute(db, query, [std_id, activity_id, date])
		.then(function(result){
			console.log(result);
		}, function(error){
			console.log(error);
		})
	}
	$scope.scanResults = 'No data';





	$timeout(function(){
		var listActivityFromDatabase = [];
		var db = DatabaseService.get();
		var query = "SELECT title FROM activity ORDER BY id";
		try{
			$cordovaSQLite.execute(db, query).then(function(result){
				if(result.rows.length > 0){
					for(var i = 0 ; i < result.rows.length ; i++){
						listActivityFromDatabase.push(result.rows.item(i));
					}				
					var listTemp = [];
					for(var i = 0 ; i < listActivityFromDatabase.length ; i++){
						listTemp.push({
							id: (i+1).toString(),
							name: listActivityFromDatabase[i].title
						});
					}
					$scope.data = {
						repeatSelect: null,
						availableOptions: listTemp
					};
				}
				else{
					console.log("No row exist");
				}
			}, function(error){
				console.log(error);
			})
		}
		catch(e){
			console.log(e);
			console.log("Not work in browser");
		}
	},500);

	
});