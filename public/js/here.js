if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        localCoord  = position.coords;
        objLocalCoord = {
            lat:   localCoord.latitude,
            lng:   localCoord.longitude,
        }

        // Initialize the platform object:
        let platform = new H.service.Platform({
            'apikey': window.hereApiKey
        });

        // Obtain the default map types from the platform object
        let defaultLayers = platform.createDefaultLayers();

        // Instantiate (and display) a map object:
        let map = new H.Map(
                document.getElementById('mapContainer'),
                defaultLayers.vector.normal.map,
                {
                    zoom: 13,
                    center: objLocalCoord,
                    pixelRatio: window.devicePixelRatio || 1
                });
                window.addEventListener('resize', () => map.getViewPort().resize());

        let ui = H.ui.UI.createDefault(map, defaultLayers);
        let mapEvents = new H.mapevents.MapEvents(map);
        let behavior = new H.mapevents.Behavior(mapEvents);

        //Dragable Marker Function
        function addDragableMarker(map, behavior){
            let inputLat = document.getElementById('lat');
            let inputLng = document.getElementById('lng');

            if (inputLat.value != '' && inputLng.value != '') {
                objLocalCoord = {
                    lat:   inputLat.value,
                    lng:   inputLng.value,
                }
            }

            let marker = new H.map.Marker(objLocalCoord, {
                volatility: true
            })
            marker.dragable = true;
            map.addObject(marker);
        }
    })
} else {
    console.error('Geolocation is not supported by this browser !!');
}
