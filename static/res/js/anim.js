function drawAnim() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	ctx.beginPath();
	ctx.arc(0, 25, 5, 0.5*Math.PI, 0, true);
	ctx.arc(10, 25, 5, 1*Math.PI, 0.5*Math.PI, true);
	ctx.arc(10, 25, 5, 0.5*Math.PI, 0, true);
	ctx.arc(20, 25, 5, 1*Math.PI, 0.5*Math.PI, true);
	ctx.arc(20, 25, 5, 0.5*Math.PI, 0, true);
	ctx.arc(30, 25, 5, 1*Math.PI, 0.5*Math.PI, true);
	ctx.arc(30, 25, 5, 0.5*Math.PI, 0, true);
	ctx.arc(40, 25, 5, 1*Math.PI, 0.5*Math.PI, true);
	ctx.stroke();
	ctx.closePath();


	ctx.beginPath();
	//Bottom Part of Buoy
	ctx.arc(100, 20, 40, 1*Math.PI, 0, true);
	ctx.fill();
}
