/**Find class
 *
 * The purpose of this class is to find nested objects like so:
 * units.MyObject.user.dateInfo.creationDate
 *
 * Another point of this class is to be explicit.
 *
 * My main use for this class is to find an item and if not found return undefined instead
 * of throwing an error.
 */
export default class Find {
	/**Constructor for the find class
	 *
	 * @param {object} unitsRef A reference to the units object.
	 */
	constructor(unitsRef, loggerEnabled = True) {
		this.units = unitsRef;
		this.loggerEnabled = loggerEnabled;
	}

	/**Recursively travel through the data and get the last element
	 *
	 * @param {*} data The first data object.
	 * @param {*} nestedIn An array of strings which have every key to access the data.
	 * @returns The lowermost item on the nested array.
	 */
	#getNestedData(data, nestedIn = []) {
		// We are at the end of the nested items
		if (nestedIn.length <= 0) {
			return data;
		}

		// Get the first element
		const firstElement = nestedIn.shift();
		return this.#getNestedData(data[firstElement], nestedIn.slice(1));
	}

	/**Find a nested variable on a Unit, if not found returns undefined.
	 *
	 * @param {string} alias Alias(or route) where the unit is located.
	 * @param {Array} nestedIn The nesting level of the item.
	 */
	unit(alias, nestedIn = []) {
		// Clone the array
		const originalArray = [...nestedIn];

		try {
			// Retrieve the data
			return this.#getNestedData(this.units[alias].getData(), nestedIn);
		} catch (err) {
			console.log(`Error: `, err);

			// Data not found.
			if (this.loggerEnabled) {
				const message =
					`/lib/data/ComprehensiveStorage/storage/Find.js -> ` +
					`Find::unit(): ` +
					`Couldn't find element on unit ${alias} at depth: [${originalArray.join(
						", "
					)}]`;
				console.warn(message);
			}
			return undefined;
		}
	}
}
