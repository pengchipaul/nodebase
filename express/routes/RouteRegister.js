/* Register web routes */
function registerWebRoutes(app) {
	var indexRouter = require("./web/IndexRoute");
	app.use("/", indexRouter);

	var authRouter = require("./web/AuthRoute");
	app.use("/auth", authRouter);

	var userRouter = require("./web/UserRoute");
	app.use("/users", userRouter);

	var adminRouter = require("./web/AdminRoute");
	app.use("/admin", adminRouter);
}

/* Register api routes */
function registerApiRoutes(app) {
	var userApiRouter = require("./api/UserRoute");
	registerApiRoute(app, "/users", userApiRouter);

	var roleApiRouter = require("./api/RoleRoute");
	registerApiRoute(app, "/roles", roleApiRouter);
}

function registerApiRoute(app, url, router) {
	const ver = "/" + process.env.API_VER;
	app.use(ver + url, router);
}

module.exports = {
	registerRoutes: function(app) {
		registerWebRoutes(app);
		registerApiRoutes(app);
	}
};
