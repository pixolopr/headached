//DATA BASE VARIABLE
var db = openDatabase('headached', '1.0', 'headached DB', 2 * 1024 * 1024);

//INITIAL CREATE TABLE TRANSACTIONS
db.transaction(function (tx) {});
//tx.executeSql('DROP TABLE USERS');
/*tx.executeSql('CREATE TABLE IF NOT EXISTS USERS (id Integer PRIMARY KEY AUTOINCREMENT, username varchar, password varchar, gender varchar, email varchar, contact varchar )');*/
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS reports (userid INTEGER,username VARCHAR,headache VARCHAR,appointment_id integer,FOREIGN KEY (userid) REFERENCES USERS(id)   , FOREIGN KEY (headache) REFERENCES MEDICINES(headache) )');
    //tx.executeSql('DROP TABLE reports');
});

db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS MEDICINES ( id Integer PRIMARY KEY,headache varchar , method varchar, mediname varchar )');
    //tx.executeSql('DROP TABLE MEDICINES');
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS  QUESTIONS ( quesid Integer PRIMARY KEY, question varchar,answer1 varchar)');
        //tx.executeSql('DROP TABLE  QUESTIONS ');
    });
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS appointments (app_id Integer PRIMARY KEY,appvalue Integer,patient varchar ,date Integer,month Integer,time integer)');
        //tx.executeSql('DROP TABLE appointments');
    });

    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS USERS (id Integer PRIMARY KEY AUTOINCREMENT, username varchar , password varchar, gender varchar, email varchar, contact varchar,answer varchar,question varchar,age Integer )');
        // tx.executeSql('DROP TABLE  reports ');
    });
});
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS  secret_question ( queid Integer primary key, questions varchar)');
});
db.transaction(function (tx) {
    tx.executeSql('insert into secret_question values(1,"Which is your favourite movie")');
})
db.transaction(function (tx) {
    tx.executeSql('insert into secret_question values(2,"Which is your favourite sports")');
})

db.transaction(function (tx) {
    tx.executeSql('insert into secret_question values(3,"Which is your favourite software")');
})

db.transaction(function (tx) {
    tx.executeSql('insert into secret_question values(4,"Where you want to go for holiday")');
})

db.transaction(function (tx) {
    tx.executeSql('insert into secret_question values(5,"What is your favourite dish")');
})

console.log("heay");

var user = [];
//user = $.jStorage.get("user");
users = [];

// HEAD
db.transaction(function (tx) {
    tx.executeSql("SELECT * FROM users", [], function (tx, results) {
        for (var i = 0; i < results.rows.length; i++) {
            users.push(results.rows.item(i));
        };
        console.log("hi");
    }, null);
});

//FILL DATABASE HERE< ALL INSERT STATEMENTS
db.transaction(function (tx) {
    tx.executeSql('INSERT INTO USERS VALUES (1, "abhay","","","","")');
    console.log("yup");
    //tx.executeSql('DROP TABLE USERS');
});


db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (1,"Are you feeling pain, Pressure or fullness in your cheeks, brows or forehead?","Yes")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (2,"How much is the pain worsening when bending or lying down?","Low")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (3,"Do you have Yellow- Green or Blood-Tingled Nasal Discharge?","Yes")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (4,"Do you have a stuffy nose?","Yes")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (5,"How much fever do you have?","Low")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (6,"How much cough are you suffering from?","Low")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (7,"Have you lost the ability to smell or taste?","Yes")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (8,"Are you feeling restless or nervous?","Yes")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (9,"Are you feeling Thirsty and hungry or may not feel like eating?","Yes")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (10,"How much is the pain on one side or both sides of the head? ","Low")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (11,"Does the pain getting worsen from moderate to very bad? Is the pain so bad that you cannot do your usual activities? ","Yes")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (12,"Do you ahve the feeling of Nausea or vommiting or both?","Yes")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (13,"Does the pain get worsen  when you are around light , noise or near a strong odour? ","Yes")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (14,"Does the pain generally located in or around one eye? Does the pain radiate to other areas of your face, head, neck and shoulders?","Yes")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (15,"How much is the intensity of one sided pain?","Low")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (16,"Do you have excessive tearing from eyes?","Yes")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (17,"Are you suffering from stuffy or runny nasal passage on the affected side of your face?","Yes")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (18,"Do you have swelling around the eye on the affected side of your face?","Yes")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (19,"Do you have Drooping eye-lid?","Yes")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (20,"Does headache ocur at nighyt, usually for one to two hours after you go to bed or lasts for fifteen minutes to three hours?","Yes")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (21,"Do you feel fatigued(tired)?","Yes")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO QUESTIONS VALUES (22,"Do you suffer from irritability?","Yes")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO MEDICINES VALUES (1,"Sinus","Allopathy","1. Paracetamol 2. Diclofenac sodium 3. Ibuprofen Antibiotics:-  1. Ampicillin 2. Amoxicillin 3. Cephalexin 4.Ciprofloxacin ")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO MEDICINES VALUES (2,"Migraine","Allopathy","1. Paracetamol 2. Diclofenac sodium 3. Ibuprofen Antibiotics:-  1. Ampicillin 2. Amoxicillin 3. Cephalexin 4.Ciprofloxacin ")')
});


db.transaction(function (tx) {
    tx.executeSql('INSERT INTO MEDICINES VALUES (3,"Cluster","Allopathy","1. Paracetamol 2. Diclofenac sodium 3. Ibuprofen Antibiotics:-  1. Ampicillin 2. Amoxicillin 3. Cephalexin 4.Ciprofloxacin ")')
});


db.transaction(function (tx) {
    tx.executeSql('INSERT INTO MEDICINES VALUES (4,"Sinus","Ayurvedic","Remedy 1: Steam inhalation taken five to six times a day with holy basil (Tulsi) can be very effective in curing sinusitis. In case of acute sinus pain, steam may be required for seven to ten days and in chronic sinusitis pain it may continue for two years. Doing Pranayam (yogic breathing) in the form of Kapal Bhaati (forced exhalation) can help to drain out pollutants from the sinuses.                                                                                                                   Remedy 2: One should practice ‘kunjar’, ‘jalneti’ ‘rubberneti’ and ‘ghritneti’ after waking up at 4:30 am and relieving oneself. Thereafter, at around six in the morning a person should massage their abdomen, face and spinal cord and then have a foot bath and sponge bath using water water infused with neem leaves. At 8 am, you should have some lemon juice with honey or orange juice  in half a glass of warm water. At eleven in the morning aperson should have lemon juice, honey, orange or some seasonal fruits. In the afternoon at 2 pm, take water, honey, soup or fruit juice. Keep covering your face and neck after taking hot steam. At 6 pm take seasonal fruits like pomegranate, orange, sweet orange, papaya, apple, pear or others.                                                                                                                                                                                                                                                                    Remedy 3: Avoid having milk, sugar, coffee, white flour, fried or oily products made of gram flour, refined fast food, carbonated soft drinks and other such drinks, biscuits, bread, meat, liquor, cigarette, toffee and chocolates.Improvement in diet regime is the permanent treatment of the disease.                                                                                                                                                                                                          Remedy 4: In the beginning of the problem, one should have lemon juice with water for three days or fast, having water only. Then, for next five days keep a strict watch on your diet, eliminating the above mentioned foods. After a week, increase the amount you eat, including foods like roti during lunch and dinner along with vegetables, salad, curd and sprouted cereals. After recovery, the patient should regularly have a vapour bath in the morning. Afterwards, cold waist bath and spinal cord bath is also suggested, which increases one’s immunity.                                                                                                                                            Remedy 5: A good remedy is to have ginger with honey. All you need to do is mix ginger powder with jaggery and make tablets weighing 5 grams (approx.). Have these tablets twice a day. Alternatively, you could have a concoction made with 11 leaves of basil (tulsi), black pepper 11 in number, sugar candy 20 grams, ginger 2 grams and one glass full of water. Boil all the ingredients till it is reduced to half, strain it and have it while it is still warm. Don’t take bath for around one-and-a-half hour after having this medicine and make sure you rest for a while. Continue these activities for five days and you should get imminent relief.                                                                                                                                                      Remedy 6: One should perform pranayama, janusheershasan, ardhmatyendrasan, dhanurasan, chakrasan, shalabasan, bhujangasan, sarvangasan, halasan, matyasan, shavasan, morning walk and meditation for 15 minutes, which helps in increasing the immunity. These are some simple steps to avoid and overcome sinusitis. ")')
});

db.transaction(function (tx) {
    tx.executeSql('INSERT INTO MEDICINES VALUES (5,"Migraine","Ayurvedic","                                                                 Remedy 1: Natural home remedy using carrot juice and spinach juice:                                                                               1.Take ½ glass of carrot juice.                                                                                                                    2. Add ½ glass of spinach juice.                                                                                                                  3. Mix well.                                                                                                                                     4. Drink this juice to cure migraine and cluster headaches.                                                                                 Remedy 2: Natural home remedy using cabbage leaves:                                                                                             1. Crush a few cabbage leaves.                                                                                                                  2. Apply it on the forehead with a cloth.                                                                                                    Remedy 3: Natural home remedy using lemons:                                                                                                        1. Remove peels from 5 lemons.                                                                                                                  2. Grind them well.                                                                                                                             3. Add a little water and make paste.                                                                                                            4. Apply this paste on the forehead.                                                                                                           Remedy 4: Natural home remedy using chamomile powder:                                                                                           1. Add chamomile powder to 1 cup of boiling water.                                                                                                2. Transfer the liquid to a cup.                                                                                                                  3. Drink when hot.                                                                                                                              4. It gives fast relief from migraine and cluster headache. ")')
});
db.transaction(function (tx) {
    tx.executeSql('INSERT INTO MEDICINES VALUES (6,"Cluster","Ayurvedic","                                                                  Remedy 1: Natural home remedy using carrot juice and spinach juice:                                                                               1.Take ½ glass of carrot juice.                                                                                                                   2. Add ½ glass of spinach juice.                                                                                                                  3. Mix well.                                                                                                                                      4. Drink this juice to cure migraine and cluster headaches                                                                                   Remedy 2: Natural home remedy using cabbage leaves:                                                                                                1. Crush a few cabbage leaves.                                                                                                                   2. Apply it on the forehead with a cloth.                                                                                                          Remedy 3: Natural home remedy using lemons:                                                                                                      1. Remove peels from 5 lemons.                                                                                                                    2. Grind them well.                                                                                                                                3. Add a little water and make paste.                                                                                                              4. Apply this paste on the forehead.                                                                                                            Remedy 4: Natural home remedy using chamomile powder:                                                                                              1. Add chamomile powder to 1 cup of boiling water.                                                                                               2. Transfer the liquid to a cup.                                                                                                                3. Drink when hot.                                                                                                                                4. It gives fast relief from migraine and cluster headache. ")')
});




// origin/master


//});

var mydatabase = angular.module('database', ['controllers']);
/*factory('MyDatabase1', function ($location) {

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
});*/