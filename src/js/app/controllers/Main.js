angular.module("app").controller("Main", function ($scope) {

    console.log("MAIN CONTROLLER");


    $scope.$createObservableFunction("click");

});