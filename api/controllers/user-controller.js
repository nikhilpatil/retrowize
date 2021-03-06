'use strict';
class UserController {

	* getUser(next) {
		var user = this.passport.user;
		this.body = {
			email: user.email,
			name: user.name,
			picture: user.picture
		};
		yield next;
	}
}

module.exports = new UserController();
