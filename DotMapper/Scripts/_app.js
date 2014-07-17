'use strict';

var mapApp = angular.module('mapApp', ['ngRoute']);

mapApp.config(function ($routeProvider) {
    $routeProvider.when('/',
        {
            templateUrl: 'Templates/Home.html',
            controller: 'HomeCtrl'

        }
    ).when('/Map',
        {
            templateUrl: 'Templates/Mapper.html',
            controller: 'MapperCtrl'
        }
    ).when('/Todo',
        {
            templateUrl: 'Templates/Todo.html',
            controller: 'TodoCtrl'
        }
    )
});