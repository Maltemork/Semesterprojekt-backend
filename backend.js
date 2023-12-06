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
app.post("/sponsors/add", async (req, res) => {
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

    const sponsorIds = new Set(
      selectResult.map((id) => {
        return id.sponsorId;
      })
    );

    let randomId = 0;
    for (let i = 0; i < 200; i++) {
      randomId = "K" + (Math.floor(Math.random() * 9000) + 1000);
      if (!sponsorIds.has(randomId)) {
        const insertResult = await new Promise((resolve, reject) => {
          connection.query(
            "INSERT INTO sponsors (sponsorId, sponsorName, sponsorEmail, privatErhverv, cprCvr, sponsorPhone, notes, reepayHandlePeriamma, foreningLetId, reepayHandleDonations, paymentPlatform, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
              reqBody.active,
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
          return res.status(200).json({ message: "Sponsor added!" });
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

app.post("/children/add", async (req, res) => {
  const reqBody = req.body;

  try {
    const selectResult = await new Promise((resolve, reject) => {
      connection.query("SELECT childNo FROM children", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    const childNos = new Set(
      selectResult.map((id) => {
        return id.childNo;
      })
    );

    let randomId = 0;
    for (let i = 0; i < 200; i++) {
      randomId = "04." + (Math.floor(Math.random() * 90000) + 10000);
      if (!childNos.has(randomId)) {
        const insertResult = await new Promise((resolve, reject) => {
          connection.query(
            "INSERT INTO children (childNo, fullname, gender, birthdate, school, schoolStart, class) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
              randomId,
              reqBody.fullname,
              reqBody.gender,
              reqBody.birthdate,
              reqBody.school,
              reqBody.schoolStart,
              reqBody.class,
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
          console.log("Child added!");
          return res.status(200).json({ message: "Child added!" });
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
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

app.post("/payments/add", async (req, res) => {
  const reqBody = req.body;

  try {
    const selectResult = await new Promise((resolve, reject) => {
      connection.query("SELECT invoiceHandle FROM payments", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    const invoiceHandles = new Set(
      selectResult.map((id) => {
        return id.invoiceHandle;
      })
    );

    let randomId = 0;
    for (let i = 0; i < 200; i++) {
      randomId = "inv-" + (Math.floor(Math.random() * 9000) + 1000);
      if (!invoiceHandles.has(randomId)) {
        const insertResult = await new Promise((resolve, reject) => {
          connection.query(
            "INSERT INTO payments (invoiceHandle, invoiceAmount, invoiceCreated, invoiceCurrency, invoiceHandle, customerHandle, subscriptionHandle) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
              randomId,
              reqBody.invoiceAmount,
              reqBody.invoiceCreated,
              reqBody.invoiceCurrency,
              reqBody.invoiceHandle,
              reqBody.customerHandle,
              reqBody.subscriptionHandle,
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
          console.log("Payment added!");
          return res.status(200).json({ message: "Payment added!" });
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
});
