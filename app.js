/**
* myApp Module
*
* Description
*/
angular.module('myApp', ['chart.js', 'ui.bootstrap'])
	.controller('myController', ['$scope', '$http', function($scope, $http){
		$scope.button = {
			title:"Press me"
		};
		$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
		$scope.series = ['Series A'];
		$scope.data = [
		   [65, 59, 80, 81, 56, 55, 40]
		];
		
		$scope.today = function() {
		  $scope.dt = new Date();
		};
		$scope.today();

		$scope.clear = function () {
		  $scope.dt = null;
		};

		// Disable weekend selection
		$scope.disabled = function(date, mode) {
		  // return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
			return false;
		};

		$scope.toggleMin = function() {
		  $scope.minDate = $scope.minDate ? null : new Date();
		};
		$scope.toggleMin();

		$scope.open = function($event) {
		  $event.preventDefault();
		  $event.stopPropagation();

		  $scope.opened = true;
		};

		$scope.dateOptions = {
		  formatYear: 'yy',
		  startingDay: 1
		};

		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];

		$scope.onClick = function (points, evt) {
		   console.log(points, evt);
		};

		$scope.buttonClick = function () {
			$http.get('https://api.fda.gov/device/event.json?search=date_received:[20140101+TO+20150101]+AND+source_type:consumer&count=date_received')
				.success(function (response) {
					$scope.labels = [];
					$scope.data[0] = [];

					$scope.response = response;
					response.results.forEach(function (result) {
						$scope.labels.push(result.time);
						$scope.data[0].push(result.count);
					});
					debugger;

					var sclStps = 10;
					var lblLen = $scope.labels.length;
					var sclStpWid = ($scope.labels[lblLen-1] -
										$scope.labels[0])/sclStps;
					var sclStartVal = $scope.labels[0];
					$scope.options = {
							scaleShowGridLines:false,
							pointDot:false,
							scaleOverride:true,
							scaleSteps: 10, //sclStps,
							scaleStepWidth: 93, //sclStpWid,
							scaleStartValue: 20140101, //sclStartVal,
							showTooltips:false
							};
				})
				.error(function (err) {
					console.log(err);
				});
		};
	}]);
