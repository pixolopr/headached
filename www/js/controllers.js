var answersetcarry = [];
var queset = [];
var userinfo = {};
var clearques = true;
var reportinsertid;
var jstoragevalue={};
var cont = angular.module('controllers', [])



/*.factory('MyDatabase', function ($location) {

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
})*/



/*.factory('usersignup', function ($location) {
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
                  +  for (i in users) {
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


    })*/
.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};


})

.controller('termsCtrl', function ($scope) {

    })
    .controller('homeCtrl', function ($scope, $location) {
        $scope.logout = function () {
            $.jStorage.set("user", null);
            $location.path("/app/login");
        };
    })
    .controller('historyCtrl', function ($scope) {

    })


.controller('loginCtrl', function ($scope, $location) {
    clearques;
    $scope.$on('$ionicView.enter', function () {

        $scope.loginctrl();
        console.log("quesCtrl");


    });
    $scope.loginctrl = function () {
        $scope.logindata = {};

        user = $.jStorage.get("user");
        if (user != null) {
            $location.path('app/home');
        };


        /*//login
        SELECT *.....$anchorScroll
        $.jStorage.set('user', result {name, age....})
    
        //logout
        $.jStorage.set('user', null)*/


        $scope.logindata.username = "";
        $scope.logindata.password = "";
        //REDIRECT USER FUNCTION
        var loginsuccess = function (pass) {
            if ($scope.logindata.password == pass.password) {
                /*$.jStorage.set("logindata", $scope.logindata);
                var a = $.jStorage.get("logindata");*/
                $.jStorage.set("user", pass);
                $location.path('/app/questions');
                $scope.$apply();
            } else {
                $scope.invalid = "Invalid Password !";
                console.log($scope.invalid);
                //$scope.logindata.password = "";
            }
        };

        //LOGIN BUTTON FUNCTION
        $scope.login = function (x) {
            db.transaction(function (tx) {
                tx.executeSql("SELECT * FROM `USERS` WHERE `username` = '" + $scope.logindata.username + "'", [], function (tx, results) {
                    console.log(results.rows);
                    if (results.rows.length > 0) {
                        console.log(results.rows.item(0));
                        userinfo = results.rows.item(0);
                        /*  if($scope.logindata.password.length<=0){
					$scope.forget = results.rows.item(0).question;
                    }*/
                        loginsuccess(results.rows.item(0));
                    } else {
                        $scope.logindata.username = "";
                        $scope.error = "User does not exist!";
                        console.log($scope.error);
                        //SHOW MESSAGE THAt USER DOES NOT EXIST
                    };
                }, null);
            });
        };

        //FORGOT PASSWORD FUNCTION
        $scope.forgetpassword = function (x) {
            $scope.userenter = 0;
            console.log($scope.userenter);
            if ($scope.logindata.username) {
                db.transaction(function (tx) {
                    tx.executeSql("SELECT * FROM `USERS` WHERE `username` = '" + $scope.logindata.username + "'", [], function (tx, results) {
                        console.log(results.rows);
                        if (results.rows.length > 0) {
                            console.log(results.rows.item(0));

                            $scope.forget = results.rows.item(0).question;
                        } else {
                            $scope.error = "User does not exists !";
                            $scope.userenter = 1;
                        }
                    }, null)
                });
            }


            $scope.passwordval = '';
            db.transaction(function (tx) {
                tx.executeSql("SELECT * FROM `USERS` WHERE `username` = '" + $scope.logindata.username + "'", [], function (tx, results) {
                    if (results.rows.length > 0) {
                        $scope.passwordval = results.rows.item(0).password;
                        $scope.answerval = results.rows.item(0).answer;
                    }

                }, null);
            });

            $scope.answer = {};
            $scope.answer.user = "";
            $scope.check = function () {
                //$scope.answer.user = "";
                console.log($scope.answer);
                if ($scope.answer.user == $scope.answerval) {
                    $scope.password = $scope.passwordval;
                } else {
                    $scope.password = '';
                };


            };
        };
    };
})

.controller('signupCtrl', function ($scope, $location) {
    $scope.$on('$ionicView.enter', function () {

        $scope.signupctrl();
        console.log("quesCtrl");


    });
    $scope.signupctrl=function(){
    clearques = '';
    $scope.user = {};
    $scope.que = [];
    db.transaction(function (tx) {
        tx.executeSql('select * from secret_question', [], function (tx, results) {
            for (var j = 0; j <= 4; j++) {
                $scope.que.push(results.rows.item(j));

            }
            return $scope.que.queid;
        }, null);
    });
    $scope.secret = {};
    $scope.question = function (i) {
        // $scope.secret.question=$scope.que.queid[i];

        console.log("hi");
        //  $scope.user=$scope.que[i];
        //console.log($scope.secret.question);
        console.log($scope.user);
    }

    $scope.change = function () {

        console.log($scope.user);
        $scope.namerequired = '';
        $scope.genderrequired = '';
        $scope.emailrequired = '';
        $scope.passwordrequired = '';
        $scope.contactrequired = '';

        var signup = function () {
            db.transaction(function (tx) {
                tx.executeSql("INSERT INTO `USERS` (username,password,gender, email,contact,answer,question,age) VALUES ('" + $scope.user.name + "', '" + $scope.user.password + "','" + $scope.user.gender + "','" + $scope.user.email + "','" + $scope.user.contact + "','" + $scope.user.ans + "','" + $scope.user.que + "','" + $scope.user.age + "')", [], function (tx, results) {
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
        }
        if (!$scope.user.que) {
            $scope.querequired = 'Question Required !';
        }
        if (!$scope.user.ans) {
            $scope.ansrequired = 'Answer Required !';
        } else {

            //$.jStorage.set("users", $scope.user);
            db.transaction(function (tx) {
                tx.executeSql("SELECT * FROM `USERS` WHERE `username` = '" + $scope.user.name + "'", [], function (tx, results) {
                    console.log(results.rows);
                    if (results.rows.length > 0) {
                        $scope.exist = "Username already exist !";
                        console.log($scope.exist);
                        $scope.user.name = "";
                        //SHOW MESSAGE THAT USERNAME ALREADY EXIST
                    } else {
                        //NEW USER
                        /*$jStorage.set("user", 9);*/
                        $.jStorage.set("user", $scope.user);

                        signup();
                    };
                }, null);

            });


        };
    };
    };
})

.controller('questionsCtrl', function ($scope, $location, $ionicPopup) {
    console.log(clearques);
    if ($.jStorage.get("user") == null) {
        $location.path("/app/login");
    } else {
        $scope.$on('$ionicView.enter', function () {

            $scope.questionctrl();
            console.log("quesCtrl");


        });


        $scope.questionctrl = function () {
            $scope.que = {};
            console.log($scope.que);


            console.log(clearques);
            $scope.question = [];
            if (clearques == true) {
                $scope.answerset = [];
            };

            clearques = true;


            console.log($scope.answerset);
            db.transaction(function (tx) {
                //
                tx.executeSql("SELECT * FROM `QUESTIONS`", [], function (tx, results) {
                    console.log("hi");
                    for (var i = 0; i < 22; i++) {
                        $scope.question.push(results.rows.item(i));
                        $scope.$apply();
                        //	console.log(results.rows);
                    }
                    queset = $scope.question;
                    console.log(queset);
                    console.log($scope.question);
                }, null);

            });

            $scope.showreport = function () {
                if ($scope.answerset.length == 22) {
                    console.log($location.path());
                    $location.path("/app/answers");
                } else {
                    $scope.showpopup("Fill all answers !");
                    //ERROR MESSAGE TO FILL ALL QUESTONS
                    //alert("All questions are Compulsory...!");
                };

                console.log($scope.answerset);

                answersetcarry = $scope.answerset;
            };
            $scope.showpopup = function (msg) {
                var mypopup = $ionicPopup.show({
                    template: '<div style="text-align:center">' + msg + '</div>',
                    buttons: [

                        {
                            text: '<b>Ok</b>',
                            type: 'button-positive',
                            //   onTap: function () {
                            //  $location.path("/app/questions");
                            //  }
      }
    ]
                });

            }
        }
    };

})




.controller('answersCtrl', function ($scope, $location) {
    if ($.jStorage.get("user") == null) {
        $location.path("/app/login");
    } else {
        console.log("report page");
        //console.log(answersetreport);
        //$scope.question = [];
        //$scope.answerset = [];
        clearques = false;
        $scope.answers = answersetcarry;
        $scope.questionset = queset;
        //$scope.answerset = [];
        console.log(queset);
        $scope.submit = function () {

            if ($scope.answers.length == 22) {
                clearques = true;
                $location.path("/app/report");
            } else {
                clearques = false;
                $location.path("/app/questions");
            };
        }
    };
})

.controller('reportCtrl', function ($scope, $interval,$location) {
   /*  $scope.$on('$ionicView.enter', function () {

        $scope.reportctrl();
        console.log("quesCtrl");


    });
    */
        if ($.jStorage.get("user") == null) {
            $location.path("/app/login");
        } else {
            $scope.value = '0%';
            $scope.sinus = 0;
            console.log($scope.sinus);
            $scope.migrane = 0;
            $scope.cluster = 0;
           // $scope.reportinfo = userinfo;
            $scope.reportinfo=$.jStorage.get("user");
            jStoragevalue=$scope.reportinfo;
            //$scope.reportinfo.headache = $scope.headache;
            console.log($scope.reportinfo);

            for (var i = 0; i < answersetcarry.length; i++) {
                if (i < 7) {
                    $scope.sinus = $scope.sinus + parseFloat(answersetcarry[i]);
                    console.log($scope.sinus);
                } else if (i < 13) {
                    $scope.migrane = $scope.migrane + parseFloat(answersetcarry[i]);
                } else if (i < 20) {
                    $scope.cluster = $scope.cluster + parseFloat(answersetcarry[i]);
                } else {
                    //$scope.common = $scope.common + parseFloat(answersetcarry[i]);
                    $scope.sinus = $scope.sinus + parseFloat(answersetcarry[i]);
                    $scope.migrane = $scope.migrane + parseFloat(answersetcarry[i]);
                    $scope.cluster = $scope.cluster + parseFloat(answersetcarry[i]);
                }

            };
            var a = Math.round($scope.sinus * 100 / 9);
            var b = Math.round($scope.migrane * 100 / 8);
            var c = Math.round($scope.cluster * 100 / 9);

            $scope.remedy = [];

            if (a > b) {
                if (a > c) {
                    $scope.headache = 'Sinus';
                } else {
                    $scope.headache = 'Cluster';
                }
            } else if (b > a) {
                if (b > c) {
                    $scope.headache = 'Migraine';
                } else {
                    $scope.headache = 'Cluster';
                }
            } else {
                $scope.headche = 'Sinus';
            };

            $scope.medicine = function () {
                
                db.transaction(function (tx) {
                    tx.executeSql("SELECT * FROM `MEDICINES` WHERE `headache`='" + $scope.headache + "' ", [], function (tx, results) {
                        if ($scope.remedy.length <= results.rows.length) {
                            for (var p = 0; p < results.rows.length; p++) {
                                $scope.remedy.push(results.rows.item(p));
                            }

                        }

                    }, null);
                });
                console.log($scope.remedy);
            };
            db.transaction(function (tx) {
                tx.executeSql("INSERT INTO reports(userid ,username ,headache) VALUES('" + $scope.reportinfo.id + "','" + $scope.reportinfo.username + "','" + $scope.headache + "')", [], function (tx, results) {
                    console.log("Added");
                    console.log(results.insertId);
                    reportinsertid = results.insertId;
                }, null);
            })

            var givevalue = function () {
                 console.log(reportinfo1);
                console.log(i);
                $scope.sinus = a;
                $scope.migrane = b;
                $scope.cluster = c;
                $scope.value = '50%';
            };
            var giveval = $interval(givevalue, 1000, 1);

            console.log("report page");
            console.log(userinfo);
            console.log(answersetcarry);
        };
  
    })
    .controller('appointmentCtrl', function ($scope, $ionicPopup,$location) {
        clearques;
        if ($.jStorage.get("user") == null) {
            $location.path("/app/login");
        } else {
            db.transaction(function (tx) {
                tx.executeSql("SELECT * FROM appointments", [], function (tx, results) {

                    for (var j = 0; j < results.rows.length; j++) {
                        // if($scope.appvalues.indexOf[results.rows.item(j).app_id]>-1){
                        $scope.appvalues.push(results.rows.item(j).app_id);
                        //console.log($scope.appvalues);
                        // }

                        // console.log("hey");
                    };
                }, null);
            });
            //get all appvalues from database and store in array
            var d = new Date();
            $scope.w = d.getDay();
            $scope.d = d.getDate();
            console.log($scope.d);
            $scope.m = d.getMonth();
            $scope.y = d.getFullYear();

            //array of days
            $scope.week = [];
            $scope.date = [];
            $scope.day = [];
            $scope.month = [];
            $scope.date[0] = d.getDate() + 1;
            $scope.week[0] = d.getDay() + 1;
            $scope.month[0] = d.getMonth();
            $scope.modelvalues = [];



            for (var i = 1; i < 7; i++) {
                if ($scope.month[i] == 5) {
                    if ($scope.$scope.date[i - 1] == 31) {
                        $scope.date[i - 1] = 1;
                        $scope.month[i - 1] = d.getMonth() + 1;

                    }

                };
                if ($scope.date[i - 1] == 32) {
                    $scope.date[i - 1] = 1;
                    $scope.month[i - 1] = d.getMonth() + 1;
                    console.log($scope.month);
                };
                if ($scope.week[i - 1] == 7) {
                    $scope.week[i - 1] = 0;
                }
                /* if($scope.week[i-1]==8){
                    $scope.week[i-1]=1;
                       console.log("hi");
                 }
                     if($scope.week[i-1]==7){
                       
                     $scope.date.splice(--i,1);
                         console.log($scope.date);
                         $scope.week.splice(--i,1);
                     
                    };*/

                $scope.date[i] = $scope.date[i - 1] + 1;
                $scope.week[i] = $scope.week[i - 1] + 1;
                // $scope.week[i] = d.getDay() + k;
                //$scope.date[i] = d.getDate() + k;
                //console.log($scope.date);
                $scope.month[i] = $scope.month[i - 1];

                $scope.modelvalues[i - 1] = $scope.date[i - 1].toString() + $scope.month[i - 1].toString() + $scope.y.toString() + '4';
                $scope.modelvalues[i - 1] = parseInt($scope.modelvalues[i - 1]);
            };
            $scope.modelvalues[i - 1] = $scope.date[i - 1].toString() + $scope.month[i - 1].toString() + $scope.y.toString() + '4';
            $scope.modelvalues[i - 1] = parseInt($scope.modelvalues[i - 1]);
            console.log($scope.modelvalues);
            console.log($scope.date);
            console.log($scope.week);

            $scope.appvalues = [26420154, 26420156];

            $scope.setappointment = function (appvalue, i, mv, time) {
                console.log(mv);
                if ($scope.appvalues.indexOf(mv) <= -1) {
                    //insert app value in database
                    db.transaction(function (tx) {
                        tx.executeSql("INSERT INTO appointments(app_id,appvalue,patient,date,month,time) VALUES('" + mv + "','" + appvalue + "','" + userinfo.username + "','" + $scope.date[i] + "','" + $scope.month[i] + "','" + time + "')", [], function (tx, results) {
                            console.log("added");
                            console.log(results.insertId);
                            $scope.updateid(results.insertId);
                        }, null);

                    })

                    $scope.appvalues.push(mv);

                    //console.log($scope.appvalues.indexOf(mv));
                    //add into appvaue array to change color in design
                } else {
                    $scope.changepopup("The appointment is already booked !<br>Take another appointment.");
                }
            };
            $scope.updateid = function (appointmentinsertid) {
                db.transaction(function (tx) {
                    tx.executeSql("UPDATE `reports` SET `appointment_id`=" + appointmentinsertid + " WHERE `rowid`='" + reportinsertid + "'", [], function (tx, results) {
                        console.log("updated");
                    }, null);
                });

            };
            $scope.changepopup = function (msg) {
                var p = $ionicPopup.show({
                    template: '<div style="text-align:center">' + msg + '</div>',
                    buttons: [

                        {
                            text: '<b>Ok</b>',
                            type: 'button-positive',
                            //   onTap: function () {
                            //  $location.path("/app/questions");
                            //  }
                    }
    ]
                });

            };
            //insert app value in database
            console.log("appvalues");
            //add into appvaue array to change color in design
        };
    })