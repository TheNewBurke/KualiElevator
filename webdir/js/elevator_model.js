
// Elevator will have a controller that will construct and control the simulation

//import("./owl-deepcopy");

ElevatorController = {
	//Properties
	cars: [],
	floors: [],
	topFloor: 1,
	latestRequestedCarIndex: 0;

	//Methods
	init: function(numberOfCars, numberOfFloors) {
		this.cars = [];
		if (numberOfFloors == null || < 1) { this.floors = 1; }
		else { this.floors = numberOfFloors; }
		
		for (var i=0; i<numberOfCars; i++)  {
			this.cars.push(this.createCar());
		}
	},
	createCar: function() {
		return Car.init();
		//return deepCopy(Car);
	},
	getTopFloor: function() {
		return this.floors;
	},
	//Car calling methods
	pushUpButton: function(floor) {
		this.externalRequestCarToFloor(floor, 1);
	},
	pushDownButton: function(floor) {
		this.externalRequestCarToFloor(floor, -1);
	},
	//when a button from outside the car is called
	externalRequestCarToFloor: function(floor, direction) {
		closestCarIndex = 0;
		closetCar = this.cars[closestCarIndex];
		for (var i=0; i<this.cars.length; i++)  {
			if (this.cars[i].currentFloor == floor && this.cars[i].occupied == false) {
				//do this first if possible
				closetCar = this.cars[i];
				break;
			}
			if (this.cars[i].occupied == true && this.cars[i].directionMoving == direction) {
				//occupied and moving in the desired direction takes priority next
				closetCar = this.cars[i];
				break;	
			}
			else {
				if Math.abs((this.cars[i].currentFloor - floor)) < Math.abs((closetCar.currentFloor - floor)) {
					closetCar = this.cars[i];
				}
			}

		}
		closetCar.goToFloor(floor, direction);
	},
	showCarOnFloor: function(floor) {

	},
	cancelDirectionLight: function(floor) {

	},

};

Floor = {
	upLightIsOn: false,
	downLightIsOn: false,
	init: function() {
		return this;
	}
};

Car = {
	currentFloor: 1,
	trips: 0,
	maintenanceMode: false,
	occupied: false,
	requestedFloor: null,
	directionMoving: null, // 1 = up, -1 = down
	init: function() {
		return this;
		//return a car object
		//NOTE: if this singleton issue is present owl.deepCopy addresses it
	},
	reportAtFloor: function() {
		ElevatorController.
	},
	reportOpening: function() {

	},
	reportClosing: function() {

	},
	goToFloor: function(floor, direction) {
		if (floor > ElevatorController.getTopFloor()) { this.requestedFloor = ElevatorController.getTopFloor(); }
		else if (floor < 1) { this.requestedFloor = 1; }
		else { this.requestedFloor = floor; }
		while (this.requestedFloor != this.currentFloor) {
			// implement a timer to make this change not all at once
			if (this.requestedFloor > this.currentFloor) { this.currentFloor++; }
			else { this.currentFloor--; }
		}
	},
	setCurrentFloor: function(floor) {
		if (floor > ElevatorController.getTopFloor()) { this.currentFloor = ElevatorController.getTopFloor(); }
		else if (floor < 1) { this.currentFloor = 1; }
		else { this.currentFloor = floor; }
	},
	internalRequestCarToFloor: function(floor) {
		this.occupied = true;
		this.goToFloor(floor);
	}

};

ElevatorController.init(2,2);





let d = new Date();
document.body.innerHTML = "<h1>Today's date is " + d + "</h1>"

