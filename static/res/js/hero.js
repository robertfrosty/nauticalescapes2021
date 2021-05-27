var count = 1;
var initial;
var init_d =[];
function imageSlideshow(e) {
	var current = e;
	count = current.id;
	console.log(count);
	for (i=0; i < init_d.length; i++) {
		clearTimeout(init_d[i]);
	}
	changeSlideshow();
	var y = document.getElementsByClassName("hero_image");
	var z = document.getElementsByClassName("active")[0];

	for (i=0; i < y.length; i++) {
		y[i].className = "hero_image nonactive " + (i + 1).toString();
	}
	var a = document.getElementsByClassName("visible")[0];
	var x = a.getElementsByClassName(current.id)[0];
	x.className = "hero_image active " + current.id.toString() + " fade-in";
	rad_list = a.getElementsByClassName("radio_button");
	for (i=0; i < rad_list.length; i++) {
		rad_list[i].className = "radio_button";
	}
	current.className = current.className + " radio_active";
}
function changeSlideshow() {
	for (i=1; i < 20; i++) {
		init_d[i] = setTimeout(function() {
			var a = document.getElementsByClassName("visible")[0];
			var list = a.getElementsByClassName("radio_button");
			if (count >= list.length) {
				count = 0;
			}
			list[count].click();
		}, i * 10000);
	}
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
