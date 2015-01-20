var app = angular.module('tomatotimer', ['ngRoute'])
    .config(function ($routeProvider) {
        'use strict';

        $routeProvider.when('/', {
            controller: 'TimerCtrl',
            templateUrl: 'views/timer.html'
        })
    });