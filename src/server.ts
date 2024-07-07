import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server } from "http";

// Declare a variable to hold the server instance
let server: Server;

async function main() {
  try {
    // Attempt to connect to the MongoDB database using Mongoose
    await mongoose.connect(config.db_uri as string);

    // Start the Express server and listen on the configured port
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    // Log any errors that occur during the connection or server startup
    console.log(error);
  }
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
  } else {
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
