// 📁 app/menu/page.jsx
"use client";
import { QRCodeCanvas } from 'qrcode.react';


const menuData = [
  {
    category: "Breakfast",
    items: [
      { name: "Pancakes", price: "₦2,000", description: "Served with syrup and butter" },
      { name: "Omelette", price: "₦1,800", description: "Three-egg omelette with vegetables" },
    ],
  },
  {
    category: "Lunch",
    items: [
      { name: "Jollof Rice", price: "₦3,000", description: "Served with chicken & plantain" },
      { name: "Fried Rice", price: "₦3,000", description: "Served with grilled turkey" },
    ],
  },
  {
    category: "Dinner",
    items: [
      { name: "Yam Porridge", price: "₦2,500", description: "Yam cooked with palm oil and vegetables" },
      { name: "Efo Riro", price: "₦2,800", description: "Vegetable soup with assorted meat" },
    ],
  },
  {
    category: "Drinks",
    items: [
      { name: "Chapman", price: "₦1,500", description: "Refreshing fruit punch" },
      { name: "Water", price: "₦500", description: "Bottled water (75cl)" },
    ],
  },
  {
    category: "Desserts",
    items: [
      { name: "Ice Cream", price: "₦1,200", description: "Vanilla or chocolate scoop" },
      { name: "Fruit Salad", price: "₦1,000", description: "Fresh seasonal fruits" },
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
        <div key={section.category} className="mb-16">
          <h2 className="text-xl font-semibold text-gold-700 mb-4">
            {section.category}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {section.items.map((item, index) => (
              <div
                key={index}
                className="border border-blue-100 bg-white rounded-2xl shadow-sm hover:shadow-lg p-4 transition-all"
              >
                <h3 className="text-lg font-bold text-blue-900">{item.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                <p className="text-gold-600 font-semibold mt-2">{item.price}</p>
              </div>
            ))}
          </div>

          {/* QR Code */}
          <div className="mt-6 flex justify-center">
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-center text-sm text-gray-600 mb-2">
                Scan to view {section.category} menu on your phone
              </p>
              <QRCodeCanvas
                 value={`https://aes-menu.vercel.app/menu/${section.category.toLowerCase()}`}
                  size={128}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Floating Contact Button */}
      <a
        href="tel:0"
        className="fixed bottom-6 right-6 bg-gold-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gold-700 transition"
      >
        📞 Room Service
      </a>
    </div>
  );
}
