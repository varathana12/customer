const path = window.location.pathname
var array = path.split('/');
export const init_status_app_bar = array[array.length -1] === "Profile" ? true : false;

export const init_route_name = array[array.length-1]&&!(array[array.length-1]==="customer")?array[array.length-1]:"Booking"
