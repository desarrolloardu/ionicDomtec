// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js



angular.module('starter', ['ionic', 'starter.controllers', 'ngMaterial', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite, FactoryDB) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	
	
	FactoryDB.inicializarDB();
	
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.acercade', {
    url: '/acercade',
	cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/acercade.html',
		controller: 'AcercaDeCtrl',
		controllerAs: 'ad' 
      }
    }
  })

  .state('app.dispositivos', {
      url: '/dispositivos',
      views: {
        'menuContent': {
          templateUrl: 'templates/dispositivos.html',
		  controller: 'DispositivosCtrl'
        }
      }
    })
	
	.state('app.dispositivo', {
    url: '/dispositivos/:dispositivoId',
    views: {
      'menuContent': {
        templateUrl: 'templates/dispositivo.html',
        controller: 'DispositivoCtrl',
		controllerAs: 'di' 
		}
	  }	
    })
	
	.state('app.modulos', {
      url: '/modulos',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulos.html',
          controller: 'ModulosCtrl',
		  controllerAs: 'mo' 
        }
      }
    })
	
	.state('app.modulo', {
      url: '/modulos/:moduloId',
      views: {
        'menuContent': {
          templateUrl: 'templates/modulo.html',
          controller: 'ModuloCtrl'
        }
      }
    })
	
	.state('app.moduloAlta', {
      url: '/moduloAlta',
      views: {
        'menuContent': {
          templateUrl: 'templates/moduloAlta.html',
          controller: 'ModuloAltaCtrl',
		  controllerAs: 'ma' 
        }
      }
    })
	
	
    .state('app.ambientes', {
      url: '/ambientes',
      views: {
        'menuContent': {
          templateUrl: 'templates/ambientes.html',
          controller: 'AmbientesCtrl'
        }
      }
    })

  .state('app.ambiente', {
    url: '/ambientes/:ambienteId',
    views: {
      'menuContent': {
        templateUrl: 'templates/ambiente.html',
        controller: 'AmbienteCtrl',
		controllerAs: 'pl' 
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/ambientes');
});
