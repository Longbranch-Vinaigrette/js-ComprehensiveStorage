import {
	sendGetRequest,
	sendPostRequest,
} from "../storage/utility/units/derivations/specific/ArbiterUnit";

/**Send request
 * 
 * Sends a get or post request depending on whether the field data was given or
 * not
 * 
 * @param {string} url The server url
 * @param {object} data A json serializable object
 * @returns 
 */
export const sendRequest = async (url, data = undefined) => {
	if (data) {
		return await sendPostRequest(url, data);
	} else {
		return await sendGetRequest(url);
	}
};
