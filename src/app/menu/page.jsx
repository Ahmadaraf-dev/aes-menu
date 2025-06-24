import React from "react";

const menuData = [
  {
    category: "Breakfast",
    items: [
      { name: "Pancakes", price: "₦2500", description: "Fluffy pancakes with syrup" },
      { name: "Omelette", price: "₦2000", description: "Egg omelette with veggies" },
    ],
  },
  {
    category: "Main Course",
    items: [
      { name: "Jollof Rice", price: "₦3500", description: "Served with chicken and salad" },
      { name: "Efo Riro", price: "₦4000", description: "Vegetable soup with assorted meat" },
    ],
  },
  {
    category: "Drinks",
    items: [
      { name: "Chapman", price: "₦1500", description: "Refreshing fruit punch" },
      { name: "Water", price: "₦500", description: "Bottled water (75cl)" },
    ],
  },
];

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        AES Luxury Restaurant Menu
      </h1>

      {menuData.map((section) => (
        <div key={section.category} className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 border-b pb-1 mb-4">
            {section.category}
          </h2>
          <ul className="space-y-4">
            {section.items.map((item) => (
              <li key={item.name} className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <span className="text-blue-700 font-semibold">{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
