function createRoute(app) {
    app.use("/api/v1/auth", require("../auth/auth.route"));
}

module.exports = createRoute;
