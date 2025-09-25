import React from "react";
import { useState } from "react";
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

function Regisztracio() {
    const [formData, setFormData] = useState({ nev: '', email: '' });
    const [hibak, setHibak] = useState({});
    const [betolt, setBetolt] = useState(false);
    const [sikeres, setSikeres] = useState(false);
  
    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    };
    
    const validate = () => {
      const ujHibak = {};
      if (!formData.nev) ujHibak.nev = 'A név megadása kötelező.';
      if (!formData.email) {
        ujHibak.email = 'Az email cím megadása kötelező.';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        ujHibak.email = 'Érvénytelen email formátum.';
      }
      return ujHibak;
    };
  
    const kezeles = async (e) => {
      e.preventDefault();
      setSikeres(false);
      const formHibak = validate();
      if (Object.keys(formHibak).length > 0) {
        setHibak(formHibak);
        return;
      }
      
      setHibak({});
      setBetolt(true);
  
      try {
        const response = await fetch("http://localhost:3001/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
    
        if (!response.ok) {
          throw new Error("Szerver hiba");
        }
    
        const data = await response.json();
        console.log("Mentett adatok:", data);
        setSikeres(true);
        setFormData({ nev: "", email: "" });
      } catch (error) {
        console.error("Hiba:", error);
        alert("Nem sikerült a regisztráció.");
      }
    
      setBetolt(false);
    };
    
  
    return (
      <div>
        <h1>Regisztráció</h1>
        {sikeres && <Alert variant="success">Sikeres regisztráció! Köszönjük.</Alert>}
        <Form noValidate onSubmit={kezeles}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nev">Név</Form.Label>
            <Form.Control type="text" id="nev" value={formData.nev} onChange={handleChange} isInvalid={!!hibak.nev} required />
            <Form.Control.Feedback type="invalid">{hibak.nev}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control type="email" id="email" value={formData.email} onChange={handleChange} isInvalid={!!hibak.email} required />
            <Form.Control.Feedback type="invalid">{hibak.email}</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={betolt}>
            {betolt ? (<><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> Betöltés...</>) : ('Regisztrálok')}
          </Button>
        </Form>
      </div>
    );
  }
export default Regisztracio;  