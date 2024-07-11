"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const car_routes_1 = require("../modules/car/car.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const router = (0, express_1.Router)();
// Define the module routes
const moduleRoutes = [
    { path: "/auth", route: user_routes_1.AuthRoutes },
    { path: "/cars", route: car_routes_1.CarRouter },
    { path: "/bookings", route: booking_routes_1.BookingRouter },
];
// Use the routes in the router
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
