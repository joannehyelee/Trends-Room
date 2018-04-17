/////////////////////////////////////////////////
////////////  Master Function
////////////////////////////////////////////////

function onCreation(){

}

onCreation();


////////////////////////////////////////////////
/////////// Mapping Functions
////////////////////////////////////////////////





////////////////////////////////////////////////
/////////// Click Events
////////////////////////////////////////////////







////////////////////////////////////////////////
//////////// TicketMaster Functions
////////////////////////////////////////////////
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

var locationObjects = [];
var center = { lat: 34.0522, lng: -118.2437 };
var testincr = 0;

//locationObjects are list of lat longs 
// locationFromForm: the location the user used as a search criteria.
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
