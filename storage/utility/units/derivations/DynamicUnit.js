import Unit from "../Unit";

/**Dynamic unit
 */
export default class DynamicUnit extends Unit {
	constructor(alias, data = undefined) {
		super(alias, data);
		
		this.alias = alias;
		this.data = data;
	}
}
