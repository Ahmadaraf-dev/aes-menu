"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase"; 
import Image from "next/image";

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openCategories, setOpenCategories] = useState({});

  const categories = ["Breakfast", "Lunch", "Dinner", "Drinks", "Desserts"];

  useEffect(() => {
    const fetchMenu = async () => {
      const querySnapshot = await getDocs(collection(db, "menu"));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMenuItems(items);
      setLoading(false);
    };

    fetchMenu();
  }, []);

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="relative min-h-screen p-6 bg-white max-w-4xl mx-auto overflow-hidden">
      {/* Background watermark */}
      <div className="absolute inset-0 opacity-5 z-0 pointer-events-none">
        <Image
          src="/logo.png" 
          alt="AES Luxury Logo"
          fill
          style={{ objectFit: "contain" }}
          priority
          />
      </div>

      <div className="relative z-10">
        <h1 className="text-4xl font-serif font-bold text-center text-blue-900 mb-6">Our Menu</h1>

        <input
          type="text"
          placeholder="Search menu..."
          className="w-full p-2 border rounded mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <p className="text-center font-semibold">Loading menu...</p>
        ) : (
          categories.map((cat) => {
            const itemsInCategory = filteredItems.filter(item => item.category === cat);
            if (itemsInCategory.length === 0) return null;

            return (
              <div key={cat} className="mb-6 border rounded shadow">
                <button
                  onClick={() => toggleCategory(cat)}
                  className="w-full flex justify-between items-center px-4 py-3 bg-blue-100 text-blue-900 font-bold font-serif rounded-t text-lg"
                >
                  <span>{cat}</span>
                  <span>{openCategories[cat] ? "▲" : "▼"}</span>
                </button>

                {openCategories[cat] && (
                  <div className="p-4 bg-blue-50 space-y-3">
                    {itemsInCategory.map(item => (
                      <div key={item.id} className="border-b pb-2">
                        <h3 className="font-semibold font-serif text-lg text-blue-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-gold-700 font-medium">₦{item.price}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
