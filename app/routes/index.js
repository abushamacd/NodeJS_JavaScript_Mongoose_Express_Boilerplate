const express = require("express");
const router = express.Router();
const userRoute = require("./user.route");
const authRoute = require("./auth.route");

const appRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
];

appRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
