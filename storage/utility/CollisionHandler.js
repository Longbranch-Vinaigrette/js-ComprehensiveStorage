/**Collision handler
 *
 * This route will verify that no collision happen.
 */
export default class CollisionHandler {
	/**Collision handler
	 *
	 * This class is intended to handle collision checking.
	 *
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
		hookUnits,
		options = {
			allowCollisions: false,
			dontCreateUnitOnCollision: false,
		}
	) {
		this.units = hookUnits;
		// Check if a reference to units has been given.
		if (!this.units) {
			const message =
				`/lib/data/ComprehensiveStorage/storage/utility/CollisionHandler.js -> ` +
				`CollisionHandler::constructor(): ` +
				`No hook(reference) for the units object has been given.`;
			throw new Error(message);
		}

		if (options) {
			// Allow colllisions or not
			this.allowCollisions = options.allowCollisions;
			// Don't do anything on collision
			this.dontCreateUnitOnCollision = options.dontCreateUnitOnCollision;
		}
	}

	/**Check if a route collides or not
	 *
	 * Returns true if it collides
	 */
	doesCollide(route) {
		if (this.units[route]) {
			return true;
		}
		return false;
	}

	/**Check collisions
	 *
	 * Checks collisions, throws an error if there's a collision and
	 * 'allowCollisions' is set to false.
	 *
	 * This function first checks if collisions are allowed or not.
	 *
	 * @param {string} route The route or alias of the Unit.
	 * @returns
	 */
	checkCollisions(route) {
		// Check if collisions are allowed or not
		if (!this.allowCollisions) {
			// Check if it collides
			const doesCollide = this.doesCollide(route);
			if (doesCollide) {
				const message =
					`/lib/data/ComprehensiveStorage/storage/utility/CollisionHandler.js -> ` +
					`CollisionHandler::checkCollisions(): ` +
					`The route ${route} collides with a unit that already exists(the unit also ` +
					`uses the same route).`;
				throw new Error(message);
			}
		}
	}

	/**Able to create Unit at [Given alias]
	 *
	 * Check if the user is able to create a Unit at the given alias(or route) or not.
	 * If dontCreateUnitOnCollision is false, allowCollisions is false and there's a
	 * collision, it will throw an error.
	 *
	 * @param {string} alias The alias(or route) where the object would be stationed.
	 */
	canCreateUnitAt(alias) {
		// Check dont create unit on collision.
		if (this.dontCreateUnitOnCollision) {
			// Then return the opposite of does collide, because we can't create Units when
			// it collides.
			const result = !this.doesCollide(alias);
			return result;
		} else {
			// Check collisions then.
			this.checkCollisions(alias);

			// If there was no error before, return true.
			return true;
		}
	}
}
