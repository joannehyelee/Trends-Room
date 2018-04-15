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

////////// Function city /////////////////
    function dropDownCity() {
        event.preventDefault();

        // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
        database.ref('-LA4CrA1ByvodmmTtkRQ').orderByValue().limitToLast(300).on("child_added", function(snapshot) {

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
    //////////END of function dropDownCity() //////////////////////////
    }

    //call the function DropDown Menu and read from it
    dropDownCity();
    $('#TM-City-Select').on('change', {passive: true}, function(event){
        var userSelectCity = $('#TM-City-Select').val();
console.log("The value of the selection is: " + userSelectCity);
    });

/////////////////////////////// END of CITY FIND AND SHOW/////////////////////////////////////////////

////////////////////////////// GET GENRE AND CATEGORIES ////////////////////////////////////////////
    function dropDownCat (){    
        //detect the category selection and display the content for the subcategory
        $('#Cat').on('change', {passive: true}, function(event){

            event.preventDefault();

            //set the variable for category
            var catSelect = $('#Cat').val();
console.log("the selected value is: " + catSelect);

            //construct the variable for connecting to the DB
            var dataSelect = '-LA90S7jRzghy4mvqy86/' + catSelect;
console.log("The database referance is: " + dataSelect);

            // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
            database.ref(dataSelect).orderByValue().on("child_added", function(snapshot) {
                // get the categories
                var result = snapshot.val();
console.log("the ID is: " + result.id + " The name is: " + result.name);

                //result id provide the id value for generating query
                var resultId = result.id;

                //result id provide the id value for generating query
                var resultName = result.name;

                //create dropdown
                $('#SubCat').append($('<option>', {
                    value: resultId,
                    text: resultName

                }));

            });

        });
////////////////////// END of function dropDownCat() /////////////////////////
    }

        //call the function DropDown Menu and read from it
        dropDownCat();

        $('#SubCat').on('change', {passive: true}, function(event){
            var userSelectCat = $('#SubCat').val();
console.log("The value of the selection is: " + userSelectCat);
        });

/////////////////////////////// END of CAT FIND AND SHOW/////////////////////////////////////////////


/////////////////////////////////////////////////// APP ENDS //////////////////////////////////////
});