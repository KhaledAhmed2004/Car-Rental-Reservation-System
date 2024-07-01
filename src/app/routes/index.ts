import { Router } from "express";
import { AuthRoutes } from "../modules/user/user.routes";
import { CarRouter } from "../modules/car/car.routes";
import { BookingRouter } from "../modules/booking/booking.routes";

const router = Router();

// Define the module routes
const moduleRoutes = [
  { path: "/auth", route: AuthRoutes },
  { path: "/cars", route: CarRouter },
  { path: "/bookings", route: BookingRouter },
];

// Use the routes in the router
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
