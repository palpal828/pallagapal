// Tablalap.jsx
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // ensure bootstrap styles are loaded

const Tablalap = ({ adatok }) => {
  const [data, setData] = useState([]);       // expect an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // NOTE: fixed hostname typo and used http for local dev
        const res = await fetch("http://localhost:3001/api/data", { signal });

        if (!res.ok) {
          throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }

        const json = await res.json();

        // Normalize response:
        // - If API returns an array → use it
        // - If API returns { data: [...] } → use json.data
        // - If API returns a single object → wrap it in an array
        let items;
        if (Array.isArray(json)) items = json;
        else if (Array.isArray(json.data)) items = json.data;
        else if (json === null || json === undefined) items = [];
        else items = [json];

        setData(items);
      } catch (err) {
        if (err.name === "AbortError") {
          // fetch was aborted — do nothing
          return;
        }
        console.error("Fetch error:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort(); // cancel fetch on unmount
  }, []); // runs once on mount

  // simple UI states
  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!data.length) return <p>No rows to display</p>;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id ?? item._id ?? index}>
            <td>{item.UName ?? item.username ?? "—"}</td>
            <td>{item.Email ?? item.email ?? "—"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Tablalap;