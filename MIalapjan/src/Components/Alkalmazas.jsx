import React from "react";
import { Routes, Route } from 'react-router-dom';
import Menu from "./Menu";
import FoOldal from "./FoOldal";
import Leiras from "./Leiras";
import Regisztracio from "./Regisztacio";
import Tablalap from "./Tablalap";

function Alkalmazas() {
    return (
      <div>
        <Menu />
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<FoOldal />} />
            <Route path="/leiras" element={<Leiras />} />
            <Route path="/regisztracio" element={<Regisztracio />} />
          </Routes>
        </main>
        <Tablalap />
      </div>
    );
  }
export default Alkalmazas;