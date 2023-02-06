import DynamicUnit from "../DynamicUnit";

/**Dynamic unit
 */
export default class ArbiterUnit extends DynamicUnit {
	constructor(arbiterRoute, arbiter, alias = undefined) {
		// Make some checks before anything
		if (!arbiter) {
			const msg =
				`/lib/data/ComprehensiveStorage/storage/utility/units/derivations/specific` +
				`/ArbitrerUnit.js -> ` +
				`ArbiterUnit::constructor(): ` +
				`No arbiter given.`;
			throw new Error(msg);
		}
		if (!arbiterRoute) {
			const msg =
				`/lib/data/ComprehensiveStorage/storage/utility/units/derivations/specific` +
				`/ArbitrerUnit.js -> ` +
				`ArbiterUnit::constructor(): ` +
				`No arbiter route given.`;
			throw new Error(msg);
		}
		// The route will be alias, if no alias is given, the route will be arbiterRoute
		// which is recommended.
		const actualRoute = alias ?? arbiterRoute;

		// Initialize DynamicUnit
		super(actualRoute);

		// After DynamicUnit is initialized we are able to use this.
		// Set arbiter
		this.arbiter = arbiter;
		// Set arbiter route
		this.arbiterRoute = arbiterRoute;
	}

	/**Update route data
	 *
	 * @param {Array} dataDependencies The data dependencies, will replace its respective fields
	 * 			on the script.
	 * @returns {Object} The result of the query.
	 */
	async updateData(dataDependencies = [], debug = false) {
		this.data = await this.arbiter.dispatch(
			this.arbiterRoute,
			dataDependencies,
			debug
		);
		return this.data;
	}

	/**Get alias.
	 *
	 * @returns
	 */
	getAlias() {
		return this.alias;
	}
}
