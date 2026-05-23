import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import AuthForm from "../components/AuthForm";
import toast from "react-hot-toast";

function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await login(formData);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const useDemoCredentials = () => {
    setFormData({
      email: "demo@example.com",
      password: "demo123",
    });
    toast.success("Demo credentials loaded!");
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-slate-800 rounded-lg shadow-lg p-8 backdrop-blur">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Sign in to your account</p>
        </div>

        {/* Demo Credentials Box */}
        <div className="mb-6 p-4 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 border border-pink-500/30 rounded-lg">
          <p className="text-sm text-slate-300 mb-3">
            <span className="text-pink-400 font-semibold">Demo Account:</span>
          </p>
          <div className="space-y-2 mb-3">
            <p className="text-xs text-slate-400">
              📧 <span className="text-slate-200 font-mono">demo@example.com</span>
            </p>
            <p className="text-xs text-slate-400">
              🔑 <span className="text-slate-200 font-mono">demo123</span>
            </p>
          </div>
          <button
            type="button"
            onClick={useDemoCredentials}
            className="w-full px-3 py-2 bg-gradient-to-r from-pink-500/30 to-cyan-500/30 text-pink-300 text-sm font-semibold rounded hover:from-pink-500/50 hover:to-cyan-500/50 transition"
          >
            Use Demo Credentials
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-semibold py-2 rounded-lg hover:from-pink-600 hover:to-cyan-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingIn ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-slate-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-pink-500 hover:text-pink-400 font-medium transition">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
