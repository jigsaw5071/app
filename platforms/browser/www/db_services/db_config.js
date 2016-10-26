	 // Initialize Firebase
	 var config = {
	 	apiKey:constants.db_config.apiKey ,
	 	authDomain: constants.db_config.authDomain,
	 	databaseURL:constants.db_config.databaseURL ,
	 	storageBucket: constants.db_config.storageBucket,
	 	messagingSenderId: constants.db_config.messagingSenderId,
	 };

	 firebase.initializeApp(config);