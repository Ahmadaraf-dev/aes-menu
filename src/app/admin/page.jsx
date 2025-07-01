"use client";

import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";




const categories = ["Breakfast", "Lunch", "Dinner", "Drinks", "Desserts"];

export default function AdminPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "Breakfast" });
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
    await addDoc(collection(db, "menu"), form);
    setForm({ name: "", description: "", price: "", category: "Breakfast" });
    fetchMenu();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "menu", id));
    fetchMenu();
  };

  return (
    <div className="min-h-screen bg-white p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Admin Menu Management</h1>

      <form onSubmit={handleAddItem} className="bg-blue-50 p-4 rounded-xl mb-8 space-y-4">
        <input
          type="text"
          placeholder="Item Name"
          className="w-full p-2 border rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Price"
          className="w-full p-2 border rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <select
          className="w-full p-2 border rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded">
          Add Item
        </button>
      </form>

      {loading ? (
        <p className="text-center">Loading menu...</p>
      ) : (
        categories.map((cat) => (
          <div key={cat} className="mb-6">
            <h2 className="text-xl font-semibold text-gold-700 mb-2">{cat}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {menuItems.filter(item => item.category === cat).map(item => (
                <div key={item.id} className="border p-4 rounded-lg bg-white shadow">
                  <h3 className="font-bold text-blue-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-gold-700 font-semibold">{item.price}</p>
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
