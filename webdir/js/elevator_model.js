
// Elevator will have a controller that will construct and control the simulation

//import("./owl-deepcopy");

ElevatorController = {
	//Properties
	cars: [],
	floors: 1,
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
	requestCar: function() {

	},



};

Car = {
	currentFloor: 1,
	trips: 0,
	maintenanceMode: false,
	occupied: false,

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
	setCurrentFloor: function(floor) {
		if (floor > ElevatorController.getTopFloor()) { this.currentFloor = ElevatorController.getTopFloor(); }
		if (floor < 1) { this.currentFloor = 1; }
		this.currentFloor = floor;
	},

};

ElevatorController.init(2,2);





let d = new Date();
document.body.innerHTML = "<h1>Today's date is " + d + "</h1>"

