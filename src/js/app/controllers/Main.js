angular.module("app").controller("Main", function ($scope) {

    console.log("MAIN CONTROLLER");


    $scope.$createObservableFunction("click")
        .filter(function(){
            console.log("filter",arguments);
            return true;
        })
        .map(function (event) {
            console.log(event);
            return Math.random();
        })
        .subscribe(function (results) {
            console.log("RESULT", results);
        });
    ;

});