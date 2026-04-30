import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = (e) => {
    e.preventDefault();

    const email = form.email?.trim();
    const password = form.password?.trim();

    // empty check
    if (!email || !password) {
      alert("Please fill email and password");
      return;
    }

    // login check
    if (email !== "admin@gmail.com" || password !== "1234") {
      alert("Invalid credentials ❌");
      return;
    }

    // save login
    localStorage.setItem("auth", "true");

    // redirect to dashboard (HashRouter safe)
    window.location.hash = "/";
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">

      <div className="card p-4 shadow" style={{ width: 350 }}>

        <h3 className="text-center mb-3">Admin Login</h3>

        <form onSubmit={submit}>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="btn btn-dark w-100">
            Login
          </button>

        </form>

      </div>
    </div>
  );
}