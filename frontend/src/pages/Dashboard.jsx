import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import AuthContext from "../context/AuthContext";
import SweetCard from "../components/SweetCard";
import SearchBar from "../components/SearchBar";
import AdminSweetForm from "../components/AdminSweetForm";

function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const fetchSweets = async () => {
    try {
      const res = await api.get("/sweets");
      setSweets(res.data);
    } catch {
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
    } catch {
      alert("Delete failed");
    }
  };

  const handleRestock = async (id) => {
    const amount = prompt("Enter restock amount:");
    if (!amount) return;
    try {
      await api.post(`/sweets/${id}/restock`, {
        quantity: Number(amount),
      });
      fetchSweets();
    } catch {
      alert("Restock failed");
    }
  };

  const handleAddSweet = async (data) => {
    try {
      await api.post("/sweets", data);
      fetchSweets();
    } catch {
      alert("Failed to add sweet");
    }
  };

  const filteredSweets = sweets.filter((sweet) => {
    const matchesName = sweet.name
      .toLowerCase()
      .includes(filters.name.toLowerCase());

    const matchesCategory = sweet.category
      .toLowerCase()
      .includes(filters.category.toLowerCase());

    const matchesMin =
      !filters.minPrice || sweet.price >= Number(filters.minPrice);

    const matchesMax =
      !filters.maxPrice || sweet.price <= Number(filters.maxPrice);

    return matchesName && matchesCategory && matchesMin && matchesMax;
  });

 return (
  <div className="dashboard-container">
    <h1 className="page-title">🍬 Sweet Shop Dashboard</h1>

    {user?.role === "admin" && (
      <section className="admin-section">
        <h2>Add New Sweet</h2>
        <AdminSweetForm onSubmit={handleAddSweet} />
      </section>
    )}

    <section className="search-section">
      <SearchBar filters={filters} setFilters={setFilters} />
    </section>

    {error && <p className="error">{error}</p>}

    <section className="sweet-grid">
      {filteredSweets.map((sweet) => (
        <SweetCard
          key={sweet._id}
          sweet={sweet}
          onPurchase={handlePurchase}
          onRestock={handleRestock}
          onDelete={handleDelete}
          isAdmin={user?.role === "admin"}
        />
      ))}
    </section>
  </div>
);


}

export default Dashboard;
