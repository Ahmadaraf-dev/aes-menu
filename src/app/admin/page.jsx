"use client";

import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";

const categories = ["Breakfast", "Lunch", "Dinner", "Drinks", "Desserts"];

export default function AdminPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Breakfast",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "menu"));
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMenuItems(items);
    setLoading(false);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "menu"), {
        ...form,
        price: parseFloat(form.price),
      });

      setForm({
        name: "",
        description: "",
        price: "",
        category: "Breakfast",
      });

      fetchMenu();
      alert("Item added successfully!");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please check your connection or Firebase setup.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await deleteDoc(doc(db, "menu", id));
      fetchMenu();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item.");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Admin Menu Management</h1>

      <form onSubmit={handleAddItem} className="bg-blue-50 p-6 rounded-xl mb-8 space-y-4 shadow-md">
        <input
          type="text"
          placeholder="Item Name"
          className="w-full p-3 border rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="w-full p-3 border rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price (e.g. 2500)"
          className="w-full p-3 border rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <select
          className="w-full p-3 border rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-blue-700 text-white font-semibold px-4 py-3 rounded hover:bg-blue-800"
        >
          Add Menu Item
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-600">Loading menu...</p>
      ) : (
        categories.map((cat) => (
          <div key={cat} className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-3">{cat}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {menuItems.filter(item => item.category === cat).map(item => (
                <div key={item.id} className="border p-4 rounded-lg bg-white shadow">
                  <h3 className="font-bold text-blue-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-blue-900 font-medium">₦{item.price}</p>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="mt-2 text-red-600 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
