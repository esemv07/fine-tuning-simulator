
// ### PLANETS ### //
let sun;
let mercury;
let venus;
let earth;
let mars;
let jupiter;
let saturn;
let uranus;
let neptune;
let G = (4.03 * Math.pow(10, -5)); // Universal Gravitational Constant (1 second = 1 week)
let exponent = 2;
let initial_vel = 1; // Initial Velocity multiplication factor
let zoom = 0.5; // Default canvas zoom
let animationPaused = false; // Animation pausing for slider
let started = false;


function setup() {
	canvas = createCanvas((windowWidth-400), (windowHeight-25));
	canvas.position(10, 10, 'fixed');

	
	createPlanets();

	createSidePanel();

}

function draw() {
	G = grav.value();
	exponent = exp.value();
	initial_vel = ivel.value();

	grav_value.html(`${round((G*100000), 2)} x 10<sup>-5<sup>`);
	exp_value.html(`G (m<sub>1</sub>m<sub>2</sub>) / r<sup>${exponent}</sup>`);
	ivel_value.html(`v = ${initial_vel} x v<sub>initial</sub>`);

	push();

	translate(width/2, height/2);
	background(40);

	scale(zoom);

	if (!animationPaused && started) {
		sun.attract(mercury);
		mercury.update();

		
		sun.attract(venus);
		venus.update();
		

		sun.attract(earth);
		earth.update();
		

		sun.attract(mars);
		mars.update();
		

		sun.attract(jupiter);
		jupiter.update();
		

		sun.attract(saturn);
		saturn.update();
		

		sun.attract(uranus);
		uranus.update();
		

		sun.attract(neptune);
		neptune.update();
	}

	mercury.show();
	venus.show();
	earth.show();
	mars.show();
	jupiter.show();
	saturn.show();
	uranus.show();
	neptune.show();

	sun.show();


	pop();

	// Outline Rectangle - not scaled with canvas zoom
	noFill();
	stroke(194, 221, 228);
	strokeWeight(15);
	rect(0, 0, width, height);

	noFill();
	colorMode(RGB, 255, 255, 255, 1);
	stroke(201, 55, 76, 0.5);
	strokeWeight(15);
	rect(0, 0, width, height);

}

function windowResized() {
	canvas = resizeCanvas((windowWidth-400), (windowHeight-25));
	title.position(width+20, -20);
	paragraph.position(width+20, 120);
	reset_zoom.position(width+255, 257);
	grav.position(width+20, 460);
	grav_label.position(width+20, 400);
	grav_value.position(width+295, 392.5);
	exp.position(width+20, 560);
	exp_label.position(width+20, 500);
	exp_value.position(width+185, 496);
}

function mouseWheel(event) {
	if (pmouseX < width && pmouseY < height) {
		if (event.delta > 0) {
			zoom += 0.05;
		} else if (event.delta < 0 && zoom >= 0.15) {
			zoom -= 0.05;
		}
		return false;
	}
}

function planetPos(r) {
	let theta = 0;
	return createVector(r*cos(theta), r*sin(theta));
}

function planetVel(planetPos) {
	let planetVel = planetPos.copy();
	planetVel.rotate(HALF_PI);
	planetVel.setMag( sqrt( G * sun.mass / planetPos.mag() ) );
	planetVel.mult(initial_vel);
	return planetVel;
}

function pauseOrbit() {
	animationPaused = true;
}

function resumeOrbit() {
	animationPaused = false;
}

function resetZoom() {
	zoom = 0.5;
}

function createPlanets() {
	// ### PLANETS SETUP ### //

	sun = new Body(333000, createVector(0, 0), createVector(0, 0), 34.817, color(253, 204, 108)); // (sun not to scale)


	mercury = new Body(0.0553, planetPos(25), planetVel(planetPos(25)), 2.4397, color(183, 184, 185));

	venus = new Body(0.815, planetPos(43.75), planetVel(planetPos(43.75)), 6.0518, color(238 ,203, 139));

	earth = new Body(1, planetPos(62.5), planetVel(planetPos(62.5)), 6.371, color(40, 122, 184));

	mars = new Body(0.815, planetPos(93.75), planetVel(planetPos(93.75)), 3.3895, color(156, 46, 53));

	jupiter = new Body(317.8, planetPos(312.5), planetVel(planetPos(312.5)), 69.911, color(188, 175, 178));

	saturn = new Body(95.2, planetPos(593.75), planetVel(planetPos(593.75)), 58.232, color(164, 155, 114));

	uranus = new Body(14.5, planetPos(1187.5), planetVel(planetPos(1187.5)), 25.362, color(172, 229, 238));

	neptune = new Body(17.1, planetPos(1875), planetVel(planetPos(1875)), 24.622, color(75, 112, 221));
}

function createSidePanel() {
	// ### SIDE PANEL ### //
	title = createP("Fine Tuning Simulator!");
	title.style('font-family', 'Goldman');
	title.style('font-size', '44px');
	title.style('color', 'rgb(19, 55, 105)');
	title.position(width+20, -20);

	paragraph = createP(`This simulator allows you to adjust constants to see their effect on the universe.<br><br><br>
						<b>Controls:</b><br>
						- Use sliders to adjust constants<br>
						- Scrollwheel or trackpad to zoom<br><br>
						<b>Notes:</b><br>
						- Default Universal Gravitational Constant is 4.03x10<sup>-5</sup>, therefore <b>1 second = 1 week</b><br>
						- Sun <u>is not</u> to scale but the other planets are<br>
						- <i>Initial Velocity Factor</i> must be set before pressing start`);
	paragraph.style('font-family', 'Labrada');
	paragraph.style('color', 'rgb(11, 31, 58)');
	paragraph.position(width+20, 120);

	start_button = createButton('<b><i>Start</i></b>');
	start_button.position(width+75, 195);
	start_button.mousePressed(startAll);
	start_button.style('background-color', 'rgba(19, 55, 105, 0.5)');
	start_button.style('color', 'rgb(11, 31, 58)');
	start_button.style('border-color', 'rgb(11, 31, 58)');
	start_button.style('border-radius', '3px');
	start_button.style('cursor', 'pointer');
	start_button.style('width', '100px')
	start_button.style('font-size', '20px')

	reset_button = createButton('<b><i>Reset</i></b>');
	reset_button.position(width+235, 195);
	reset_button.mousePressed(resetAll);
	reset_button.style('background-color', 'rgba(201, 55, 76, 0.5)');
	reset_button.style('color', 'rgb(11, 31, 58)');
	reset_button.style('border-color', 'rgb(201, 55, 76)');
	reset_button.style('border-radius', '3px');
	reset_button.style('cursor', 'pointer');
	reset_button.style('width', '100px')
	reset_button.style('font-size', '20px')

	reset_zoom = createButton('<i>Reset Zoom</i>');
	reset_zoom.position(width+255, 280);
	reset_zoom.mousePressed(resetZoom);
	reset_zoom.style('background-color', 'rgba(201, 55, 76, 0.5)');
	reset_zoom.style('color', 'rgb(11, 31, 58)');
	reset_zoom.style('border-color', 'transparent');
	reset_zoom.style('border-radius', '3px');
	reset_zoom.style('cursor', 'pointer');

	// Universal Gravitational Constant Slider //
	grav = createSlider((1 * Math.pow(10, -5)), (1 * Math.pow(10, -4)), G, (1 * Math.pow(10, -7)));
	grav.position(width+20, 520);
	grav.size(200);
	grav.class('grav-slider');
	grav.input(pauseOrbit); // Pause animation while sliding
	grav.changed(resumeOrbit); // Resume animation once changed

	grav_label = createP('<b>Universal Gravitational Constant: ');
	grav_label.style('font-family', 'Labrada');
	grav_label.style('color', 'rgb(11, 31, 58)');
	grav_label.style('font-size', '18px');
	grav_label.position(width+20, 460);
	grav_value = createP(`${round((G*100000), 2)} x 10<sup>-5<sup>`);
	grav_value.position(width+295, 452.5);
	grav_value.style('font-family', 'Labrada');
	grav_value.style('color', 'rgb(201, 55, 76)');
	grav_value.style('font-size', '18px');

	// Inverse Square Law Exponent Slider //
	exp = createSlider(1, 20, exponent, 1);
	exp.position(width+20, 600);
	exp.size(200);
	exp.class('grav-slider');
	exp.input(pauseOrbit); // Pause animation while sliding
	exp.changed(resumeOrbit); // Resume animation once changed

	exp_label = createP('<b>Inverse Square Law: ');
	exp_label.style('font-family', 'Labrada');
	exp_label.style('color', 'rgb(11, 31, 58)');
	exp_label.style('font-size', '18px');
	exp_label.position(width+20, 540);
	exp_value = createP(`G (m<sub>1</sub>m<sub>2</sub>) / r<sup>${exponent}</sup>`);
	exp_value.position(width+185, 536);
	exp_value.style('font-family', 'Labrada');
	exp_value.style('color', 'rgb(201, 55, 76)');
	exp_value.style('font-size', '18px');

	// Initial Velocity Factor Slider //
	ivel = createSlider(0.1, 20, initial_vel, 0.1);
	ivel.position(width+20, 680);
	ivel.size(200);
	ivel.class('grav-slider');
	ivel.input(pauseOrbit); // Pause animation while sliding
	ivel.changed(resumeOrbit); // Resume animation once changed

	ivel_label = createP('<b>Initial Velocity Factor: ');
	ivel_label.style('font-family', 'Labrada');
	ivel_label.style('color', 'rgb(11, 31, 58)');
	ivel_label.style('font-size', '18px');
	ivel_label.position(width+20, 620);
	ivel_value = createP(`v = ${initial_vel} x v<sub>initial</sub>`);
	ivel_value.position(width+200, 620);
	ivel_value.style('font-family', 'Labrada');
	ivel_value.style('color', 'rgb(201, 55, 76)');
	ivel_value.style('font-size', '18px');
}

function resetAll() {
	removeElements();
	started = false;
	animationPaused = false;
	resetZoom();
	G = (4.03 * Math.pow(10, -5));
	exponent = 2;
	initial_vel = 1;
	createPlanets();
	createSidePanel();
}

function startAll() {
	removeElements();
	createPlanets();
	createSidePanel();
	started = true;
}

function Body(mass, pos, vel, radius, colour) {
	this.mass = mass;
	this.pos = pos;
	this.vel = vel;
	this.r = radius;
	this.c = colour;

	this.show = function() {
		noStroke(); fill(this.c);
		ellipse(this.pos.x, this.pos.y, this.r, this.r);
	}

	this.update = function() {
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
	}

	this.applyForce = function(f) {
		this.vel.x += f.x / this.mass;
		this.vel.y += f.y / this.mass;
	}

	this.attract = function(child) {
		let r = dist(this.pos.x, this.pos.y, child.pos.x, child.pos.y);
		let f = this.pos.copy().sub(child.pos);
		f.setMag( (G * this.mass * child.mass) / (Math.pow(r, exponent)) )
		child.applyForce(f);
	}
}
