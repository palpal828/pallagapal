import React from "react";
function TableRow({ user, isEditing, editedName, editedEmail, onEditStart, onDelete, onNameChange, onEmailChange, onUpdate, onCancel, tableCellStyle, editingId, editButtonStyle, deleteButtonStyle}) {
    return(<>
        <tr key={user.id}>
            <td style={tableCellStyle}>{user.id}</td>

                {/* Editing mode */}
                {editingId === user.id ? (
                    <>
                        <td style={tableCellStyle}>
                            <input
                                type="text"
                                value={editedName}
                                onChange={e => setEditedName(e.target.value)}
                            />
                        </td>
                        <td style={tableCellStyle}>
                            <input
                                type="email"
                                value={editedEmail}
                                onChange={e => setEditedEmail(e.target.value)}
                            />
                        </td>
                    </>
                ) : (
                    // Normal mode
                    <>
                        <td style={tableCellStyle}>{user.name}</td>
                        <td style={tableCellStyle}>{user.email}</td>
                    </>
                )}

                <td style={tableCellStyle}>{new Date(user.created_at).toLocaleDateString()}</td>

                {/* Action buttons */}
                <td style={tableCellStyle}>
                    {editingId === user.id ? (
                        // Buttons for editing mode
                        <>
                            <button onClick={() => handleUpdate(user.id)} style={saveButtonStyle}>Mentés</button>
                            <button onClick={handleEditCancel} style={cancelButtonStyle}>Mégse</button>
                        </>
                    ) : (
                        
                        <>
                            <button onClick={() => handleEditStart(user)} style={editButtonStyle}>Szerkesztés</button>
                            <button onClick={() => handleDelete(user.id)} style={deleteButtonStyle}>Törlés</button>
                        </>
                    )}
                </td>
            </tr>
    </>)
}
export default TableRow;