import Unit from "../Unit";

/**Static unit
 */
export default class StaticUnit extends Unit {
	constructor(alias, data = undefined) {
		super(alias, data);
		
		this.alias = alias;
		this.data = data;
	}

	/**
	 * @param {any} data
	 */
	set data(data) {
		const message =
			`/lib/data/ComprehensiveStorage/storage/utility/units/derivations/StaticUnit.js ` +
			`-> StaticUnit::constructor(): ` +
			`The unit is a static unit, it cannot change.`;
		throw new Error(message);
	}
}
