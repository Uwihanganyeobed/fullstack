import { useState } from "react";
import { login, register } from "../api";

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = async () => {
    if (isLogin) {
      const res = await login({
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      onLogin();
    } else {
      await register(form);
      alert("Registered successfully");
      setIsLogin(true);
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded mb-4">
      <h2 className="font-bold mb-3">
        {isLogin ? "Login" : "Register"}
      </h2>

      {!isLogin && (
        <input
          className="border p-2 w-full mb-2"
          placeholder="name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
      )}

      <input
        className="border p-2 w-full mb-2"
        placeholder="email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        className="border p-2 w-full mb-2"
        type="password"
        placeholder="password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-3 py-1 w-full"
      >
        {isLogin ? "Login" : "Register"}
      </button>

      <p
        onClick={() => setIsLogin(!isLogin)}
        className="text-sm text-blue-600 mt-2 cursor-pointer"
      >
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </p>
    </div>
  );
}