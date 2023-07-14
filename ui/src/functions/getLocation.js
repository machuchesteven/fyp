function getLocation(accepted) {
  const displayLocation = (location) => {
    console.log(location.coords.latitude, location.coords.longitude, location.coords.accuracy);
  }
  const showError = (err) => {
    console.error(err);
  }
  if (navigator.geolocation && accepted === true) {
    return navigator.geolocation.getCurrentPosition(displayLocation, showError, [])
  } else {
    return "Location is not supported";
  }
}

export default getLocation