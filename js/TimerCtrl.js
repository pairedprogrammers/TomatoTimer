angular.module('tomatotimer').controller('TimerCtrl', ['$window', '$scope', '$timeout', 'momentFactory', function($window, $scope, $timeout, momentFactory) {
    'use strict';
    
    var WORK_DELAY = 1500000,
        SHORT_BREAK = 300000,
        LONG_BREAK = 1800000,
        CHECK_DELAY = 1000,
        lastUpdate,
        alarm = angular.element('#alarm')[0],
        alarmTimeout;
    $scope.countingDown = false;
    
    var cancelAlarmTimeout = function() {
        if(!angular.isUndefined(alarmTimeout)) {
            $timeout.cancel(alarmTimeout);
        }
    };
    
    var updateScreen = function(timestamp) {
        var minuteDiff = $scope.end.diff(momentFactory(), 'minutes');
        if(minuteDiff < 1) {
            $scope.timeRemaining = $scope.end.diff(momentFactory(), 'seconds').toString();
            $scope.remainingUoM = 'second';
        } else {
            $scope.timeRemaining = $scope.end.diff(momentFactory(), 'minutes').toString();    
            $scope.remainingUoM = 'minute';
        }
        
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
    
    var alarmCheck = function() {
        if(momentFactory() > $scope.end) {
            $scope.countingDown = false;
            alarm.play();    
        } else {
            alarmTimeout = $timeout(alarmCheck, CHECK_DELAY);
        }
        
    };
    
    var beginCountdown = function(delay) {
        $scope.start = momentFactory();
        $scope.end = momentFactory().add(delay, 'milliseconds');
        $scope.timeRemaining = '';
        $scope.countingDown = true;
        $scope.progress = '';
        $scope.task = '';
        
        lastUpdate = 0;
        
        $window.requestAnimationFrame(updateScreen);
        
        cancelAlarmTimeout();
        
        alarmTimeout = $timeout(alarmCheck, CHECK_DELAY);
    };
    
    $scope.startWork = function() {
        beginCountdown(WORK_DELAY);
    };
    
    $scope.startShortBreak = function() {
        beginCountdown(SHORT_BREAK);
    };
    
    $scope.startLongBreak = function() {
        beginCountdown(LONG_BREAK);
    };
    
    $scope.stop = function() {
        cancelAlarmTimeout();
        $scope.countingDown = false;
    };
    
    beginCountdown(WORK_DELAY);
}]);