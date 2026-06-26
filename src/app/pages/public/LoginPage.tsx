import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { MarconeLogoText } from "../../components/MarconeLogoText";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in prototype, just navigate to members area
    navigate("/members");
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResetConfirmation(true);
  };

  if (showResetPassword) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-center mb-6">
              <MarconeLogoText />
            </div>

            {showResetConfirmation ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
                <p className="text-stone-600 mb-6">
                  We've sent password reset instructions to {resetEmail}
                </p>
                <button
                  onClick={() => {
                    setShowResetPassword(false);
                    setShowResetConfirmation(false);
                  }}
                  className="text-[#D7272D] font-semibold hover:underline"
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-center mb-2">Reset Password</h2>
                <p className="text-stone-600 text-center mb-6">
                  Enter your email and we'll send you reset instructions
                </p>

                <form onSubmit={handleResetPassword}>
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7272D] focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D7272D] text-white py-3 rounded-full font-semibold hover:bg-[#b92127] transition-colors mb-4"
                  >
                    Send Reset Instructions
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowResetPassword(false)}
                    className="w-full text-stone-600 hover:text-stone-900 text-sm"
                  >
                    Back to Login
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <MarconeLogoText />
          </div>

          <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
          <p className="text-stone-600 text-center mb-6">
            Sign in to access your MSA membership
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7272D] focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7272D] focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#D7272D] border-stone-300 rounded focus:ring-[#D7272D]"
                />
                <span className="text-sm text-stone-700">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => setShowResetPassword(true)}
                className="text-sm text-[#D7272D] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#D7272D] text-white py-3 rounded-full font-semibold hover:bg-[#b92127] transition-colors mb-6"
            >
              Sign In
            </button>

            <div className="text-center text-sm text-stone-600">
              Not a member yet?{" "}
              <Link to="/join" className="text-[#D7272D] font-semibold hover:underline">
                Join MSA Pro
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
