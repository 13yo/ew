var reqs = [
    {ID: 1, name: 'Kaatz', prename: 'Tobias', birthdate: moment("1985 05 09", dateFormatImport).toDate()},
    {ID: 2, name: 'Kaatz', prename: 'Anna', birthdate: moment("1984 02 14", dateFormatImport).toDate()},
    {ID: 3, name: 'Fischer', prename: 'Fritz', birthdate: moment("1989 12 12", dateFormatImport).toDate()}
  ];

var dateFormat = "dd.mm.yy"
var dateFormatImport = "YYYY MM DD"

var requests = angular.module('requests', ['ngResource']).
  factory('Requests', function($resource){
    return $resource('/:jsonID.json', {}, {query: {method:'GET', params:{jsonID:'requests'}, isArray:true}});
  }).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:EmptyCtrl, templateUrl:'requests_emptyForm.html'}).
      when('/edit/:requestId', {controller:EditCtrl, templateUrl:'requests_edit.html'}).
      otherwise({redirectTo:'/'});
  });


requests.directive('quickdate', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                if (viewValue != undefined && validateDate(viewValue)) {
                    ctrl.$setValidity('dateFormats', true);
                    return viewValue;;
                } else {
                    ctrl.$setValidity('dateFormats', false);
                    return viewValue;
                }
            });
        }
    };
});

requests.directive('quickinfo', function () {
  return {
    //transclude: 'element',
    priority: 1000,
    terminal: true,
    compile: function(element, attr, linker) {
      return function(scope, iterStartElement, attr){
        console.log(attr)
        attr.$set('rel',"popover");
        attr.$set('title',"demo{{request.name}}");
        console.log(attr);
      }
    }
  };
});

function validateDate(date){
    return moment(date,"DDMM").isValid() ? 1 : 
    moment(date,"DD.MM").isValid() ? 2 : 
    moment(date,"DDMMYY").isValid() ? 3 : 
    moment(date,"DDMMYYYY").isValid() ? 4 : 
    moment(date,"DD.MM.YY").isValid() ? 5 : 
    moment(date,"DD.MM.YYYY").isValid() ? 6 : 0
}

function EmptyCtrl($scope) {

}

function EditCtrl($scope, $location, $routeParams) {
  var self = this;
  $scope.editRequest = machDateSchoen(angular.copy(getRequestByID($routeParams.requestId)));

  function machDateSchoen(request) {
    var date = request["birthdate"]
    request["birthdate"] = jQuery.datepicker.formatDate(dateFormat, date);
    return request
  }

  function machSchoenZuDate(schoenRequest) {
    var schoen = schoenRequest["birthdate"];
    schoenRequest["birthdate"] = new Date(schoen)
    return schoenRequest;
  }

  function getRequestByID(id) {
    var rs = reqs
    for (var i = 0, len = rs.length; i < len; i++)
      if(rs[i]["ID"] == id) return rs[i];
  }
 
  $scope.isClean = function() {
    return angular.equals(self.original, $scope.editRequest);
  }
 
  $scope.destroy = function() {
    self.original.destroy(function() {
      $location.path('/list');
    });
  };
 
  $scope.save = function() {
    var r = getRequestByID($scope.editRequest["ID"]);
    var rNew = machSchoenZuDate($scope.editRequest);
    for(key in rNew){
      r[key] = rNew[key]
    }
    $location.path('/');
    console.log(reqs);
  };
}

