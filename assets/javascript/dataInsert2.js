$(document).ready(function(){
    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyDgBiTT1tZkPzoAwQORSah0mfdrgq5vht0",
    authDomain: "trendroomproject.firebaseapp.com",
    databaseURL: "https://trendroomproject.firebaseio.com",
    projectId: "trendroomproject",
    storageBucket: "trendroomproject.appspot.com",
    messagingSenderId: "800339938200"
    };
    firebase.initializeApp(config);
    
    // Create a variable to reference the database.
    var database = firebase.database();

console.log("databse connected");

        
    database.ref().push({
             
            
        });
/////////////////////////////////////////////////// var set ENDS //////////////////////////////////////


});