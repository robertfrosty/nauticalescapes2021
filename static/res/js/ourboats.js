function onChange(checkbox, xfunc) {
	const value = checkbox.nextElementSibling.checked;
	xfunc(value, checkbox);
}

function simpDrop(on, xval) {
	if (on) {
		xval.parentElement.parentElement.style.height = "auto";
		xval.style.transform = "rotate(180deg)";
	} else {
		xval.parentElement.parentElement.style.height = "80vw";
		xval.style.transform = "rotate(0deg)";
	}
}
