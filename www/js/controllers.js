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

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};

    })

.controller('termsCtrl', function ($scope) {

})

.controller('loginCtrl', function ($scope) {
    console.log("hi");
    
    $scope.forgetpassword=function(){
        
    
        console.log("yo");
    };
})

.controller('signupCtrl', function ($scope,$http) {
    $scope.user = [{}];
       
    $scope.change = function () {

        console.log($scope.user);
        $scope.namerequired = '';
        $scope.genderrequired = '';
        $scope.emailrequired = '';
        $scope.passwordrequired = '';
        $scope.contactrequired='';

        if (!$scope.user.name) {
            $scope.namerequired = 'Name Required !';
        }
        if(!$scope.user.gender){
        $scope.genderrequired='Gender Required !';
        }

    if (!$scope.user.email) {
            $scope.emailrequired = 'Email Required !';
        }

         if (!$scope.user.password) {
            $scope.passwordrequired = 'Password Required !';
        }
         if (!$scope.user.contact) {
            $scope.contactrequired = 'Contact Required !';
        }
        else{
         $http.get('js/mydatabase.js', $scope.user
).success(function(data, status, headers, config) {
  // Do something successful
}).error(function(data, status, headers, config) {
  // Handle error
});
        }
        //$scope.reset();
    };
   // $scope.reset=function(){
    //$scope.user=[];
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

.controller('reportCtrl', function ($scope) {});