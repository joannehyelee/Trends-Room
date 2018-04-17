/////////////////////////////////////////////////
////////////  Master Function
////////////////////////////////////////////////

function onCreation(){

}

onCreation();


////////////////////////////////////////////////
/////////// Mapping Functions
////////////////////////////////////////////////

var locationObjects = [];
var center = { lat: -25.363, lng: 131.044 };
var testincr = 0;
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

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
                        icon: iconBase + "./elon.jpg"
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

function makeLocationObject(lat, long) {
        return {
                latitude: lat,
                longitude: long
        };
}


function markerTest() {
        var lat = -25.363;
        var long = 131.044;

        center = { lat: -25.363, lng: 131.044 };

        for (var i = 0; i < 18; i+= 3) {
                var location = makeLocationObject(lat - testincr, long - i);
                locationObjects.push(location);
        }
        testincr += 5;
        console.log("button pushed");
}

$("document").ready(function () {
        $("button").on("click", function(){

                markerTest();
                initMap();
        });
});




////////////////////////////////////////////////
/////////// Click Events
////////////////////////////////////////////////







////////////////////////////////////////////////
//////////// TicketMaster Functions
////////////////////////////////////////////////
