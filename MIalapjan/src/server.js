import express from "express";
import cors from "cors";
import mysql from "mysql2";
const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "trytemp",
    port: 3307
  });
  app.post("/api/register", (req, res) => {
    const { nev, email } = req.body;
  
    if (!nev || !email) {
      return res.status(400).json({ error: "Név és email kötelező" });
    }
  
    const sql = "INSERT INTO user (UName, Email) VALUES (?, ?)";
    db.query(sql, [nev, email], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Hiba történt az adatbázis mentésnél" });
      }
      res.json({
        success: true,
        idUser: result.insertId,
        UName: nev,
        Email: email,
      });
    });
  });
  app.get("/api/data", (req, res) => {
    const sql = "SELECT UName, Email FROM user";
    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Hiba történt az adatbázis lekérdezésnél" });
      }
      res.json(results);
    });
  });
  app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});