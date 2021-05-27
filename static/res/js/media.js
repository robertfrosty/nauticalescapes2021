function some_function(e) {
	var current = e;
	document.getElementById('media_info_title').innerHTML = current.innerHTML;

	var a  = document.getElementsByClassName('visible')[0];
	var b = a.getElementsByTagName("IMG");

	for (i=0; i < b.length; i++) {
		b[i].className = (i + 1) + " nonactive";
	}

	document.getElementsByClassName('visible')[0].className = "media_hero invisible";
	document.getElementById(current.innerHTML).className = "media_hero visible";

	var x = document.getElementById(current.innerHTML);
	var y = x.getElementsByTagName("IMG");

	for (i=0; i < y.length; i++) {
		if (i == 0) {
			y[i].className = (i + 1) + " hero_image active";
		} else {
			y[i].className = y[i].className + " hero_image nonactive";
		}
	}
}

function both(param) {
	imgfs_out();
	imgfs(param);
}

function test(event) {
	if(document.getElementsByClassName("blownup")[0]){
		if((event.clientX < document.getElementsByClassName("blownup")[0].children[0].getBoundingClientRect().left || event.clientX > document.getElementsByClassName("blownup")[0].children[0].getBoundingClientRect().right) || (event.clientY > document.getElementsByClassName("blownup")[0].getBoundingClientRect().top || event.clientY > document.getElementsByClassName("blownup")[0].getBoundingClientRect().bottom)) {
			imgfs_out();
		}
	}
}


function imgfs(e) {
	var parent = e.parentElement;
	parent.className = "blownup";

	var nav = document.getElementsByClassName("blownup_nav")[0];

	e.style.width = "50%";
	e.style.height = "75%";

	var childs = parent.children;

	parent.appendChild(nav);

	var li = childs[2].children;

	for(i=0; i < li.length; i ++) {
		li[i].src = li[i].dataset.src;
	}

	var li2 = document.getElementsByClassName("trgimg");

	for(i=0; i < li.length; i ++) {
		li2[i].src = li[i].dataset.src;
	}

	nav.style.display = "block";
	nav.children[e.id - 1].classList.add("nav_active");

	/*nav.scrollLeft = nav.children[e.id - 1].getBoundingClientRect().right - e.getBoundingClientRect().right + 500;*/

	childs[1].classList.remove("invisible");
	childs[2].classList.remove("invisible");

	var targ = childs[1];

	targ.addEventListener("click", function() { imgfs_out() });
	event.stopPropagation();
	document.addEventListener("click", function(event) { test(event) });
}

function imgfs_out() {
	if(document.getElementsByClassName("blownup")[0]) {
	var parent = document.getElementsByClassName("blownup")[0];
	parent.className = "slidebox";

	childs = parent.children;

	childs[0].style.width = "100%";
	childs[0].style.height = "100%";

	var nav = document.getElementsByClassName("blownup_nav")[0];
	nav.style.display = "none";

	childs[1].classList.add("invisible");
	childs[2].classList.add("invisible");

	document.getElementsByClassName("nav_active")[0].classList.remove("nav_active");
	}
}

function right(rect, num) {
	if (rect.right - num <= 20) {
		document.getElementsByClassName("blownup")[0].children[2].scrollLeft = document.getElementsByClassName("blownup")[0].children[2].scrollLeft + 4;
		var i = setTimeout(function() {
			hovScroll(num);
		},100);
	}
}

function left(rect, num) {
	if (num - rect.left <= 20) {
		document.getElementsByClassName("blownup")[0].children[2].scrollLeft = document.getElementsByClassName("blownup")[0].children[2].scrollLeft - 4;
		setTimeout(function() {
			hovScroll(num);
		}, 100);
	}
}

function hovScroll(num) {
	var rect = document.getElementsByClassName("blownup")[0].children[0].getBoundingClientRect();
	right(rect, num);
	left(rect, num);
}

function stopProp() {
	console.log("hit");
	var highT = setTimeout(";");
	for (i=0; i < highT; i++) {
		clearInterval(i);
	}
}

function rimages() {
	var elem = document.getElementById("image_slides");
	for(i=0; i < elem.children.length; i ++) {
		elem.children[i].className = "slidebox";
		if(!(['png', 'jpg', 'JPG', 'jpeg'].includes(elem.children[i].children[0].src.split(".")[3]))) {
			elem.children[i].classList.add("invisible");
		}
	}
}

function rgifs() {
	var elem = document.getElementById("image_slides");
	for(i=0; i < elem.children.length; i ++) {
		if(!(['gif', 'GIF'].includes(elem.children[i].children[0].src.split(".")[3]))) {
			elem.children[i].classList.add("invisible");
		}
	}
}
