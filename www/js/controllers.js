 var answersetcarry = [];
var queset = [];
var userinfo = {};
var clearques = true;
var reportinsertid;
var jstoragevalue = {};
var cont = angular.module('controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};
    })
    .controller('menuCtrl', function ($scope, $ionicModal, $timeout, $location) {
        $scope.logout = function () {
            $.jStorage.set("user", null);
            $location.path("/app/login");
        };

        $scope.user = $.jStorage.get('user');


    })
    .controller('forgotCtrl', function ($scope, $location) {
        $scope.forgot = {};
        $scope.forgot.username = "";
        $scope.question = "Enter username to get question";
        $scope.forgot.answer = "";
        $scope.password = "";
        $scope.error = "";
        var passwordval = "";
        var answerval = "";

        $scope.getquestion = function () {
            db.transaction(function (tx) {
                console.log($scope.forgot.username);
                tx.executeSql("SELECT * FROM `USERS` WHERE `username` = '" + $scope.forgot.username + "'", [], function (tx, results) {
                    if (results.rows.length > 0) {
                        $scope.error = "";
                        $scope.question = results.rows.item(0).question;
                        passwordval = results.rows.item(0).password;
                        answerval = results.rows.item(0).answer;
                        $scope.$apply();
                    } else {
                        $scope.error = "User does not exist";
                        $scope.$apply();
                    };

                }, null);
            });
        };

        $scope.checkanswer = function () {
            if ($scope.forgot.answer == answerval) {
                $scope.password = passwordval;
                $scope.$apply();
            } else {
                $scope.password = "Oops, very close";
            };

        };
    })

.controller('homeCtrl', function ($scope, $location) {
    if ($.jStorage.get("user") == null) {
        $location.path("/app/login");
    };

    $scope.logout = function () {
        $.jStorage.set("user", null);
        $location.path("/app/login");
    };
})

.controller('historyCtrl', function ($scope, $location) {
    if ($.jStorage.get("user") == null) {
        $location.path("/app/login");
    };

    $scope.$on('$ionicView.enter', function () {
        regularfunctions();
    });

    $scope.user = $.jStorage.get('user');

    var regularfunctions = function () {
        $scope.patienthistory = [];
        db.transaction(function (tx) {
            console.log("SELECT `reports`.`headache`,`appointments`.`date`,`appointments`.`month`,`appointments`.`time` FROM `reports`,`appointments` WHERE `reports`.`appointment_id`=`appointments`.`app_id` AND `reports`.`username`='" + $.jStorage.get("user").username + "' ");
            tx.executeSql("SELECT `reports`.`headache`,`appointments`.`date`,`appointments`.`month`,`appointments`.`time` FROM `reports` LEFT OUTER JOIN `appointments` ON `reports`.`appointment_id`=`appointments`.`app_id` WHERE `reports`.`username`='" + $.jStorage.get("user").username + "' ", [], function (tx, results) {
                console.log(results.rows);
                for (var s = 0; s < results.rows.length; s++) {
                    $scope.patienthistory.push(results.rows.item(s));
                    console.log("created");
                    $scope.$apply();
                };
            }, null);
        });
    };
})


.controller('loginCtrl', function ($scope, $location) {

    $scope.$on('$ionicView.enter', function () {
        $scope.loginctrl();
        console.log("quesCtrl");
        $scope.invalid = "";
        $scope.error = "";
    });

    $scope.loginctrl = function () {
        $scope.logindata = {};

        user = $.jStorage.get("user");
        if (user != null) {
            $location.path('app/home');
        };

        $scope.logindata.username = "";
        $scope.logindata.password = "";

        //REDIRECT USER FUNCTION
        var loginsuccess = function (userinfo) {
            if ($scope.logindata.password == userinfo.password) {
                $.jStorage.set("user", userinfo);
                $location.path('/app/home');
                $scope.$apply();
            } else {
                $scope.logindata.password = "";
                $scope.invalid = "Invalid Password !";
                $scope.$apply();
            };
        };

        $scope.removeusererror = function () {
            $scope.error = "";
        };
        $scope.removepasserror = function () {
            $scope.invalid = "";
        };

        //LOGIN BUTTON FUNCTION
        $scope.login = function (x) {
            db.transaction(function (tx) {
                tx.executeSql("SELECT * FROM `USERS` WHERE `username` = '" + $scope.logindata.username + "'", [], function (tx, results) {
                    if (results.rows.length > 0) {
                        userinfo = results.rows.item(0);
                        loginsuccess(results.rows.item(0));
                    } else {
                        $scope.logindata.username = "";
                        //SHOW MESSAGE THAt USER DOES NOT EXIST
                        $scope.error = "User does not exist!";
                        $scope.$apply();
                    };
                }, null);
            });
        };

    };
})

.controller('signupCtrl', function ($scope, $location) {
    $scope.$on('$ionicView.enter', function () {
        $scope.signupctrl();
    });
    $scope.signupctrl = function () {
        clearques = '';
        $scope.user = {};
        $scope.que = [];
        db.transaction(function (tx) {
            tx.executeSql('select * from secret_question', [], function (tx, results) {
                for (var j = 0; j <= 4; j++) {
                    $scope.que.push(results.rows.item(j));
                };
                return $scope.que.queid;
            }, null);
        });
        $scope.secret = {};

        $scope.change = function () {
            var errorcount = 0;
            $scope.namerequired = '';
            $scope.genderrequired = '';
            $scope.emailrequired = '';
            $scope.agerequired = '';
            $scope.passwordrequired = '';
            $scope.contactrequired = '';

            var signup = function () {
                db.transaction(function (tx) {
                    tx.executeSql("INSERT INTO `USERS` (username,password,gender, email,contact,answer,question,age) VALUES ('" + $scope.user.username + "', '" + $scope.user.password + "','" + $scope.user.gender + "','" + $scope.user.email + "','" + $scope.user.contact + "','" + $scope.user.ans + "','" + $scope.user.que + "','" + $scope.user.age + "')", [], function (tx, results) {
                        $location.path('/app/login');
                        $scope.$apply();
                    }, null);
                });
            };

            if (!$scope.user.username) {
                $scope.namerequired = 'Name Required !';
                errorcount++;
            } else {
                db.transaction(function (tx) {
                    tx.executeSql("SELECT * FROM `USERS` WHERE `username` = '" + $scope.user.username + "'", [], function (tx, results) {
                        console.log(results.rows);
                        if (results.rows.length > 0) {
                            //SHOW MESSAGE THAT USERNAME ALREADY EXIST
                            $scope.namerequired = "Username already exist !";
                            $scope.$apply();
                            errorcount++;
                            $scope.user.username = "";

                        } else {
                            proceed();
                        };

                    }, null);

                });
            };
            var proceed = function () {
                if (!$scope.user.gender) {
                    $scope.genderrequired = 'Gender Required !';
                    errorcount++;
                };
                if (!$scope.user.email) {
                    $scope.emailrequired = 'Email Required !';
                    errorcount++;
                };
                if (!$scope.user.password) {
                    $scope.passwordrequired = 'Password Required !';
                    errorcount++;
                };
                if (!$scope.user.age) {
                    $scope.agerequired = 'Age Required !';
                    errorcount++;
                };
                if (!$scope.user.contact) {
                    $scope.contactrequired = 'Contact Required !';
                    errorcount++;
                };
                if (!$scope.user.que) {
                    $scope.querequired = 'Question Required !';
                    errorcount++;
                };
                if (!$scope.user.ans) {
                    $scope.ansrequired = 'Answer Required !';
                    errorcount++;
                };
                if (errorcount == 0) {
                    //NEW USER
                    signup();
                };
            };
        };
    };
})

.controller('questionsCtrl', function ($scope, $location, $ionicPopup) {


    if ($.jStorage.get("user") == null) {
        $location.path("/app/login");
    };

    $scope.$on('$ionicView.enter', function () {
        if (clearques == true) {
            $scope.answerset = [];

        };
        clearques = true;
        regularfunction();
    });
    var regularfunction = function () {
        if (clearques == true) {
            $scope.answerset = [];
        };
    };
    $scope.answerset = [];
    $scope.que = {};
    console.log($scope.que);


    console.log(clearques);
    $scope.question = [];

    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM `QUESTIONS`", [], function (tx, results) {
            console.log("hi");
            for (var i = 0; i < 22; i++) {
                $scope.question.push(results.rows.item(i));
                $scope.$apply();
            };
            queset = $scope.question;
        }, null);

    });

    $scope.showreport = function () {
        if ($scope.answerset.length == 22) {
            answersetcarry = $scope.answerset;
            $location.path("/app/answers");
        } else {
            $scope.showpopup("Fill all answers !");
        };
    };

    $scope.showpopup = function (msg) {
        var mypopup = $ionicPopup.show({
            template: '<div style="text-align:center">' + msg + '</div>',
            buttons: [
                {
                    text: '<b>Ok</b>',
                    type: 'button-dark',
      }
    ]
        });

    };

})




.controller('answersCtrl', function ($scope, $location) {
    if ($.jStorage.get("user") == null) {
        $location.path("/app/login");
    };
    $scope.$on('$ionicView.enter', function () {

        regularfunctions();
    });
    var regularfunctions = function () {
        clearques = false;
        $scope.answers = answersetcarry;
        $scope.questionset = queset;
        console.log(queset);
    };
    $scope.submit = function () {

        if ($scope.answers.length == 22) {
            clearques = true;
            $location.path("/app/report");
        } else {
            clearques = false;
            $location.path("/app/questions");
        };
    };

})

.controller('reportCtrl', function ($scope, $interval, $location) {

    //CHECK IF LOGGED IN
    if ($.jStorage.get("user") == null) {
        $location.path("/app/login");
    };

    $scope.$on('$ionicView.enter', function () {
        $scope.remedy = [];
        $scope.sinus = 0;
        $scope.migrane = 0;
        $scope.cluster = 0;
        console.log("ctrl called");
        getremedy = true;

        regularfunctions();
    });
    var getremedy = true;
    $scope.remedy = [];
    $scope.sinus = 0;
    $scope.migrane = 0;
    $scope.cluster = 0;
    console.log(answersetcarry);

    //FINISH FUNCTION
    $scope.gotohome = function () {
        $location.path("/app/home");
    };

    var regularfunctions = function () {
        clearques = true;
        getremedy = true;
        $scope.remedy = [];
        $scope.sinus = 0;
        $scope.migrane = 0;
        $scope.cluster = 0;
        console.log(answersetcarry);


        $scope.user = $.jStorage.get("user");


        //ADDING ANSWER VALUES TO HEAD ACHE COUNTER
        for (var i = 0; i < answersetcarry.length; i++) {
            if (i < 7) {
                $scope.sinus = $scope.sinus + parseFloat(answersetcarry[i]);
                console.log($scope.sinus);
            } else if (i < 13) {
                $scope.migrane = $scope.migrane + parseFloat(answersetcarry[i]);
            } else if (i < 20) {
                $scope.cluster = $scope.cluster + parseFloat(answersetcarry[i]);
            } else {
                $scope.sinus = $scope.sinus + parseFloat(answersetcarry[i]);
                $scope.migrane = $scope.migrane + parseFloat(answersetcarry[i]);
                $scope.cluster = $scope.cluster + parseFloat(answersetcarry[i]);
            };

        };

        console.log($scope.sinus);
        console.log($scope.migrane);
        console.log($scope.cluster);

        //CALCULATING HEAD ACHE PERCENTAGE
        var a = Math.round($scope.sinus * 100 / 9);
        var b = Math.round($scope.migrane * 100 / 8);
        var c = Math.round($scope.cluster * 100 / 9);

        //INITIALIZE REMEDY ARRAY
        $scope.remedy = [];

        //DETECT GREATEST HEAD ACHE
        if (a > b) {
            if (a > c) {
                $scope.headache = 'Sinus';
            } else {
                $scope.headache = 'Cluster';
            };
        } else if (b > a) {
            if (b > c) {
                $scope.headache = 'Migraine';
            } else {
                $scope.headache = 'Cluster';
            };
        } else {
            $scope.headche = 'Sinus';
        };
        answersetcarry = [];
        //INSERT INTO REPORT THE HEADACHE
        db.transaction(function (tx) {
            console.log($scope.headache);
            tx.executeSql("INSERT INTO reports(username ,headache) VALUES('" + $scope.user.username + "','" + $scope.headache + "')", [], function (tx, results) {
                console.log("Added");
                console.log(results.insertId);
                reportinsertid = results.insertId;
            }, null);
        });

        var givevalue = function () {
            console.log(i);
            $scope.sinus = a;
            $scope.migrane = b;
            $scope.cluster = c;
            $scope.value = '50%';
        };
        var giveval = $interval(givevalue, 1000, 1);

    };



    //GET REMEDY FUNTION
    $scope.medicine = function () {
        console.log(getremedy);
        if (getremedy == true) {
            db.transaction(function (tx) {
                tx.executeSql("SELECT * FROM `MEDICINES` WHERE `headache`='" + $scope.headache + "' ", [], function (tx, results) {
                    if ($scope.remedy.length <= results.rows.length) {
                        for (var p = 0; p < results.rows.length; p++) {
                            $scope.remedy.push(results.rows.item(p));
                            $scope.$apply();
                        };
                    };
                }, null);
            });
            getremedy = false;
        };
    };
})

.controller('appointmentCtrl', function ($scope, $ionicPopup, $location) {

    //CHECK IF USER AVAILAB:E
    if ($.jStorage.get("user") == null) {
        $location.path("/app/login");
    };

    var maketrue = function () {
        takeappointment = true;
    };

    $scope.$on('$ionicView.enter', function () {
        takeappointment = true;
        maketrue();
    });

    //TAKE USER DETAILS IN VAR
    $scope.user = $.jStorage.get('user');

    var takeappointment = true;

    //BOOKED APPOINTMENT ARRAY
    $scope.appvalues = [];

    //FILL BOOKED APPOINTMENTS IN ARRAY
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM appointments", [], function (tx, results) {
            for (var j = 0; j < results.rows.length; j++) {
                $scope.appvalues.push(results.rows.item(j).app_id);
            };
        }, null);
    });

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

    //CREATE ARRAY OF DATE AND STUFF TO SHOW
    for (var i = 1; i < 7; i++) {
        if ($scope.month[i] == 5) {
            if ($scope.$scope.date[i - 1] == 31) {
                $scope.date[i - 1] = 1;
                $scope.month[i - 1] = d.getMonth() + 1;

            };
        };
        if ($scope.date[i - 1] == 32) {
            $scope.date[i - 1] = 1;
            $scope.month[i - 1] = d.getMonth() + 1;
            console.log($scope.month);
        };
        if ($scope.week[i - 1] == 7) {
            $scope.week[i - 1] = 0;
        };

        $scope.date[i] = $scope.date[i - 1] + 1;
        $scope.week[i] = $scope.week[i - 1] + 1;
        $scope.month[i] = $scope.month[i - 1];

        $scope.modelvalues[i - 1] = $scope.date[i - 1].toString() + $scope.month[i - 1].toString() + $scope.y.toString() + '4';
        $scope.modelvalues[i - 1] = parseInt($scope.modelvalues[i - 1]);
    };
    $scope.modelvalues[i - 1] = $scope.date[i - 1].toString() + $scope.month[i - 1].toString() + $scope.y.toString() + '4';
    $scope.modelvalues[i - 1] = parseInt($scope.modelvalues[i - 1]);

    //FUNCTION TO UPDATE REPORT TABLEW WITH APPOINTMENT ID
    $scope.updateid = function (appointmentinsertid) {
        db.transaction(function (tx) {
            console.log($scope.user.username);
            tx.executeSql("UPDATE `reports` SET `appointment_id`=" + appointmentinsertid + " WHERE `rowid`='" + reportinsertid + "'", [], function (tx, results) {
                console.log("updated");
            }, null);
        });

    };

    //BOOKING AN APPOINTMENT FUNCTION
    $scope.setappointment = function (i, mv, time) {
        if ($scope.appvalues.indexOf(mv) <= -1) {
            if (takeappointment == true) {
                //insert app value in database
                db.transaction(function (tx) {
                    tx.executeSql("INSERT INTO appointments(app_id,appvalue,patient,date,month,time) VALUES('" + mv + "','" + mv + "','" + $scope.user.username + "','" + $scope.date[i] + "','" + $scope.month[i] + "','" + time + "')", [], function (tx, results) {
                        console.log("added with ID");
                        console.log(results.insertId);
                        $scope.updateid(results.insertId);
                    }, null);

                });
                takeappointment = false;
                //ADDING INTO BOOKED ARRAY TO CHANGE COLOR
                $scope.appvalues.push(mv);
            } else {
                $scope.changepopup("You have already booked a slot, you may need to cancel the appointment before changing it");
            };
        } else {
            $scope.changepopup("The appointment is already booked !<br>Take another appointment.");
        };
    };


    $scope.changepopup = function (msg) {
        var p = $ionicPopup.show({
            template: '<div style="text-align:center">' + msg + '</div>',
            buttons: [

                {
                    text: '<b>Ok</b>',
                    type: 'button-dark',
                    }
    ]
        });

    };

    //FINISH FUNCTION
    $scope.gotohome = function () {
        $location.path("/app/home");
    };
})