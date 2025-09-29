// Tablalap.jsx
import React, { useState, useEffect } from "react"; // 1. imports from React
import { Table } from "react-bootstrap";             // 2. react-bootstrap Table component
import "bootstrap/dist/css/bootstrap.min.css";      // 3. bootstrap styles (usually imported once in index.js)

const Tablalap = ({ adatok }) => {                  // 4. component + prop (adatok) if you want to pass data from parent
  // 5. local state: data (array), loading flag, error message
  const [data, setData] = useState([]);             
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {                                  // 6. run once on mount (because dependency array is empty)
    const controller = new AbortController();       // 7. allow aborting the fetch if component unmounts
    const signal = controller.signal;

    const fetchData = async () => {                 // 8. an async function to fetch and process data
      setLoading(true);
      setError(null);

      try {
        // 9. correct local URL: "localhost" not "locahost", and usually http for dev
        const res = await fetch("http://localhost:3001/api/data", { signal });

        // 10. check HTTP status; if not ok, throw to go to catch()
        if (!res.ok) {
          throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }

        // 11. parse JSON body
        const json = await res.json();
        // console.log(json); // <-- useful for debugging the exact shape

        // 12. normalize whatever the API returned into an array of items
        let items;
        if (Array.isArray(json)) items = json;                 // API returned []
        else if (Array.isArray(json.data)) items = json.data;  // API returned { data: [] }
        else if (json == null) items = [];                     // API returned null/undefined
        else items = [json];                                   // API returned a single object

        // 13. save to state -> triggers re-render
        setData(items);
      } catch (err) {
        // 14. AbortError is expected on unmount, ignore it
        if (err.name === "AbortError") return;
        console.error("Fetch error:", err);
        setError(err.message || "Unknown error");
      } finally {
        // 15. always mark loading as finished
        setLoading(false);
      }
    };

    fetchData();

    // 16. cleanup: abort the fetch if the component unmounts
    return () => controller.abort();
  }, []); // empty dependency array -> runs once when component mounts

  // ---------- UI states: show simpler messages before rendering the table ----------
  if (loading) return <p>Loading…</p>;                   // 17. while waiting for fetch
  if (error) return <p className="text-danger">Error: {error}</p>; // 18. show error if fetch failed
  if (!data.length) return <p>No rows to display</p>;    // 19. handle empty array

  // 20. final render: proper table structure with thead before tbody
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
          // 21. key: prefer a unique stable id from the server (id or _id). index only as fallback.
          <tr key={item.id ?? item._id ?? index}>
            {/* 22. Show UName or fallback to common fields or a placeholder */}
            <td>{item.UName ?? item.username ?? "—"}</td>
            <td>{item.Email ?? item.email ?? "—"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Tablalap;
