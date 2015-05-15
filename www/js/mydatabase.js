//DATA BASE VARIABLE
var db = openDatabase('headached', '1.0', 'headached DB', 2 * 1024 * 1024);

//INITIAL CREATE TABLE TRANSACTIONS
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS USERS (id Integer PRIMARY KEY AUTOINCREMENT, username char, password char, FOREIGN KEY (quesid) REFERENCES (QUESTIONS), answer integer )');
    db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS REPORTS (FOREIGN KEY (userid) REFERENCES (USERS) , FOREIGN KEY (username) REFERENCES (USERS) , FOREIGN KEY (headache) REFERENCES (MEDICINES) )');
        db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS MEDICINES (FOREIGN KEY (patientid) REFERENCES (USERS) , headache integer, mediname char  )');
            db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS  QUESTIONS ( quesid Integer, question char)');
    //tx.executeSql('DROP TABLE USERS');
});

console.log("heay");

var user = {};
//user = $.jStorage.get("user");
users = [];

db.transaction(function (tx) {
    tx.executeSql("SELECT * FROM users", [], function (tx, results) {
        for (var i = 0; i < results.rows.length; i++) {
            users.push(results.rows.item(i));
        };
        console.log(users);
    }, null);
});

//FILL DATABASE HERE< ALL INSERT STATEMENTS
db.transaction(function (tx) {
    tx.executeSql('INSERT INTO USERS VALUES (1, "abhay")');
    //tx.executeSql('DROP TABLE USERS');
});


var mydatabase = angular.module('database', ['controllers']);
    /*.factory('MyDatabase1', function ($location ) {
        
        //WRITE DATABASE QUERIES HERE, IT WILL RETURN
        return {

        getusername: function () {
            console.log("funstion called");
                db.transaction(function (tx) {
                    tx.executeSql("SELECT `username` FROM `users` WHERE `id`= '1'", [], function (tx, results) {
                        user = results.rows.item(0);
                        console.log(user);
                        //done();
                        console.log(questionsCtrl.done());
                    }, null);
                })
            },
            authenticate: function (username, password) {
                usernotpresent = true;
                for (var i = 0; i < users.length; i++) {
                    if (users[i].username == username) {
                        console.log(users[i]);
                        usernotpresent = false;
                        if (users[i].password == password) {
                            user = users[i];
                            //$.jStorage.set("user", user);
                            window.location.replace(window.location.origin + window.location.pathname + "#/app/questions");
                        };
                    };
                };
            },
        }
    }); */