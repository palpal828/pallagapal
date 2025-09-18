const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require('body-parser');
require('dotenv').config();
const {db} = require("./db");
app.use(bodyParser.json());
app.use(cors());
 
// Adatbázis kapcsolat létrehozása

 
// Gyökér útvonal, tesztelésre
app.get("/", (req, res) => {
 res.send("Fut a backend!");
})
 
// Régiók listázása
app.get("/regiok", (req, res) => {
 const sql = "SELECT * FROM `regiok`";
 db.query(sql, (err, result) => {
 if (err) return res.json(err);
 return res.json(result)
 })
})

app.get("/hosszut", (req, res) => {
    const sql = "SELECT * FROM kozutak.kozutak_hossza where hossz >= 1500;";
    db.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result)
  })
})
app.get("/megyenev", (req, res) => {
    const sql = "SELECT * FROM kozutak.megyek where megyenev like 'b%';";
    db.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result)
  })
})

// Régió törlése ID alapján
app.delete("/torles/:id", (req, res) => {
    const sql = "DELETE FROM `regiok` WHERE Rid = ?";
    db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.json(err);
    return res.json(result)
    })
   })
    
   // Egyszerre több régió törlése
   app.delete("/torles/", (req, res) => {
    // Példa: A kérésben kapott rekordok azonosítói (Rid) egy tömbben
    const idsToDelete = req.body.ids; // Például: [1, 2, 3]
    // Ellenőrzés, hogy van-e legalább egy azonosító
    if (!Array.isArray(idsToDelete) || idsToDelete.length === 0) {
    return res.status(400).json({ error: "Nem adtál meg törlendőazonosítókat." });
    }
    
    // SQL lekérdezés az `IN` kulcsszóval
    const sql = "DELETE FROM `regiok` WHERE `Rid` IN (?)";
    // SQL végrehajtása
    db.query(sql, [idsToDelete], (err, result) => {
    if (err) {
    console.error("Hiba történt:", err);
    return res.status(500).json({ error: "Adatbázis hibatörtént." });
    }
    return res.status(200).json({
    message: "A rekord(ok) törlése sikeres volt.",
    affectedRows: result.affectedRows
    });
    });
   });
    
 
// Szerver indítása a 3001-es porton
app.listen(3001, () => {
 console.log("Server is running on port 3001");
});