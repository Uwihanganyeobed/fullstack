import { useState } from "react";
import { createProduct } from "../api";

export default function Create({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
  });

  const handleCreate = async () => {
    await createProduct(form);
    setForm({ name: "", price: "", category: "" });
    refresh();
  };

  return (
    <div className="p-4 bg-white shadow rounded mb-4">
      <h2 className="font-bold mb-2">Create Product</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <button
        onClick={handleCreate}
        className="bg-purple-500 text-white px-3 py-1"
      >
        Add Product
      </button>
    </div>
  );
}