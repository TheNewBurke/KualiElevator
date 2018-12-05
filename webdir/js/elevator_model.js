
// Elevator will have a controller that will construct and control the simulation

//import("./owl-deepcopy");

ElevatorController = {
	//Properties
	cars: [],
	floors: 1,
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
	externalRequestCarToFloor: function(floor) {
		//this function will request a car from the list of cars that is closest to floor, with other considerations
		//do calc on which car, then have that car move
		closestCarIndex = 0;
		for (var i=0; i<this.cars.length; i++)  {
			this.cars[i];
		}


	},


};

Car = {
	currentFloor: 1,
	trips: 0,
	maintenanceMode: false,
	occupied: false,
	requestedFloor: null,
	init: function() {
		return this;
		//return a car object
		//NOTE: if this singleton issue is present owl.deepCopy addresses it
	},
	reportFloor: function() {

	},
	reportOpening: function() {

	},
	reportClosing: function() {

	},
	goToFloor: function(floor) {
		if (floor > ElevatorController.getTopFloor()) { this.requestedFloor = ElevatorController.getTopFloor(); }
		else if (floor < 1) { this.requestedFloor = 1; }
		else { this.requestedFloor = floor; }
		while (this.requestedFloor != this.currentFloor) {
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

