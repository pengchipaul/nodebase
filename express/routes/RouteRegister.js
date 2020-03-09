function registerWebRoutes(app) {
	/* Register web routes
	 */
	var indexRouter = require("./web/IndexRoute");
	app.use("/", indexRouter);

	var userRouter = require("./web/UserRoute");
	app.use("/users", userRouter);
}

function registerApiRoutes(app) {
	var userApiRouter = require("./api/UserRoute");
	registerApiRoute(app, "/users", userApiRouter);

	var roleApiRouter = require("./api/RoleRoute");
	registerApiRoute(app, "/roles", roleApiRouter);
}

function registerApiRoute(app, url, router) {
	const ver = "/api_v1.0";
	app.use(ver + url, router);
}

module.exports = {
	registerRoutes: function(app) {
		registerWebRoutes(app);
		registerApiRoutes(app);
	}
};
