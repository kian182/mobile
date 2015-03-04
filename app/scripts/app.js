'use strict';

/**
 * @ngdoc overview
 * @name riotApp
 * @description
 * # riotApp
 *
 * Main module of the application.
 */
var app = angular
  .module('riotApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngCordova'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/openlayer', {
        templateUrl: 'views/openlayer.html',
        controller: 'Openlayer'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
