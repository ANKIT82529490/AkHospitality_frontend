import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // ✅ UX
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);

      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Account created successfully!");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          password,
          email,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Logged in successfully!");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  // ✅ reset fields when toggling
  useEffect(() => {
    setPassword("");
  }, [state]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <form
          onSubmit={onSubmitHandler}
          className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-8"
        >
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              {state === "Sign Up" ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Please {state === "Sign Up" ? "sign up" : "log in"} to book an
              appointment.
            </p>
          </div>

          <div className="space-y-4">
            {state === "Sign Up" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="mt-1 relative">
                <input
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-12 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete={state === "Sign Up" ? "new-password" : "current-password"}
                />

                {/* Show/Hide */}
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs sm:text-sm text-gray-600 hover:text-gray-900"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {state === "Sign Up" && (
                <p className="text-xs text-gray-500 mt-1">
                  Password should be at least 8 characters.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full rounded-lg py-2.5 text-sm sm:text-base font-medium text-white shadow-md transition-all
                ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                }`}
            >
              {isLoading
                ? state === "Sign Up"
                  ? "Creating..."
                  : "Logging in..."
                : state === "Sign Up"
                ? "Create Account"
                : "Login"}
            </button>

            {/* Switch */}
            {state === "Sign Up" ? (
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setState("Login")}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Login here
                </button>
              </p>
            ) : (
              <p className="text-center text-sm text-gray-600">
                New here?{" "}
                <button
                  type="button"
                  onClick={() => setState("Sign Up")}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Create an account
                </button>
              </p>
            )}
          </div>
        </form>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-500 mt-4">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
