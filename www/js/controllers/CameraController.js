IonicCheckIn.controller('CameraCtrl', function($scope, $rootScope, $cordovaBarcodeScanner, $ionicPlatform, $ionicPopup, $timeout, $cordovaSQLite, DatabaseService) {

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
		$scope.data = {}
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
			//console.log('Tapped!', res);
			//$scope.scanResults = 'Student ID : ' + res;
			var db = DatabaseService.get();
			var query = "SELECT std_id, firstname, lastname, gender FROM student WHERE std_id = ?";
			$cordovaSQLite.execute(db, query, [res]).then(function(result){
				if(result.rows.length > 0){
					$scope.scanResults = "Student ID : " + result.rows.item(0).std_id + "<br>" +
					"Name : " + result.rows.item(0).firstname + " " + result.rows.item(0).lastname;
				}
				else{
					console.log("No row exist");
				}
			}, function(error){
				console.log(error);
			})
		});
		// $timeout(function() {
		// 	myPopup.close();
		// }, 3000);
	};

	$scope.scanResults = 'No data';

});