angular.module('tomatotimer').controller('TimerCtrl', ['$window', '$scope', '$timeout', function($window, $scope, $timeout) {
    'use strict';
    
    var WORK_DELAY = 1500000;
    
    // TODO: Move moment() to a factory
    
    $scope.start = moment();
    $scope.end = moment().add(WORK_DELAY, 'milliseconds');
    $scope.timeRemaining = '';
    $scope.countingDown = true;
    $scope.progress = '';
    $scope.task = '';
    var alarm = angular.element('#alarm')[0];
    
    var lastUpdate = 0;
    
    var updateScreen = function(timestamp) {
        $scope.timeRemaining = $scope.end.diff(moment(), 'minutes').toString();
        
        if(timestamp - lastUpdate > 500) {
            lastUpdate = timestamp;
            
            $scope.progress += '.';
            
            if($scope.progress.length > 3) {
                $scope.progress = '';
            }
        }
        
        $scope.$apply();
        
        if($scope.countingDown) {
            $window.requestAnimationFrame(updateScreen);    
        }
    };
    
    $window.requestAnimationFrame(updateScreen);
    
    $timeout(function() {
        $scope.countingDown = false;
        alarm.play();
    }, WORK_DELAY);
}]);