import { deleteProduct } from "../api";

export default function List({ products, onEdit, refresh }) {
  const handleDelete = async (id) => {
    await deleteProduct(id);
    refresh();
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="font-bold mb-2">Products</h2>

      {products.map((p) => (
        <div
          key={p.id}
          className="flex justify-between border p-2 mb-2 rounded"
        >
          <div>
            {p.name} - ${p.price} ({p.category})
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(p)}
              className="text-blue-500"
            >
              edit
            </button>

            <button
              onClick={() => handleDelete(p.id)}
              className="text-red-500"
            >
              delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}