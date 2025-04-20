export default function RegisterForm() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full p-3 border rounded-xl mb-4"
      />
      <input
        type="text"
        placeholder="NU ID"
        className="w-full p-3 border rounded-xl mb-4"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 border rounded-xl mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 border rounded-xl mb-4"
      />

      <button className="w-full bg-black text-white font-semibold py-2 px-4 rounded-xl cursor-pointer">
        Register
      </button>
    </div>
  );
}
