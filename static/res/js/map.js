var cr_posx, cr_posy, np_valx, np_valy, xperc, yperc;
var rect;

var mouse_x;
var mouse_x;

var md = -1;

xperc = 50;
yperc = 50;

function pins(pins) {

}

function mvMouse(event) {
	mouse_x = event.clientX;
	mouse_y = event.clientY;
}

function mapDown(event) {
	event.preventDefault();
	rect = document.getElementsByClassName("map")[0].getBoundingClientRect();
	cr_posx = event.clientX - parseInt(document.getElementsByClassName("map")[0].getBoundingClientRect().left);
	cr_posy = event.clientY - parseInt(document.getElementsByClassName("map")[0].getBoundingClientRect().top);
	if (md == -1) {
		md = setInterval(mapDrag, 100)
	}
}

function mapUp(event) {
	if (md != -1) {
		clearInterval(md);
		md = -1;
	}
}

function mapDrag() {
	np_valx = (mouse_x - parseInt(document.getElementsByClassName("map")[0].getBoundingClientRect().left)) - cr_posx;
	np_valy = (mouse_y - parseInt(document.getElementsByClassName("map")[0].getBoundingClientRect().top)) - cr_posy;
	if (np_valx != 0 || np_valy != 0) {
		xperc = xperc + (np_valx / rect.right * 100);
		yperc = yperc + (np_valy / rect.bottom * 100);
		document.getElementsByClassName("map")[0].style.objectPosition = xperc.toString(10) + "% " + yperc.toString(10) + "%";
	}
}
