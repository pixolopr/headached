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
            
           db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (1,"Are you feeling pain, Pressure or fullness in your cheeks, brows or forehead?")')
                  });
              
           db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (2,"How much is the pain worsening when bending or lying down?")')
                  });
                        
     db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (3,"Do you have Yellow- Green or Blood-Tingled Nasal Discharge?")')
                  });
                        
     db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (4,"Do you have a stuffy nose?")')
                  });
                        
     db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (5,"How much fever do you have?")')
                  });
                        
     db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (6,"Howmuch cough are you suffering from?")')
                  });
                        
     db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (7,"Have you lost the ability to smell or taste?")')
                  });
                        
     db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (8,"Are you feeling restless or nervous?")')
                  });
                        
     db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (9,"Are you feeling Thirsty and hungry or may not feel like eating?")')
                  });
                        
     db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (10,"How much is the pain on one side or both sides of the head? ")')
                  });
                        
     db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (11,"Does the pain getting worsen from moderate to very bad? Is the pain so bad that you cannot do your usual activities? ")')
                  });
                        
     db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (12,"Do you ahve the feeling of Nausea or vommiting or both?")')
                  });
                        
     db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (13,"Does the pain get worsen  when you are around light , noise or near a strong odour? ")')
                  });
                        
     db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (14,"Does the pain generally located in or around one eye? Does the pain radiate to other areas of your face, head, neck and shoulders?")')
                  });
                        
     db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (15,"How much is the intensity of one sided pain?")')
                  });
                        
     db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (16,"Do you have excessive tearing from eyes?")')
                  });
                        
     db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (17,"Are you suffering from stuffy or runny nasal passage on the affected side of your face?")')
                  });
                        
     db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (18,"Do you have swelling around the eye on the affected side of your face?")')
                  });
                        
     db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (19,"Do you have Drooping eye-lid?")')
                  });
                        
     db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (20,"Doe sheadache ocur at nighyt, usually for one to two hours after you go to bed or lasts for fifteen minutes to three hours?")')
                  });
                        
     db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (21,"Do you feel fatigued(tired)?")')
                  });
                        
     db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (22,"Do you suffer from irritability?")')
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
