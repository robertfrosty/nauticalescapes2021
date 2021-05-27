var mymap = L.map('mapid').setView([42.877326, -79.253692], 12);
function lmap() {
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 15,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1Ijoicm9iZXJ0ZnJvc3R5IiwiYSI6ImNra3p1YTM4NjBheDEyb3FvMHA3d3BobnMifQ.D7UuEqXTKzF90Qp-aOyaZw'
	}).addTo(mymap);

	mymap.zoomControl.remove();

	L.control.zoom({
		position: 'bottomright'
	}).addTo(mymap);
}

lmap();
