"use strict";

//
//  Backend Node.js app for musicoolio website.
//  Talks to azure database, and does cool stuff!
//

// Import Express, FS and CORS.
import express from "express";
import cors from "cors";
import connection from "./database.js";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT);

console.log("Hej! Det kører");

app.get("/", (req, res) => res.json({ message: "Connection made!" }));

// Default function for printing error or returning results.
function errorResult(err, result, response) {
  if (err) {
    console.log(err);
  } else {
    response.json(result);
  }
}

/* ------------ Sponsors ------------ */
app.get("/sponsors", async (req, res) => {
  connection.query(
    "SELECT * FROM sponsors ORDER BY sponsorName;",
    (err, result) => {
      // print error or respond with result.
      errorResult(err, result, res);
    }
  );
});
