import React from "react";
function TableHeader(tableHeaderStyle) {
    return(<>
        <tr>
            <th style={tableHeaderStyle}>#ID</th>
            <th style={tableHeaderStyle}>Név</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Regisztráció</th>
            <th style={tableHeaderStyle}>Műveletek</th>
        </tr>
    </>)
}
export default TableHeader;