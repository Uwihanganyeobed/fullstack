import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import Create from "./components/Create";
import List from "./components/List";
import Update from "./components/Update";
import { getProducts } from "./api";

export default function App() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [logged, setLogged] = useState(false);

  const loadProducts = async () => {
    const res = await getProducts();
    setProducts(res.data.results);
  };

  useEffect(() => {
    loadProducts();
  }, []);

 return (
  <div className="min-h-screen bg-gray-100 p-4">

    <h1 className="text-2xl font-bold mb-4 text-center">
      Simple Admin System
    </h1>

    {!isLoggedIn() ? (
      <Auth onLogin={loadProfile} />
    ) : (
      <>
        {profile && (
          <div className="bg-green-50 p-4 rounded shadow mb-4">
            <h2 className="font-bold">👤 Profile</h2>
            <p>{profile.name}</p>
            <p>{profile.email}</p>
            <p>{profile.role}</p>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 mt-2"
            >
              Logout
            </button>
          </div>
        )}

        <Create refresh={loadProducts} />

        <Update
          selected={selected}
          onDone={() => setSelected(null)}
          refresh={loadProducts}
        />

        <List
          products={products}
          refresh={loadProducts}
          onEdit={(p) => setSelected(p)}
        />
      </>
    )}
  </div>
);
}