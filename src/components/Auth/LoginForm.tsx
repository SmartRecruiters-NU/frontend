import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";
import { useRouter } from "next/router";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please fill all fields.");
      return;
    }
    dispatch(login({ email, token: "dummy-token" }));
    router.push("/dashboard");
  };

  return (
    <>
      <label className="block mb-2 font-medium">Email</label>
      <input
        type="text"
        className={`w-full p-3 border rounded-xl mb-4 ${
          error ? "border-red-500" : ""
        }`}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="block mb-2 font-medium">Password</label>
      <input
        type="password"
        className={`w-full p-3 border rounded-xl mb-4 ${
          error ? "border-red-500" : ""
        }`}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl cursor-pointer"
      >
        Login
      </button>
    </>
  );
}
