function RequestsCtrl($window, $scope, $location, $filter, $http) {

	$scope.requests = reqs;

	$scope.predicate = 'name';
	$scope.selected_request = null ;
	
	/*
	$scope.requests 
	*/

	$scope.activate = function(request, event, enter) {
		if(request != $scope.selected_request){
			jQuery("#r"+getPositionOfRequest(request)+" td i").toggleClass('inactive_request');
			//jQuery("#r"+getPositionOfRequest(request)).popover('toggle');
		}


	};

	$scope.select = function(request, index) {
		var sr = $scope.selected_request;
		var rId = -1
		if(sr !== null){
			rId = "r"+ getPositionOfRequest(sr);
			jQuery("#"+rId).removeClass("success");
			jQuery("#"+rId+" td i").toggleClass('inactive_request');
		}
		rId = "r" + getPositionOfRequest(request);
		$scope.selected_request = request;
		jQuery("#"+rId).addClass("success");
		jQuery('html, body').animate({
			scrollTop: jQuery("#requestForm").offset().top
		}, 1000);
		$location.path('/edit/' + request.ID)
	};


	// HELPER
	function getPositionOfRequest(request){
		return $filter('orderBy')($scope.requests,$scope.predicate).indexOf(request);
	}

}