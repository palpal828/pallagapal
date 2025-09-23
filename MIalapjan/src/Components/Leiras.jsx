import React from "react";

function Leiras() {
  return (
    <div>
      <h1>Az Alkalmazás Felépítése</h1>
      <p>Ez az alkalmazás bemutatja a React alapjait:</p>
      <ul>
        <li><b>Komponens-alapú felépítés:</b> Az egész UI kis, újrafelhasználható darabokból, komponensekből áll.</li>
        <li><b>Routing:</b> A <code>react-router-dom</code> segítségével valósítjuk meg az egyoldalas alkalmazás (SPA) navigációját.</li>
        <li><b>Bootstrap integráció:</b> A <code>react-bootstrap</code> komponensekkel gyorsan és egyszerűen hozhatunk létre reszponzív felületeket.</li>
        <li><b>Állapotkezelés:</b> A Regisztráció oldalon a <code>useState</code> hook segítségével kezeljük az űrlap adatait és a felhasználói visszajelzéseket.</li>
      </ul>
    </div>
  );
}
export default Leiras;