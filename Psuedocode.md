load window

on "Search" click{
        //parse form info
        //use info to make a api call to ticket master

        //function that returns the ticket master query
                take parameters 
                ajax call to TicketMaster
                        return list of  tmEvent objects. 
        
        //function that takes list of tmEvents and makes cards

        //function that takes tmEvents and makes locationObjects --> generatelocationObjects

        //refreshMap();
}

on Marker Click{
        //bubble up correct event? 
        point to related Card
}

////////rough code of map: 

//location object format: 

function generateLocationItem(eventList){
        var locationsList = [];

        eventList.forEach(event => {
                // var address = event.address
                // var location = function that return a location object
        
                //locationsList.push(location);
        });

        return locationsList;
}


//locationObjects are list of lat longs 
// locationFromForm: the location the user used as a search criteria.
function refreshMap(locationObjects, locationFromForm) {

        var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: locationFromForm
        });

        locationObjects.forEach(location => {
                var latitude = location.latitude;
                var longitude = location.longitude;

                var marker = new google.maps.Marker({
                        position: { lat: latitude, lng: longitude },
                        map: map
                });
        });
};

