function sitemap() {
	try {
		var toApp = document.getElementById("to_append");
		var url_list = window.location.pathname.split('/');
		for (i=1; i < url_list.length; i++) {
			var newAnc = document.createElement('a');
			newAnc.setAttribute("href", "/" + url_list[i]);
			newAnc.innerText = url_list[i] + " | ";
			toApp.appendChild(newAnc);
		}
	} catch(err) {
		console.log("No P To Append");
	}
}
