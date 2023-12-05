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
app.post("/sponsors", async (req, res) => {
  const reqBody = req.body;

  try {
    const selectResult = await new Promise((resolve, reject) => {
      connection.query("SELECT sponsorId FROM sponsors", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    let randomId = 0;
    const sponsorIds = new Set(
      selectResult.map((id) => {
        return id.sponsorId;
      })
    );

    for (let i = 0; i < 200; i++) {
      randomId = "K" + (Math.floor(Math.random() * 9000) + 1000);
      if (!sponsorIds.has(randomId)) {
        const insertResult = await new Promise((resolve, reject) => {
          connection.query(
            "INSERT INTO sponsors (sponsorId, sponsorName, sponsorEmail, privatErhverv, cprCvr, sponsorPhone, notes, reepayHandlePeriamma, foreningLetId, reepayHandleDonations, paymentPlatform, aktive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
              randomId,
              reqBody.sponsorName,
              reqBody.sponsorEmail,
              reqBody.privatErhverv,
              reqBody.cprCvr,
              reqBody.sponsorPhone,
              reqBody.notes,
              reqBody.reepayHandlePeriamma,
              reqBody.foreningLetId,
              reqBody.reepayHandleDonations,
              reqBody.paymentPlatform,
              reqBody.aktive,
            ],
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
        });
        if (insertResult) {
          console.log("Sponsor added!");
          res.status(200).json({ message: "Sponsor added!" });
          break;
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
});

/* ------------ Children ------------ */
app.get("/children", async (req, res) => {
  connection.query(
    "SELECT * FROM children ORDER BY fullname;",
    (err, result) => {
      // print error or respond with result.
      errorResult(err, result, res);
    }
  );
});

app.post("/children", async (req, res) => {
  const reqBody = req.body;
  connection.query(
    "INSERT INTO children (fullname, gender, birthdate, school, schoolStart, class) VALUES (?, ?, ?, ?, ?, ?)",
    [
      reqBody.fullname,
      reqBody.gender,
      reqBody.birthdate,
      reqBody.school,
      reqBody.schoolStart,
      reqBody.class,
    ],
    (err, result) => {
      errorResult(err, result, res);
    }
  );
});

/* ------------ Payments ------------ */
app.get("/payments", async (req, res) => {
  connection.query(
    "SELECT * FROM payments ORDER BY invoiceCreated;",
    (err, result) => {
      // print error or respond with result.
      errorResult(err, result, res);
    }
  );
});

app.post("/payments", async (req, res) => {
  const reqBody = req.body;
  connection.query(
    "INSERT INTO payments (invoiceAmount, invoiceCreated, invoiceCurrency, invoiceHandle, customerHandle, subscriptionHandle) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      reqBody.invoiceAmount,
      reqBody.invoiceCreated,
      reqBody.invoiceCurrency,
      reqBody.invoiceHandle,
      reqBody.customerHandle,
      reqBody.subscriptionHandle,
    ],
    (err, result) => {
      errorResult(err, result, res);
    }
  );
});
