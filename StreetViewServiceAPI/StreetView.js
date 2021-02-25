// For full info about what methods/objects result in a billed API request see:
// https://developers.google.com/maps/documentation/javascript/usage-and-billing?hl=en_US

// A StreetViewService object performs searches for Street View data.
// https://developers.google.com/maps/documentation/javascript/reference/street-view-service

// A StreetViewPanorama object provides a Street View "viewer" which can be stand - alone within a separate < div > or bound to a Map.
// Displays the panorama for a given LatLng or panorama ID.
// https://developers.google.com/maps/documentation/javascript/reference/street-view

let panorama;
let panoDiv = document.getElementById("pano");

function initMap() {
  const location = { lat: 45.5098, lng: -122.6805 }; //PSU, Fourth Ave Building
  //const location = { lat: 37.869085, lng: -122.254775 }; //berkeley

  //The built-in Street View experience based on the Street View Pegman control, and the StreetViewService, are not billed.
  const sv = new google.maps.StreetViewService();

  //  panoramas generated with the StreetViewPanorama object are billed.
  panorama = new google.maps.StreetViewPanorama(panoDiv);

  // Set the initial Street View camera to the center of the map
  sv.getPanorama({ location: location, radius: 50 }, processSVData);
}

// Updates the pre-existing panorama with new StreetView data. Specfically, a new position.
function setNewPano(position) {
  const sv = new google.maps.StreetViewService();
  sv.getPanorama({ location: position, radius: 50 }, processSVData);
}

// The callback being provided. Essentially, 'what to do' after the panorama data get's fetched.
function processSVData(data, status) {
  if (status === "OK") {
    const location = data.location;
    panorama.setPano(location.pano);
    panorama.setPov({ heading: 180, pitch: 0 });
    panorama.setVisible(true);
  } else {
    console.error("Street View data not found for this location.");
  }
}
