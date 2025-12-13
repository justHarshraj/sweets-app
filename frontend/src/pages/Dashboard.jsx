import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import AuthContext from "../context/AuthContext";

function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  const fetchSweets = async () => {
    try {
      const res = await api.get("/sweets");
      setSweets(res.data);
    } catch (err) {
      setError("Failed to load sweets");
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handlePurchase = async (id) => {
    try {
      await api.post(`/sweets/${id}/purchase`);
      fetchSweets();
    } catch (err) {
      alert(err.response?.data?.message || "Purchase failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sweet?")) return;

    try {
      await api.delete(`/sweets/${id}`);
      fetchSweets();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleRestock = async (id) => {
    const amount = prompt("Enter restock amount:");
    if (!amount) return;

    try {
      await api.post(`/sweets/${id}/restock`, {
        amount: Number(amount),
      });
      fetchSweets();
    } catch (err) {
      alert("Restock failed");
    }
  };

  return (
    <div>
      <h2>Available Sweets</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {sweets.length === 0 && <p>No sweets available</p>}

      <ul>
        {sweets.map((sweet) => (
          <li key={sweet._id}>
            <strong>{sweet.name}</strong> | {sweet.category} | ₹{sweet.price} |
            Stock: {sweet.quantity}{" "}
            <button
              onClick={() => handlePurchase(sweet._id)}
              disabled={sweet.quantity === 0}
            >
              Purchase
            </button>
            {user?.role === "admin" && (
              <>
                {" "}
                <button onClick={() => handleRestock(sweet._id)}>
                  Restock
                </button>
                <button onClick={() => handleDelete(sweet._id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
