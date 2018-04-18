/////////////////////////////////////////////////
////////////  Global Variables.
////////////////////////////////////////////////

var locationObjects = [];
var center = { lat: 34.0522, lng: -118.2437 };
var testincr = 0;

/////////////////////////////////////////////////
////////////  Master Function
////////////////////////////////////////////////

function onCreation(){
        $("document").ready(function () {
                $("#map").on("click", function(){
        
                        //PUT ACTION HERE
                        markerTest();
                        initMap();
                });
        });
}

onCreation();


////////////////////////////////////////////////
/////////// Mapping Functions
////////////////////////////////////////////////


///summary 
/// initialize the map, recreates map with markers based off of location objects, and center 
///
function initMap() {

        var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: center
        });

        console.log("Location obj list: ")
        console.log(locationObjects);

        locationObjects.forEach(location => {

                var latitude = location.latitude;
                var longitude = location.longitude;

                var marker = new google.maps.Marker({
                        position: { lat: latitude, lng: longitude },
                        map: map,
                        draggable: true,
                        animation: google.maps.Animation.DROP,
                });
                marker.addListener('click', function(){
                        console.log("clicked");
                        if (marker.getAnimation() !== null) {
                          marker.setAnimation(null);
                        } else {
                          marker.setAnimation(google.maps.Animation.BOUNCE);
                        }
                });
        });
};

///Summary
/// Returns a location object with lat and long
///
function makeLocationObject(lat, long) {
        return {
                latitude: lat,
                longitude: long
        };
}

/// summary 
/// set the global variable center to latitude, longitude
///
function setCenter(latitude, longitude)
{
        center = { lat: latitude, lng: longitude };
}


// Test function Can trash after implement correct. 
function markerTest() {
        var lat = 34.0522;
        var long = -118.2437;

        //set center
        setCenter(lat, long);

        // clear locatioOBjects for new search
        locationObjects = [];

        // make location objects -> add to global variable location Objects. 
        for (var i = 0; i < 2.4; i+= .3) {
                var location = makeLocationObject(lat - testincr, long - i);
                locationObjects.push(location);
        }
        testincr += 5;
        console.log("button pushed");
}

////////////////////////////////////////////////
/////////// Click Events
////////////////////////////////////////////////






////////////////////////////////////////////////
//////////// TicketMaster Functions
////////////////////////////////////////////////
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
            $('#TM-City-Select').prepend("<option>Please Choose One</option>");
    
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
                $('#SubCat').prepend("<option>Please Choose One</option>");
    
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
    
    console.log("the Query Build is-------: " + queryBuild);
                        $.ajax({
                            type:"GET",
                            url: queryBuild,
                            async: true,
                            dataType: "json",
                            success: function(json) {
                            
console.log(json);  
                            ticketMasterRespondObjects = [];
                            for (var i=0; i<20; i++) {
console.log("entered for loop");
                                var responseObject = {
                                    playingAtVenue: json._embedded.events[i]._embedded.venues[0].name,
                                    latitude : json._embedded.events[i]._embedded.venues[0].location.longitude,
                                    longitude : json._embedded.events[i]._embedded.venues[0].location.longitude,
                                    segment: json._embedded.events[i].classifications[0].segment.name,
                                    genre: json._embedded.events[i].classifications[0].genre.name,
                                    date: json._embedded.events[i].dates.start.localDate,
                                    name: json._embedded.events[i].name,
                                    image: json._embedded.events[i].images[0].url
                                };
console.log("ticket master objects: " +  responseObject);    
                                ticketMasterRespondObjects.push(responseObject);
                            }
console.log("ticket master objects: " +  ticketMasterRespondObjects);
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