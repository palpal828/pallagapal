import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
    // --- STATE VÁLTOZÓK ---

    // READ ÉS HIBAKEZELÉS
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // CREATE (HOZZÁADÁS)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // UPDATE (SZERKESZTÉS)
    const [editingId, setEditingId] = useState(null); 
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');

    // --- FUNKCIÓK ---

    // Adatok lekérdezésének funkciója
    

    // CREATE: Új felhasználó hozzáadása
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !email) {
            alert("A név és az email megadása kötelező!");
            return;
        }
        try {
            await axios.post('http://localhost:3001/api/users', { name, email });
            fetchData(); // Frissítés
            setName('');
            setEmail('');
        } catch (err) {
            console.error('Hiba az adatok küldésekor:', err);
            setError("Hiba történt a felhasználó hozzáadása közben.");
        }
    };

    // DELETE: Felhasználó törlése
    
    // JSX Visszatérés
    return (
        <div className="App">
            <h1>Felhasználókezelő (Full-Stack CRUD)</h1>
            
            {/* Új felhasználó hozzáadása űrlap */}
            <form onSubmit={handleSubmit} style={{marginBottom: '30px', border: '1px solid #ccc', padding: '15px'}}>
                <h2>Új felhasználó hozzáadása</h2>
                <input
                    type="text"
                    placeholder="Név"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{marginRight: '10px', padding: '5px'}}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{marginRight: '10px', padding: '5px'}}
                />
                <button type="submit" style={{padding: '5px 10px'}}>Hozzádás</button>
            </form>
            
            <hr />
            
            
            
        </div>
    );
} 

// Stílusdefiníciók


export default App;
