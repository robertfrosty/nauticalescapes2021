// Attach Event Listener For When The Page Is Loaded; When page content is loaded, add event listeners to check if any imaghes with the 'lazys' class are in view, and if they are, load them.

document.addEventListener("DOMContentLoaded", function() {
	var lazyloadImages = document.querySelectorAll("img.lazys");
	var lazyloadThrottleTimeout;

	function lazyload () {
		if (lazyloadThrottleTimeout) {
			clearTimeout(lazyloadThrottleTimeout);
		}

		lazyloadThrottleTimeout = setTimeout(function() {
			var scrollTop = window.pageYOffset;
			lazyloadImages.forEach(function(img) {
				if (img.offsetTop - 1000 < (window.innerHeight + scrollTop)) {
					try {
						img.src = img.dataset.src;
					} catch(err) {
						console.log(err);
						console.warn(`Error loading image ${img.src}; most likely 502 error caused by too many requests.`);
					}
					img.classList.remove('lazys');
					img.classList.add("fade-in");
				}
			});
			if (document.querySelectorAll("img.lazys").length == 0) {
				document.removeEventListener("scroll", lazyload);
				window.removeEventListener("resize", lazyload);
				window.removeEventListener("orientationChange", lazyload);
			}
		}, 20);
	}

	document.addEventListener("scroll", lazyload);
	window.addEventListener("resize", lazyload);
	window.addEventListener("orientationChange", lazyload);
})

//Function To Fire When User Scrolls; When user scrolls past a certain point the bottom navbar is given the 'sticky' class to give it a fixed position.

function myfunction() {
	var navbar_bottom = document.getElementsByClassName("navbar_bottom");
	var sticky = navbar_bottom[0].offsetTop;

	var rect = navbar_bottom[0].getBoundingClientRect();
	var rect1 = document.getElementsByClassName("navbar_top")[0].getBoundingClientRect();

	if (rect.top < rect1.bottom) {
		navbar_bottom[0].classList.remove("sticky");
	} else if (window.pageYOffset >= sticky) {
		navbar_bottom[0].classList.add("sticky");
	}
}

//Function That Fires When User Submits The Navbar Bottom Form; check's to ensure that all values are filled in with valid information, then verifies that the trip is available.

function chartercheck() {
	var date = document.getElementById("charterdate");
	var occup = document.getElementById("charteroccup");
	var type = document.getElementsByClassName("select_selected")[0];
	var amen = document.getElementsByClassName("select_selected")[1];

	if (date.value == "" || occup.value == "" || type.innerHTML == "Select Charter Type" || amen.innerHTML == "Select Additional Amenities") {
		console.log("No Input");
	} else {
		document.getElementById("hidden_type").value = type.getElementsByClassName("value")[0].innerHTML;
		document.getElementById("hidden_amen").value = amen.getElementsByClassName("value")[0].innerHTML;

		var info = {"date_s":date.value};

		var xmlhttp = new XMLHttpRequest();

		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == XMLHttpRequest.DONE) {
				var resp = JSON.parse(xmlhttp.responseText);

				if (resp['status'] == "True") {
					document.getElementById("availability_inner").innerHTML = "Available";
					document.getElementById("availability_inner").style.color = "#45d158";
					document.getElementById("hidden_amen").nextElementSibling.disabled = false;
				}
				else {
					document.getElementById("availability_inner").innerHTML = "Not Available";
					document.getElementById("availability_inner").style.color = "#d17777";
					console.log("Not Available");
				}
			}
		}

		xmlhttp.open("POST", "/trip_check");
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(JSON.stringify(info));
	}
}

//Function That Fires When User Clicks Hamburger Button In Mobile Navbar; activates the mobile navbar, and deactivates the desktop(larger) navbar.

function hamburganim(x) {
	x.classList.toggle("change");
	x.parentElement.parentElement.classList.toggle("chngclr");

	document.getElementsByClassName("anc_cont")[0].classList.toggle("nonactive");
}

function loadCustomSelect() {
	var x, i, j, l, ll, selElmnt, a, b, c;
	x = document.getElementsByClassName("custom_select");
	l = x.length;

	for (i=0; i < l; i++) {
		selElmnt = x[i].getElementsByTagName("select")[0];
		ll = selElmnt.length;

		a = document.createElement("DIV");
		a.setAttribute("class", "select_selected");
		a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		x[i].appendChild(a);

		b = document.createElement("DIV");
		b.setAttribute("class", "select_items select_hide");
		for (j=1; j < ll; j++) {
			c = document.createElement("DIV");
			c.innerHTML = selElmnt.options[j].innerHTML;
			c.addEventListener("click", function(e) {
				var y, i, k, s, h, sl, yl;
				s = this.parentNode.parentNode.getElementsByTagName("select")[0];
				sl = s.length;
				h = this.parentNode.previousSibling;
				for (i=0; i < sl; i++) {
					if (s.options[i].innerHTML == this.innerHTML.split("<")[0]) {
						s.selectIndex = i;
						h.innerHTML = this.innerHTML;
						y = this.parentNode.getElementsByClassName("same_as_selected");
						yl = y.length;
						for (k=0; k < yl; k++) {
							y[k].removeAttribute("class");
						}
						this.setAttribute("class", "same_as_selected");
						break;
					}
				}
				chartercheck();
				h.click;
			});
			d = document.createElement("SPAN");
			d.setAttribute("class", "value nonactive");
			d.innerHTML = j;
			c.appendChild(d);
			b.appendChild(c);
		}
		x[i].appendChild(b);
		a.addEventListener("click", function(e) {
			e.stopPropagation();
			closeAllSelect(this);
			chartercheck();
			this.nextSibling.classList.toggle("select_hide");
			this.classList.toggle("select_arrow_active");
		});
	}
	function closeAllSelect(elmnt) {
		var x, y, i, xl, yl, arrNo = [];
		x = document.getElementsByClassName("select_items");
		y = document.getElementsByClassName("select_selected");

		xl = x.length;
		yl = y.length;

		for (i=0; i < yl; i++) {
			if (elmnt == y[i]) {
				arrNo.push(i)
			} else {
				y[i].classList.remove("select_arrow_active");
			}
		}
		for (i = 0; i < xl; i++) {
			if (arrNo.indexOf(i)) {
				x[i].classList.add("select_hide");
			}
		}
	}

	document.addEventListener("click", closeAllSelect);
}
