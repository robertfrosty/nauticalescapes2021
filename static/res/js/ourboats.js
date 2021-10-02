function onChange(checkbox, xfunc) {
	const value = checkbox.nextElementSibling.checked;
	xfunc(value, checkbox);
}

function simpDrop(on, xval) {
	if (on) {
		xval.parentElement.parentElement.style.height = "auto";
		xval.style.transform = "rotate(180deg) translate(50%, 0)";
	} else {
		xval.parentElement.parentElement.style.height = "105vw";
		xval.style.transform = "rotate(0deg) translate(-50%, 0)";
	}
}
