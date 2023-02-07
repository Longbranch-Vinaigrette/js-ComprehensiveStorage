import DynamicUnit from "../DynamicUnit";

/**Send post request
 *
 * @param {*} route
 * @param {*} data
 * @returns
 */
const sendPostRequest = async (route, data) => {
	return await fetch(route, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: new Blob([JSON.stringify(data)], {
			type: "application/json",
		}),
	})
		.then((res) => {
			return res.json();
		})
		.catch((err) => {
			console.log(
				`ComprehensiveStorage/storage/utility/units/derivations/specific/` +
					`ArbiterUnit.js -> sendPostRequest(): ` +
					`Error: `,
				err
			);
			return undefined;
		});
};

/**Send get request
 *
 * @param {*} route
 * @returns
 */
const sendGetRequest = async (route) => {
	return await fetch(this.route, {
		method: "GET",
		headers: {
			Accept: "application/json",
		},
	})
		.then((res) => {
			return res.json();
		})
		.catch((err) => {
			console.log(
				`ComprehensiveStorage/storage/utility/units/derivations/specific/` +
					`ArbiterUnit.js -> sendGetRequest(): ` +
					`Error: `,
				err
			);
			return undefined;
		});
};

/**Dynamic unit
 */
export default class ArbiterUnit extends DynamicUnit {
	constructor(fullUrl, alias = undefined) {
		if (!fullUrl) {
			const msg =
				`/lib/data/ComprehensiveStorage/storage/utility/units/derivations/specific` +
				`/ArbitrerUnit.js -> ` +
				`ArbiterUnit::constructor(): ` +
				`No url given.`;
			throw new Error(msg);
		}
		// Get alias or route if it doesn't exist
		const actualAlias = alias ?? fullUrl;

		// Initialize DynamicUnit
		super(actualAlias);
		this.fullUrl = fullUrl;
	}

	/**Send request and update Unit data
	 *
	 * Sends a request to the given route and updates this unit data.
	 *
	 * Determines whether it's a get request or not by the data given.
	 * If it's undefined it will send a GET request.
	 *
	 * @param {Object} data If given it will send that data through a POST request.
	 * @returns {Object} The result of the query.
	 */
	async dispatch(data = undefined) {
		// Determine whether it's a get request or not by the data given.
		if (data) {
			this.data = await sendPostRequest(this.fullUrl, data);
		} else {
			this.data = await sendGetRequest(this.fullUrl);
		}
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
