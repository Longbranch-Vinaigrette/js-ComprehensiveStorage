import Find from "./storage/Find";
import UnitStorageManager from "./storage/UnitStorageManager";

/**
 * This is hard to think.
 *
 * This class is my implementation of a simple storage that is also reliant on frequent
 * updates to the backend, it uses the PythonArbitrer to perform requests and get
 * responses.
 *
 * The main point of this storage is as the name says to be Comprehensive and simple
 * to use.
 *
 * This class should be able to contain multiple units, but not contain em' all from
 * the start, it should contain them as long as the user needs them.
 *
 * The Units should be linked to a python script that is send to the backend through
 * the /arbitraryPython/ route, and which is updated whenever needed to do so.
 *
 * The units can be added through the require function, in which you insert the route to
 * the python file.
 *
 * I believe on programming explicitism.
 */
export default class ComprehensiveStorage extends UnitStorageManager {
	constructor(
		arbiter = undefined,
		options = {
			collisionOptions: {
				allowCollisions: false,
				dontCreateUnitOnCollision: false,
			},
		}
	) {
		super(arbiter, options);
		this.find = new Find(this.units, true);
	}
}
