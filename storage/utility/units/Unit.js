/**Unit class for storing a unit of data
 *
 * This unit is intended to be used internally by ComprehensiveStorage.
 *
 * Name thunk process:
 * Cool names for this subclass that stores items:
 * Container, Unit, Entity, Fragment, Flake(I still haven't decided).
 * I think Unit is the more appropriate name.
 */
export default class Unit {
	constructor(alias, data = undefined) {
		this.data = data;

		// Set alias
		if (alias !== undefined) {
			this.alias = alias;
		} else {
			throw new Error(
				`/lib/data/ComprehensiveStorage/storage/utility/units/Unit.js ` +
					`-> Unit::constructor(): ` +
					`No alias given.`
			);
		}
	}

	/**
	 * Set a thunk for getData function
	 *
	 * A getThunk is ran before the data is retrieved.
	 * @param {() => void} getThunk
	 */
	setThunk(getThunk) {
		this.getThunk = getThunk;
	}

	/**Set data
	 *
	 * @param {any} data
	 */
	setData(data) {
		this.data = data;
	}

	/**Retrieve data
	 *
	 * If there's a getThunk it will be ran before retrieving data.
	 */
	getData() {
		if (this.getThunk) {
			this.getThunk();
		}
		return this.data;
	}
}
