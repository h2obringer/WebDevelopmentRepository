(function () { //prevent bleeding our local variables into our global scope
    'use strict';

    angular.module('lunchApp', [])
        .controller('LunchController', LunchController);

    LunchController.$inject = ['$scope', '$filter'];
    function LunchController($scope, $filter) {
        $scope.lunch = "";
        $scope.evaluateLunchSize = function () {

            //empty items are exluded from the count
            var numItems = $scope.lunch.split(',').filter(function (item) {
                console.log('item: [' + item + ']');
                return item.trim() !== '';
            });

            if (numItems == 0) {
                $scope.resultMessage = "Please enter data first.";
            } else if (numItems.length <= 3) {
                $scope.resultMessage = "Enjoy!";
            } else {
                $scope.resultMessage = "Too much!";
            }
        };
    }
})();