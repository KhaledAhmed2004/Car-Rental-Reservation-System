"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
// Declare a variable to hold the server instance
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Attempt to connect to the MongoDB database using Mongoose
            yield mongoose_1.default.connect(config_1.default.db_uri);
            // Start the Express server and listen on the configured port
            server = app_1.default.listen(config_1.default.port, () => {
                console.log(`Example app listening on port ${config_1.default.port}`);
            });
        }
        catch (error) {
            // Log any errors that occur during the connection or server startup
            console.log(error);
        }
    });
}
// Call the main function to initialize the database connection and start the server
main();
// Handle unhandled promise rejections to ensure graceful shutdown
process.on("unhandledRejection", () => {
    // Log a message indicating that an unhandled promise rejection has been detected
    console.log(`😈 unhandledRejection is detected , shutting down ...`);
    if (server) {
        // If the server is running, close it gracefully and then exit the process with an error code
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        // If the server is not running, exit the process immediately with an error code
        process.exit(1);
    }
});
// Handle uncaught exceptions to ensure graceful shutdown
process.on("uncaughtException", () => {
    console.log(`😈 uncaughtException is detected , shutting down ...`);
    // Exit the process immediately with an error code
    process.exit(1);
});
