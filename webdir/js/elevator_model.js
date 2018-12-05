
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
		if (numberOfFloors == null || < 1) { this.topFloor = 1; }
		else { this.topFloor = numberOfFloors; }
		for (var i=0; i<this.topFloor; i++)  {
			this.floors.push(this.addFloor());
		}

		for (var i=0; i<numberOfCars; i++)  {
			this.cars.push(this.addCar());
		}
	},
	addFloor: function() {
		return Floor.init();
		//return deepCopy(Floor);
	},
	addCar: function() {
		return Car.init();
		//return deepCopy(Car);
	},
	getTopFloor: function() {
		return this.floors;
	},
	//Car calling methods
	pushUpButton: function(floor) {
		this.activateDirectionLight(floor, 1);
		this.externalRequestCarToFloor(floor, 1);
	},
	pushDownButton: function(floor) {
		this.activateDirectionLight(floor, -1);
		this.externalRequestCarToFloor(floor, -1);
	},
	//when a button from outside the car is called
	externalRequestCarToFloor: function(floor, direction) {
		closestCarIndex = 0;
		closetCar = this.cars[closestCarIndex];
		for (var i=0; i<this.cars.length; i++)  {
			if (this.cars[i].maintenanceMode == false) {
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
		}
		closetCar.goToFloor(floor, direction);
	},
	ding: function(floor) {
		//this.ding = new Audio('./audio/ding.mp3');
	},
	cancelDirectionLight: function(floor) {

	},
	requestMaintenance: function(car) {
		//after a timer... via SetInterval  ///setInterval(this.doThing.bind(this), 2000);
	}

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
	requestedFloors: [],
	directionMoving: null, // 1 = up, -1 = down

	init: function() {
		return this;
		//return a car object
		//NOTE: if this singleton issue is present owl.deepCopy addresses it
	},
	reportAtFloor: function() {
		this.reportOpening();
		floorsLeftToVisit = [];
		ElevatorController.cancelDirectionLight(this.directionMoving);
		for (var i=0; i<this.requestedFloors.length; i++)  {
			if (this.requestedFloors[i] != this.currentFloor) { floorsLeftToVisit.push(this.requestedFloors[i]); }
		}
		if (this.requestedFloors.length == 0) { this.occupied = false; }
		this.reportClosing();
		this.trips++;
		if (this.trips == 100) {
			this.maintenanceMode = true;
			ElevatorController.requestMaintenance(this);
		}
		//reset direction for next floor in queue as needed
	},
	reportOpening: function() {
		ElevatorController.ding(this.currentFloor);
	},
	reportClosing: function() {

	},
	goToFloor: function(floor, direction) {
		this.directionMoving = direction;
		if (floor > ElevatorController.getTopFloor()) { this.requestedFloor = ElevatorController.getTopFloor(); }
		else if (floor < 1) { this.requestedFloor = 1; }
		else { this.requestedFloors.push(floor); }
		while (this.requestedFloor != this.currentFloor) {
			// implement a timer to make this change not all at once
			if (this.requestedFloor > this.currentFloor) { this.currentFloor++; }
			else { this.currentFloor--; }
		}
		if (this.requestedFloor == this.currentFloor) {
			this.reportAtFloor();
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

