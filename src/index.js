import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";

import routes from "./routes.js";

const app = express();

// setup db
const url = "mongodb://localhost:27017";
try {
  await mongoose.connect(url, {
    dbName: "movie-magic-sept2025",
  });
  console.log("Successfully connected to DB!");
} catch (err) {
  console.error("cannot connect to db, ", err.message);
}

// Setup handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    runtimeOptions: {
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "src/views");

// Setup middlewares
app.use(express.static("src/public"));
app.use(express.urlencoded());

// Routes
app.use(routes);

// Start Server
app.listen(4200, () =>
  console.log(`Server is listening on http://localhost:4200...`)
);
