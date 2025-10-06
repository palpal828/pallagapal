
import TableRow from "./TableRow.jsx";
import TableHeader from "./TableHeader.jsx";
import axios from "axios";
import React, { useState, useEffect } from "react";

function Table(){
    // State declarations
        const [loading, setLoading] = useState(false);
        const [users, setUsers] = useState([]);
        const [error, setError] = useState(null);
        const [editingId, setEditingId] = useState(null);
        const [editedName, setEditedName] = useState('');
        const [editedEmail, setEditedEmail] = useState('');
    
        // Fetch data from the API
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3001/api/users');
                setUsers(response.data);
                setError(null);
            } catch (err) {
                console.error("Hiba az adatok lekérésekor:", err);
                setError("Nem sikerült betölteni az adatokat. Ellenőrizze, hogy a backend szerver fut-e a 3001-es porton.");
            } finally {
                setLoading(false);
            }
        };
    
        // Delete a user
        const handleDelete = async (id) => {
            if (!window.confirm(`Biztosan törölni szeretnéd a(z) ${id} ID-jű felhasználót?`)) {
                return;
            }
            try {
                await axios.delete(`http://localhost:3001/api/users/${id}`);
                fetchData();
            } catch (err) {
                console.error("Hiba a törléskor:", err);
                setError("Nem sikerült törölni a felhasználót.");
            }
        };
    
        // Start editing a user
        const handleEditStart = (user) => {
            setEditingId(user.id);
            setEditedName(user.name);
            setEditedEmail(user.email);
        };
    
        // Submit the updated user data
        const handleUpdate = async (id) => {
            if (!editedName || !editedEmail) {
                alert("A név és az email mező kitöltése kötelező!");
                return;
            }
    
            try {
                await axios.patch(`http://localhost:3001/api/users/${id}`, {
                    name: editedName,
                    email: editedEmail,
                });
                setEditingId(null);
                fetchData();
            } catch (err) {
                console.error("Hiba a módosításkor:", err);
                setError("Nem sikerült módosítani a felhasználót.");
            }
        };
    
        // Cancel editing
        const handleEditCancel = () => {
            setEditingId(null);
        };
    
        // Fetch data on component mount
        useEffect(() => {
            fetchData();
        }, []);
    
        // Conditional rendering for loading and error states
        if (loading) {
            return <div className="App"><p>Adatok betöltése...</p></div>;
        }
        if (error) {
            return <div className="App"><p style={{ color: 'red' }}>{error}</p></div>;
        }
    
    return(<><table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
            <TableHeader tableHeaderStyle={tableHeaderStyle}/>
        </thead>
        <tbody>
            {users.length > 0 ? (
                users.map(user => (
                    <TableRow
                        key={user.id}
                        user={user}
                        editingId={editingId}
                        editedName={editedName}
                        editedEmail={editedEmail}
                        setEditedName={setEditedName}
                        setEditedEmail={setEditedEmail}
                        handleEditStart={handleEditStart}
                        handleUpdate={handleUpdate}
                        handleEditCancel={handleEditCancel}
                        handleDelete={handleDelete}
                        cellStyle={tableCellStyle}
                        saveButtonStyle={saveButtonStyle}
                        cancelButtonStyle={cancelButtonStyle}
                        editButtonStyle={editButtonStyle}
                        deleteButtonStyle={deleteButtonStyle}
                        tableCellStyle={tableCellStyle}
                        
                        
                    />
                ))
            ) : (
                <tr>
                    <td colSpan="5" style={noUsersCellStyle}>Nincsenek felhasználók az adatbázisban.</td>
                </tr>
            )}
        </tbody>
    </table></>)
}
const tableHeaderStyle = { border: '1px solid #ccc', padding: '10px', backgroundColor: '#f0f0f0' };
const tableCellStyle = { border: '1px solid #ccc', padding: '10px', textAlign: 'left' };
const noUsersCellStyle = { border: '1px solid #ccc', padding: '10px', textAlign: 'center' };
const saveButtonStyle = { padding: '5px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', marginRight: '5px' };
const cancelButtonStyle = { padding: '5px', backgroundColor: '#9E9E9E', color: 'white', border: 'none', cursor: 'pointer' };
const editButtonStyle = { padding: '5px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer', marginRight: '5px' };
const deleteButtonStyle = { padding: '5px', backgroundColor: '#F44336', color: 'white', border: 'none', cursor: 'pointer' };


export default Table;
