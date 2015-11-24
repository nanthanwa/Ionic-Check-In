IonicCheckIn.controller('CameraCtrl', function($scope, $rootScope, $cordovaBarcodeScanner, $ionicPlatform, $ionicPopup, $timeout) {

console.log("CameraCtrl");

	$scope.scan = function(){
		try{
			$ionicPlatform.ready(function() {
			$cordovaBarcodeScanner
			.scan()
			.then(function(result) {
	            // Success! Barcode data is here
	            $scope.scanResults = "We got a barcoden" +
	            "Result: " + result.text + "n" +
	            "Format: " + result.format + "n" +
	            "Cancelled: " + result.cancelled;
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
			template: '<input type="text" ng-model="data.std_id">',
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
			console.log('Tapped!', res);
			$scope.scanResults = 'Student ID : ' + res;
		});
		// $timeout(function() {
		// 	myPopup.close();
		// }, 3000);
	};

	$scope.scanResults = 'No data';

});