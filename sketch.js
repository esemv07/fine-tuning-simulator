let sun;
let mercury;
let venus;
let earth;
let mars;
let jupiter;
let saturn;
let uranus;
let neptune;
let G = (4.03 * Math.pow(10, -5)); // 1 second = 1 week
let zoom = 0.5;
let animationPaused = false;


function setup() {
	createCanvas((windowWidth-400), (windowHeight-25));

	sun = new Body(333000, createVector(0, 0), createVector(0, 0), 34.817, color(253, 204, 108));


	mercury = new Body(0.0553, planetPos(25), planetVel(planetPos(25)), 2.4397, color(183, 184, 185));

	venus = new Body(0.815, planetPos(43.75), planetVel(planetPos(43.75)), 6.0518, color(238 ,203, 139));

	earth = new Body(1, planetPos(62.5), planetVel(planetPos(62.5)), 6.371, color(40, 122, 184));

	mars = new Body(0.815, planetPos(93.75), planetVel(planetPos(93.75)), 3.3895, color(156, 46, 53));

	jupiter = new Body(317.8, planetPos(312.5), planetVel(planetPos(312.5)), 69.911, color(188, 175, 178));

	saturn = new Body(95.2, planetPos(593.75), planetVel(planetPos(593.75)), 58.232, color(164, 155, 114));

	uranus = new Body(14.5, planetPos(1187.5), planetVel(planetPos(1187.5)), 25.362, color(172, 229, 238));

	neptune = new Body(17.1, planetPos(1875), planetVel(planetPos(1875)), 24.622, color(75, 112, 221));


	title = createP("Title<br>Second Line");
	title.position(width+10, 0);

	grav = createSlider((1 * Math.pow(10, -5)), (1 * Math.pow(10, -4)), (4.03 * Math.pow(10, -5)), (1 * Math.pow(10, -7)));
	grav.position(width+10, 60);
	grav.size(200);
	grav.input(pauseOrbit);
	grav.changed(resumeOrbit);

	grav_label = createP(`Universal Gravitational Constant: ${G*100000}x10<sup>-5<sup>`);
	grav_label.position(width+10, 70)
}

function draw() {
	G = grav.value();

	grav_label.html(`Universal Gravitational Constant: ${G*100000}x10<sup>-5<sup>`)

	translate(width/2, height/2);
	background(40);

	scale(zoom);

	if (!animationPaused) {
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
}

function windowResized() {
	resizeCanvas((windowWidth-400), (windowHeight-25));
}

function mouseWheel(event) {
	if (event.delta > 0) {
		zoom += 0.05;
	} else if (event.delta < 0 && zoom >= 0.15) {
		zoom -= 0.05;
	}

	return false;
}

function planetPos(r) {
	let theta = 0;
	return createVector(r*cos(theta), r*sin(theta));
}

function planetVel(planetPos) {
	let planetVel = planetPos.copy();
	planetVel.rotate(HALF_PI);
	planetVel.setMag( sqrt( G * sun.mass / planetPos.mag() ) )
	return planetVel;
}

function pauseOrbit() {
	animationPaused = true;
}

function resumeOrbit() {
	animationPaused = false;
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
		f.setMag( (G * this.mass * child.mass) / (Math.pow(r, 2)) )
		child.applyForce(f);
	}
}
