// Scripts
import CollisionHandler from "./utility/CollisionHandler";
import UnitStorage from "./utility/UnitStorage";

// Units
import ArbiterUnit from "./utility/units/derivations/specific/ArbiterUnit";
import Unit from "./utility/units/Unit";

/**Unit storage manager
 *
 * Unit storage manager is in charge of handling collisions, appending units, creating
 * units, removing units, etc.
 */
export default class UnitStorageManager extends UnitStorage {
	/**Comprehensive storage class
	 *
	 * This class is intended to automatically handle data fetching, data updates and
	 * cache.
	 *
	 * @param {string} serverUrl The backend server url for dispatching calls with
	 * 			arbiter units.
	 * @param {object} options Additional options to specify the behaviour of
	 * 		ComprehensiveStorage.
	 * 		@param {boolean} allowCollisions This flag is used to allow collisions or not, a
	 * 				collision is when you try to create a new route/alias on an already existing
	 * 				route/alias, if false, a collision will throw an error.
	 * 		@param {boolean} dontCreateUnitOnCollision This flag is used when adding a Unit or
	 * 				creating one, if enabled overrides the behaviour of 'allowCollisions' and instead
	 * 				of throws an error on collision, it will not do anything on collision.
	 */
	constructor(
		// The server url
		serverUrl,
		options = {
			collisionOptions: {
				allowCollisions: false,
				dontCreateUnitOnCollision: false,
			},
		}
	) {
		super();

		// Set server url
		this.serverUrl = serverUrl;

		// Create a collision handler
		if (options && options.collisionOptions) {
			this.collisionHandler = new CollisionHandler(
				this.units,
				options.collisionOptions
			);
		} else {
			this.collisionHandler = new CollisionHandler(this.units, {
				allowCollisions: false,
				dontCreateUnitOnCollision: false,
			});
		}
	}

	/**Append a given unit to the units object
	 *
	 * It first checks if there are collisions and if collisions are enabled or not.
	 *
	 * @param {string} alias Alias(or route) of the unit.
	 * @param {Unit} unit Unit to be appended.
	 * @returns
	 */
	appendUnit(alias, unit) {
		// Check if the user can create a unit
		// It may throw an error
		const canAppendUnit = this.collisionHandler.canCreateUnitAt(alias);

		// Check if it can append a unit and do it if possible.
		if (canAppendUnit) {
			return this.setUnit(alias, unit);
		} else {
			const message =
				`/lib/data/ComprehensiveStorage/storage/UnitStorageManager.js -> ` +
				`UnitStorageManager::appendUnit(${alias}, unit): ` +
				`The unit can't be can't be created because it collides with another unit.`;
			console.warn(message);
		}

		return this.getUnit(alias);
	}

	/**Create and append unit
	 *
	 * @param {string} alias The alias(or route) of the unit.
	 * @param {any} data The data of the unit.
	 */
	createAndAppendUnit(alias, data) {
		// Create unit
		const unit = new Unit(alias, data);

		// Append unit
		return this.appendUnit(alias, unit);
	}

	/**Check arbiter unit data
	 *
	 * @param {*} arbiterRoute
	 * @param {*} alias
	 */
	checkArbiterUnitData(arbiterRoute, alias = undefined) {
		// Check server url
		if (!this.serverUrl) {
			const message =
				`ComprehensiveStorage/storage/UnitStorageManager.js -> ` +
				`UnitStorageManager::createAndAppendArbiterUnit(): \n` +
				`Server url: ${this.serverUrl}\n` +
				`Server url not given.`;
			throw new Error(message);
		}

		// Check that it's not undefined
		if (typeof this.serverUrl === typeof undefined) {
			const message =
				`ComprehensiveStorage/storage/UnitStorageManager.js -> ` +
				`UnitStorageManager::createAndAppendArbiterUnit(): \n` +
				`Server url: ${this.serverUrl}\n` +
				`Server url is undefined.`;
			throw new Error(message);
		}

		// Check arbiter route
		if (!arbiterRoute) {
			const message =
				`ComprehensiveStorage/storage/UnitStorageManager.js -> ` +
				`UnitStorageManager::createAndAppendArbiterUnit(): \n` +
				`Arbiter route: ${arbiterRoute}\n` +
				`Arbiter route not given.`;
			throw new Error(message);
		}
	}

	/**Create and appends an arbiter unit
	 *
	 * If alias is not given, then the key will be the route, which is the recommended behaviour.
	 *
	 * @param {*} arbiterRoute The arbiter route is the enpoint route where the data will
	 * 		retrieved from.
	 * @param {*} alias The alias(or route) is the key to access the data.
	 */
	createAndAppendArbiterUnit(arbiterRoute, alias = undefined) {
		this.checkArbiterUnitData(arbiterRoute, alias);
		const fullUrl = `${this.serverUrl}${arbiterRoute}`;

		// Get the location of the unit
		// If alias doesn't exist, then the location will be arbiterRoute
		const unitLocation = alias ?? arbiterRoute;
		const canCreateUnit = this.collisionHandler.canCreateUnitAt(unitLocation);

		// If the user can't create the unit, return.
		if (!canCreateUnit) return;

		// Create unit
		const unit = new ArbiterUnit(fullUrl, alias);

		// Append unit
		return this.appendUnit(unitLocation, unit);
	}
}
