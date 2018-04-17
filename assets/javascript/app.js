$(document).ready(function(){
//global vars
    var ticketMasterRespondObjects = [];
/********************************************************* */

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

/************************************** START of FUNCTIONS ************************************/
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

/////////////////////////////// END of CITY FIND AND SHOW/////////////////////////////////////////////

//call the function DropDown Menu and read from it
dropDownCat();

////////////////////////////// GET GENRE AND CATEGORIES ////////////////////////////////////////////
    function dropDownCat (){    
        
        //detect the category selection and display the content for the subcategory
        $('#Cat').on('change', {passive: true}, function(event){
            event.preventDefault();

            //empty the dropdown menu
            $('#SubCat').empty();
            $('#SubCat').prepend("<option>please choose one</option>");

            //set the variable for category
            var catSelect = $('#Cat').val();
//console.log("the selected value is: " + catSelect);
            
            //construct the variable for connecting to the DB
            var dataSelect = '-LA90S7jRzghy4mvqy86/' + catSelect;
//console.log("The database referance is: " + dataSelect);
            
            // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
            database.ref(dataSelect).orderByValue().on("child_added", function(snapshot) {
                    
                // get the categories
                result = snapshot.val();
//console.log("the ID is: " + result.id + " The name is: " + result.name);
            
                //result id provide the id value for generating query
                resultId = result.id;

                //result id provide the id value for generating query
                resultName = result.name;
                        
                //create dropdown
                
                $('#SubCat').append($('<option>', {
                    value: resultId,
                    text: resultName
                }));
            });
        });
////////////////////// END of function dropDownCat() /////////////////////////////
    }
/////////////////////////////// END of CAT FIND AND SHOW/////////////////////////
        //call the function DropDown Menu and read from it
        dropDownCity();


//////////////////// START of Function generateQuery() //////////////////////////
    var userSelectCity, userSelectCat;

    function generateQuery() {
            

            

        //get and register the user selection for the city
        $('#TM-City-Select').on('change', {passive: true}, function(event){
            userSelectCity = $('#TM-City-Select').val();
console.log("The City code is YYYYYYYYY: " + userSelectCity); 

        //detect the category selection and display the content for the subcategory
        $('#Cat').on('change', {passive: true}, function(event){
            //set the variable for category
            var catSelect = $('#Cat').val();     
console.log("CatSelectis:XXXXXXX " + catSelect);

                //get and register the user selection for the type of event
                $('#SubCat').on('change', {passive: true}, function(event){
                    userSelectCat = $('#SubCat').val();
console.log("userSelectCat is:****** " + userSelectCat);

        var key = "&apikey=f5oUWGdzD2xIKTd5rGEGxwy0moJZvoWg";
        var baseURL = "https://app.ticketmaster.com/discovery/v2/events.json?";
        var classNum = "classificationId=" +  userSelectCat;
        var location = "&dmaId=" + userSelectCity;

        var queryBuild = baseURL + classNum + location + key;
//var query3 = baseURL + "classificationName=sports&dmaId=324&apikey=f5oUWGdzD2xIKTd5rGEGxwy0moJZvoWg"
console.log("the Query Build is-------: " + queryBuild);
                    $.ajax({
                        type:"GET",
                        url: queryBuild,
                        async: true,
                        dataType: "json",
                        success: function(json) {
                        
console.log(json);  
                        ticketMasterRespondObjects =[];
                        for (var i=0; i<20; i++) {
                            var responseObject = {
                                playingAtVenue = json._embedded.events[i]._embedded.venues[0].name,
                                latitude = json._embedded.events[i]._embedded.venues[0].location.longitude,
                                longitude = json._embedded.events[i]._embedded.venues[0].location.longitude,
                                segment = json._embedded.events[i].classifications[0].segment.name,
                                genre = json._embedded.events[i].classifications[0].genre.name,
                                date = json._embedded.events[i].dates.start.localDate,
                                name = json._embedded.events[i].name,
                                image = json._embedded.events["i"].images["0"].url
                            };

                            ticketMasterRespondObjects.push(responseObject);
                        }
                        },
                        error: function(xhr, status, err) {
                            console.log(err);
                        }
                    });
                });
            });
        });
       
    }

generateQuery()




/************************************** END of FUNCTIONS ************************************/
       
 
            
            




/////////////////////////////////////////////////// APP ENDS //////////////////////////////////////
});