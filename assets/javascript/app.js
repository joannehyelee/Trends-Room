$(document).ready(function(){
    function dropDown() {

    event.preventDefault();

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

        // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
        database.ref('-LA4CrA1ByvodmmTtkRQ').orderByValue().limitToLast(300).on("child_added", function(snapshot) {
            
           // event.preventDefault();

            // get the city codes
           var city = snapshot.val();
//console.log("the city code is: " + city);

            var cityName = snapshot.key;
//console.log("the city Name is: " + cityName);

            //create dropdown
            $('#TM-City-Select').append($('<option>', {
                value: city,
                text: cityName
            }));

        });
    ///////////////////////////////////////////////////////////////END of function dropDown()
    }
    //call the function
    dropDown();

    $('#TM-City-Select').on('change', {passive: true}, function(event){
        var userSelect = $('#TM-City-Select').val();
console.log("The value of the selection is: " + userSelect);
    });


/////////////////////////////////////////////////// var set ENDS //////////////////////////////////////
});