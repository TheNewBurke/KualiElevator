
// Elevator will have a controller that will construct and control the simulation


ElevatorController = {
	//Properties
	cars: [],


	//Methods
	init: function(numberOfCars, numberOfFloors) {
		console.log("params are ", numberOfCars, " and ", numberOfFloors);
		this.cars = [];
		for (var i=0; i<numberOfCars; i++)  {
			this.cars.push(this.createCar());
		}
	},
	createCar: function() {
		return Car.init();
	},
};

Car = {
	init: function() {

		//return a car object
	},
};

ElevatorController.init(2,2);

let d = new Date();
document.body.innerHTML = "<h1>Today's date is " + d + "</h1>"

