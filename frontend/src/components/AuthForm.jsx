import { useState } from "react";
import toast from "react-hot-toast";

function AuthForm({ onSubmit, isLoading, isLoginForm = true }) {
  const [formData, setFormData] = useState(
    isLoginForm
      ? { email: "", password: "" }
      : { fullName: "", email: "", password: "", confirmPassword: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoginForm && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!isLoginForm && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition"
            placeholder="John Doe"
            required
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition"
          placeholder="••••••••"
          required
        />
      </div>

      {!isLoginForm && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition"
            placeholder="••••••••"
            required
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-semibold py-2 rounded-lg hover:from-pink-600 hover:to-cyan-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Loading..." : isLoginForm ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}

export default AuthForm;
