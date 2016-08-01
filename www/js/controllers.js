angular.module('starter.controllers', [])


.factory("FactoryDB", ['$cordovaSQLite', '$cordovaToast', '$rootScope', '$q', function($cordovaSQLite, $cordovaToast, $rootScope, $q){
	
		var db = null;
	
		var lista = [
						{ title: 'Habitacion', id: 1, img: 'habitacion.png' },
						{ title: 'Cocina', id: 2, img: 'cocina.png' },
						{ title: 'Comedor', id: 3, img: 'living.png' },
						{ title: 'Piscina', id: 4, img: 'piscina.png' }
					];
				
		var listaDispositivos = [
						{ title: 'ON OFF', id: 1, img: 'switch.jpg' },
						{ title: 'Dimmer', id: 2, img: 'luz.png' },
						{ title: 'TV', id: 3, img: 'television.png' },
						{ title: 'Aire', id: 4, img: 'aire.png' }
					];
					
		var interfaz = {
			getAmbientes: function(){
				return lista;
			},
			getAmbiente: function(id){
				return lista[id-1];
			},
			nuevoAmbiente: function(ambiente){
				lista.push(ambiente);
			},
			
			getDispositivos: function(){
				return listaDispositivos;
			},
			getDispositivo: function(id){
				return listaDispositivos[id-1];
			},
			nuevoDispositivo: function(dispositivo){
				listaDispositivos.push(dispositivo);
			},
			inicializarDB: function(){
				try{
					db = $cordovaSQLite.openDB({name: 'my.db', location: 'default'});
					} 
					catch (e) {
					  alert(e);
					  //throw e; // rethrow to not marked as handled
					}
				
				$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS modulos (id integer primary key AUTOINCREMENT, uuid text, clave text, descripcion text, idModuloTipo int, urlImagen text)").then(function(res) {/*alert("ABRIO LA DB");*/}, function (err) {alert("ERROR TABLA modulos");});
				$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS moduloTipo (id integer primary key AUTOINCREMENT, descripcion text)").then(function(res) {/*alert("ABRIO LA DB");*/}, function (err) {alert("ERROR TABLA moduloTipo");});
				$cordovaSQLite.execute(db, "INSERT INTO moduloTipo (descripcion) VALUES('Zapatilla')").then(function(res) {/*alert("ABRIO LA DB");*/}, function (err) {alert("ERROR INSERT moduloTipo");});
				$cordovaSQLite.execute(db, "INSERT INTO moduloTipo (descripcion) VALUES('Dimmer')").then(function(res) {/*alert("ABRIO LA DB");*/}, function (err) {alert("ERROR INSERT moduloTipo");});

				
				
				$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people4 (id integer primary key AUTOINCREMENT, firstname text, lastname text)").then(function(res) {/*alert("ABRIO LA DB");*/}, function (err) {alert("ERROR TABLA people");});
			},
			
			moduloInsertar: function(uuid, clave, descripcion, idModuloTipo, urlImagen){
				var q = $q.defer();
				var query = "INSERT INTO modulos (uuid, clave, descripcion, idModuloTipo, urlImagen) VALUES (?,?,?,?)";
				$cordovaSQLite.execute(db, query, [uuid, clave, descripcion, idModuloTipo, urlImagen])
				.then(
						function(res) {
								$cordovaToast.show("INSERTO", 'long', 'center');	
								q.resolve(res);
							},
						function (err) {
							$cordovaToast.show("ERROR INSERT", 'long', 'center');
							q.reject(err);
							}
					)
				return q.promise;
			},
			
			moduloLista: function(){
				var q = $q.defer();
				var respuesta = [];
				var query = "SELECT * FROM modulos";
				$cordovaSQLite.execute(db, query)
				.then(
						function(res) {
							if(res.rows.length > 0) {
								
								for(var i=0; i<res.rows.length; i++)
								{
										respuesta[i] = res.rows.item(i);
								}
								
								//$cordovaToast.show("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname, 'long', 'center');
							} else {
								$cordovaToast.show("No results found", 'long', 'center');
							}
							q.resolve(respuesta);
						},
						function (err) {
							$cordovaToast.show("ERROR SELECT", 'long', 'center');
							q.reject(err);
						}
					)
				return q.promise;
			},
			
			moduloSeleccionarId: function(id){
				var q = $q.defer();
				var respuesta = [];
				var query = "SELECT * FROM modulos WHERE id = ?";
				$cordovaSQLite.execute(db, query, [id])
				.then(
						function(res) {
							if(res.rows.length > 0) {
								
								for(var i=0; i<res.rows.length; i++)
								{
										respuesta[i] = res.rows.item(i);
								}
								
								//$cordovaToast.show("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname, 'long', 'center');
							} else {
								$cordovaToast.show("No results found", 'long', 'center');
							}
							q.resolve(respuesta);
						},
						function (err) {
							$cordovaToast.show("ERROR SELECT", 'long', 'center');
							q.reject(err);
						}
					)
				return q.promise;
			},
			
			moduloTipoLista: function(){
				var q = $q.defer();
				var respuesta = [];
				var query = "SELECT * FROM moduloTipo";
				$cordovaSQLite.execute(db, query)
				.then(
						function(res) {
							if(res.rows.length > 0) {
								
								for(var i=0; i<res.rows.length; i++)
								{
										respuesta[i] = res.rows.item(i);
								}
								
								//$cordovaToast.show("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname, 'long', 'center');
							} else {
								$cordovaToast.show("No results found", 'long', 'center');
							}
							q.resolve(respuesta);
						},
						function (err) {
							$cordovaToast.show("ERROR SELECT", 'long', 'center');
							q.reject(err);
						}
					)
				return q.promise;
			},
			
			peopleInsertar: function(firstname, lastname, callback){
			var query = "INSERT INTO people4 (firstname, lastname) VALUES (?,?)";
			$cordovaSQLite.execute(db, query, [firstname, lastname])
			.then(
					function(res) {
							$cordovaToast.show("INSERTO", 'long', 'center');	
							callback(res);
						},
					function (err) {
						$cordovaToast.show("ERROR INSERT", 'long', 'center');
						callback(res);
						}
				)
			},
			
			peopleSeleccionar: function(lastname){
				var q = $q.defer();
				var respuesta = [];
				var query = "SELECT * FROM people4 WHERE lastname = ?";

				$cordovaSQLite.execute(db, query, [lastname])
				.then(
						function(res) {
							if(res.rows.length > 0) {
								
								for(var i=0; i<res.rows.length; i++)
								{
										respuesta[i] = res.rows.item(i);
								}
								
								$cordovaToast.show("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname, 'long', 'center');
							} else {
								$cordovaToast.show("No results found", 'long', 'center');
							}
							q.resolve(respuesta);
						},
						function (err) {
							$cordovaToast.show("ERROR SELECT", 'long', 'center');
							q.reject(err);
						}
					)
				return q.promise;
			}
		
		}
		
		return interfaz;
	}])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ModulosCtrl', function($scope, FactoryDB) {

	var vm = this;
	
	FactoryDB.moduloLista(function(res){
							vm.lista = res;
							});

	/*
	vm.select = function(){
		FactoryDB.peopleSeleccionar("PPPP", 
			function(res){
							vm.lista = res;
						});
	}
	*/
})

.controller('ModuloAltaCtrl', function(FactoryDB) {

	var vm = this;
	
	FactoryDB.moduloTipoLista().then( 
			function(res){
							vm.lista = res;
						});

	vm.alta = function(){
		alert("Desc: " + vm.descripcion + " uuid: " + vm.uuid + " clave: " + vm.clave + " tipo: " + vm.selectTipo);
	}
	
})

.controller('AmbientesCtrl', function($scope, FactoryDB) {
	
	$scope.ambientes = FactoryDB.getAmbientes();
	
})

.controller('AmbienteCtrl', function($scope, $stateParams, FactoryDB) {
	
	//var test = 	$rootScope.playlists[0];
	//debugger;
	var ambiente = FactoryDB.getAmbiente($stateParams.ambienteId);
	
	this.textAmbiente = ambiente.title;
	//alert(test.tit); //test[0]
})

.controller('DispositivosCtrl', function($scope, FactoryDB) {
	
	$scope.dispositivos = FactoryDB.getDispositivos();
	
})

.controller('DispositivoCtrl', function($scope, $stateParams, FactoryDB, $ionicPlatform, $cordovaBluetoothSerial, $cordovaToast) {
	var vm =this;
	
	$ionicPlatform.ready(function() {
		
		$cordovaBluetoothSerial.list().then(exito, error);
		//$cordovaBluetoothSerial.connect("AA:BB:CC:DD:EE:FF").then(exito, error);
		
		
		//$cordovaBluetoothSerial.isConnected(function (){alert("conectado");}, function (){alert("NO conectado");})
	//$cordovaPlugin.someFunction().then(success, error);
	});
	
	function exito (response)
	{
		vm.lista=response;
		$cordovaToast.show('Here is a message', 'long', 'center');
	}
	
	
	function error (response)
	{
		$cordovaToast.show('error', 'long', 'center');
	}
	//var test = 	$rootScope.playlists[0];
	//debugger;
	var dispositivo = FactoryDB.getDispositivo($stateParams.dispositivoId);
	
	this.textDispositivo = dispositivo.title;
	//alert(test.tit); //test[0]
})

.controller('AcercaDeCtrl', function($scope, $ionicPlatform, $cordovaToast, FactoryDB) {
	
	var vm = this;
	
	$cordovaToast.show('DB!', 'long', 'center');
	FactoryDB.peopleInsertar("PURO", "PPPP");

	vm.select = function()
	{
		FactoryDB.peopleSeleccionar("PPPP").then( 
			function(res){
							vm.lista = res;
						});
						
	}

})

;