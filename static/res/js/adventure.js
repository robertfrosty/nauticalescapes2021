function explore(e) {
	e.parentElement.parentElement.style.display = "none";
	e.parentElement.parentElement.previousElementSibling.style.filter = "grayscale(0) opacity(1)";

	document.getElementById("hidemap").classList.remove("nonactive");
}

function hideMap(e) {
	e.previousElementSibling.style.display = "flex";
	e.previousElementSibling.previousElementSibling.style.filter = "grayscale(1) opacity(0.4)";

	e.classList.add("nonactive");
}

function textswap(e) {
	if (! e.previousElementSibling.previousElementSibling.children[0].src) {
		var imgs = e.previousElementSibling.previousElementSibling.children;
		for(i=0; i < imgs.length; i++) {
			imgs[i].src = imgs[i].dataset.src;
			imgs[i].classList.add("fade-in");
		}
	}
	e.parentElement.getElementsByClassName("textswap")[0].classList.toggle("nonactive");
	e.parentElement.getElementsByClassName("imagegrid")[0].classList.toggle("nonactive");
}

x = true;

function loadAllAdvents(vid) {
	console.log(x);
	if (x) {
	const promise1 = new Promise((resolve, reject) => {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				lsi2 = JSON.parse(xhttp.responseText);
				var ll = document.getElementsByClassName("adventure").length;
				for (i=0; i < lsi2.length; i++) {
					var dv = document.createElement("DIV");
					dv.className = "adventure";
					dv.id = ll + i + 1;
					var dv2 = document.createElement("DIV");
					dv2.className = "adventure_imgs";
					img1 = document.createElement("IMG");
					img1.src = "/static/images/advents/" + lsi2[i][3]['dir'] + "/" + lsi2[i][3]['files'][0];
					img1.id = "changeme_" + lsi2[i][3]['dir'];
					img1.className = "fade-in";
					img1.alt = "";
					var img2 = document.createElement("IMG");
					img2.src = "/static/images/line.png";
					img2.className = "hr fade-in";
					img2.alt = "Dashed, curved line";
					dv2.appendChild(img1);
					dv2.appendChild(img2);
					dv.appendChild(dv2);
					var dv3 = document.createElement("DIV");
					dv3.className = "adventure_text";
					var head1 = document.createElement("H1");
					head1.innerHTML = lsi2[i][7];
					var p1 = document.createElement("P");
					p1.className = "textswap";
					p1.innerHTML = lsi2[i][10];
					var dv4 = document.createElement("DIV");
					dv4.className = "imagegrid nonactive";
					var dv5 = document.createElement("DIV");
					dv5.className = "socicons";
					var a1 = document.createElement("A");
					a1.href = lsi2[i][4];
					var img3 = document.createElement("IMG");
					img3.src = "/static/images/icons/youtube.png";
					a1.appendChild(img3);
					a1.innerHTML = a1.innerHTML + "Youtube";
					var a2 = document.createElement("A");
					a2.href = lsi2[i][5];
					a2.innerText = "Instagram";
					var img4 = document.createElement("IMG");
					img4.src = "/static/images/icons/instagram.png";
					a2.appendChild(img4);
					var a3 = document.createElement("A");
					a3.href = lsi2[i][6];
					a3.innerText = "Twitch";
					var img5 = document.createElement("IMG");
					img5.src = "/static/images/icons/twitch.png";
					a3.appendChild(img5);
					dv5.appendChild(a1);
					dv5.appendChild(a2);
					dv5.appendChild(a3);
					var btnn = document.createElement("BUTTON");
					btnn.className = "button_white";
					btnn.innerHTML = "See Images";
					btnn.addEventListener("click", function() { textswap(this) });
					dv3.appendChild(head1);
					dv3.appendChild(p1);
					dv3.appendChild(dv4);
					dv3.appendChild(dv5);
					dv3.appendChild(btnn);
					dv.appendChild(dv3);
					document.getElementsByClassName("adventures")[0].appendChild(dv);
					resolve("Success");
				}
			}
		}
		xhttp.open("POST", "/ouradventure_loadall");
		xhttp.send(JSON.stringify(document.getElementsByClassName("adventure").length));
	});

	promise1.then((value) => {
		console.log(value);
		window.scrollTo({top: document.getElementById(vid).getBoundingClientRect().top - 30, behaviour:'smooth'});
		x = false;
	});

	} else {
		window.scrollTo({top: document.getElementById(vid).getBoundingClientRect().top - 30, behaviour:'smooth'});
	}
}
