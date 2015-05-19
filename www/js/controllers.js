var a;
var cont = angular.module('controllers', [])
	.factory('MyDatabase', function ($location) {

		//WRITE DATABASE QUERIES HERE
		return {

			getusername: function () {
				console.log("funstion called");
				db.transaction(function (tx) {
					tx.executeSql("SELECT `username` FROM `users` WHERE `id`= '1'", [], function (tx, results) {
						user = results.rows.item(0);
						console.log(user);
						//console.log(cont.controller('questionsCtrl')().done());
						//console.log(angular.element(document.getElementById('questionsCtrl')));
						//console.log(angular.element(document.getElementById('questionsCtrl')).scope());
					}, null);
				})
			},
		}
	})



.factory('usersignup', function ($location) {
		var uid = 1;

		//contacts array to hold list of all contacts
		$location.users = [{}];
		return {
			//save method create a new contact if not already exists
			//else update the existing object
			save: function (user) {
				if (user.id == null) {
					//if this is new contact, add it in contacts array
					user.id = uid++;
					users.push(user);
				} else {
					//for existing contact, find this contact using id
					//and update it.
					for (i in users) {
						if (users[i].id == user.id) {
							users[i] = user;
						}
					}
				}

			}
		}
		return {
			//simply search contacts list for given id
			//and returns the contact object if found
			get: function (id) {
				for (i in users) {
					if (users[i].id == id) {
						return users[i];
					}
				}

			}


		}


	})
	.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
		// Form data for the login modal
		$scope.loginData = {};

	})

.controller('termsCtrl', function ($scope) {

})

.controller('loginCtrl', function ($scope, $location) {
	$scope.logindata = {};
	$scope.logindata.username = "";
	$scope.logindata.password = "";

	//REDIRECT USER FUNCTION
	var loginsuccess = function (pass) {
		if ($scope.logindata.password == pass) {
			$location.path('/app/questions');
			$scope.$apply();
		} else {
			$scope.invalid = "Invalid Password !";
			console.log($scope.invalid);
		}
	};

	//LOGIN BUTTON FUNCTION
	$scope.login = function () {
		db.transaction(function (tx) {
			tx.executeSql("SELECT * FROM `USERS` WHERE `username` = '" + $scope.logindata.username + "'", [], function (tx, results) {
				console.log(results.rows);
				if (results.rows.length > 0) {
					console.log(results.rows.item(0));
					loginsuccess(results.rows.item(0).password);
				} else {

					$scope.error = "User does not exist!";
					console.log($scope.error);
					//SHOW MESSAGE THAt USER DOES NOT EXIST
				};
			}, null);
		});
	};

	//FORGOT PASSWORD FUNCTION
	$scope.forgetpassword = function () {
		console.log("yo");
	};
})

.controller('signupCtrl', function ($scope, $http, $location) {
		$scope.user = {};

		$scope.change = function () {

			console.log($scope.user);
			$scope.namerequired = '';
			$scope.genderrequired = '';
			$scope.emailrequired = '';
			$scope.passwordrequired = '';
			$scope.contactrequired = '';

			var signup = function () {
				db.transaction(function (tx) {
					tx.executeSql("INSERT INTO `USERS` (username,password,gender, email,contact) VALUES ('" + $scope.user.name + "', '" + $scope.user.password + "','" + $scope.user.gender + "','" + $scope.user.email + "','" + $scope.user.contact + "')", [], function (tx, results) {
						console.log("ADDED TO DAtABASE");
						$location.path('/app/login');
						$scope.$apply();
					}, null);
				});
			};

			if (!$scope.user.name) {
				$scope.namerequired = 'Name Required !';
			};
			if (!$scope.user.gender) {
				$scope.genderrequired = 'Gender Required !';
			};
			if (!$scope.user.email) {
				$scope.emailrequired = 'Email Required !';
			};
			if (!$scope.user.password) {
				$scope.passwordrequired = 'Password Required !';
			};
			if (!$scope.user.contact) {
				$scope.contactrequired = 'Contact Required !';
			} else {

				db.transaction(function (tx) {
					tx.executeSql("SELECT * FROM `USERS` WHERE `username` = '" + $scope.user.name + "'", [], function (tx, results) {
						console.log(results.rows);
						if (results.rows.length > 0) {
							//SHOW MESSAGE THAT USERNAME ALREADY EXIST
						} else {
							//NEW USER
							signup();
						};
					}, null);

				});

				//$http.get('http://localhost/headached/headached/www/js/mydatabase.js', $scope.user).success(function (data, status, headers, config) {                    console.log("hey i successfully vcalled file");                }).error(function (data, status, headers, config) {                });
			};
		};
	})
	/*  $http.get('js/mydatabase.js', $scope.user
).success(function(data, status, headers, config) {
  // Do something successful
}).error(function(data, status, headers, config) {
  // Handle error
});*/



/* $scope.addBook = function()*/


/*db({

data: {username:$scope.user.name , password : $scope.user.password},
headers : {'Content-type' : 'application/json'} 
}).success(function(data, status, headers, config){

if(data.success)
{ 
$scope.books.push(data); 
 }

}).error(function(data, status, headers, config){

//set error message.

});

}*/
/*console.log("jyoti");
      $scope.user={};
      $scope.user.name="";
  console.log($scope.user.name);*/
//})


.controller('questionsCtrl', function ($scope, MyDatabase) {
	$scope.done = function () {
		console.log("done");
	};

	db.transaction(function (tx) {
		tx.executeSql("SELECT `username` FROM `users` WHERE `id`= '1'", [], function (tx, results) {
			user = results.rows.item(0);
			console.log(user);
		}, null);
	});
})

.controller('answersCtrl', function ($scope) {

})

.controller('reportCtrl', function ($scope, $interval) {
	$scope.value = '0%';
	var givevalue = function () {
		$scope.value = '50%';
	};
	var giveval = $interval(givevalue, 1000);

});