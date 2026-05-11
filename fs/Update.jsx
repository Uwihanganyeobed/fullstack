import { useEffect, useState } from "react";
import { updateProduct } from "../api";

export default function Update({ selected, onDone, refresh }) {
  const [form, setForm] = useState(selected);

  useEffect(() => {
    setForm(selected);
  }, [selected]);

  if (!selected) return null;

  const handleUpdate = async () => {
    await updateProduct(selected.id, form);
    onDone();
    refresh();
  };

  return (
    <div className="p-4 bg-yellow-50 shadow rounded mb-4">
      <h2 className="font-bold mb-2">Update Product</h2>

      <input
        className="border p-2 w-full mb-2"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-2"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-2"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <button
        onClick={handleUpdate}
        className="bg-yellow-500 text-white px-3 py-1"
      >
        Update
      </button>
    </div>
  );
}