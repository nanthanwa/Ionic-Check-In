IonicCheckIn.controller('CameraCtrl', function($scope, $rootScope, $cordovaBarcodeScanner, $ionicPlatform) {

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

	$scope.scanResults = '';

});