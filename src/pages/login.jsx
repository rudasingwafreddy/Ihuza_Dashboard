import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { BoxIcon, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/auth-context";
import { Button } from "../components/base/button";
import { Input } from "../components/base/input";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [genErrors, setGenErrors] = useState("");

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: schema,
    },
    onSubmit: async ({ value }) => {
      setGenErrors("");
      const res = await login(value.email, value.password);

      if (!res.result) {
        setGenErrors(res.error || "Invalid credentials");
      }
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-600/10 via-slate-50 to-indigo-500/10">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-300">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-xl shadow-lg">
            <BoxIcon className="size-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              i<span className="text-blue-600">Huza</span>
            </h1>
            <span className="text-xs text-slate-500">
              Inventory Management
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-slate-800">
              Welcome back 👋
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Sign in to continue to your dashboard
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            {genErrors && (
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-600">
                {genErrors}
              </div>
            )}

            {/* Email */}
            <form.Field name="email">
              {(field) => (
                <Input
                  label="Email address"
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    setGenErrors("");
                    field.handleChange(e.target.value);
                  }}
                  error={field.state.meta.errors?.[0]?.message}
                  autoComplete="email"
                  disabled={form.state.isSubmitting}
                />
              )}
            </form.Field>

            {/* Password */}
            <form.Field name="password">
              {(field) => (
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      setGenErrors("");
                      field.handleChange(e.target.value);
                    }}
                    error={field.state.meta.errors?.[0]?.message}
                    autoComplete="current-password"
                    disabled={form.state.isSubmitting}
                  />

                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-[2.3rem] text-slate-400 hover:text-slate-700 transition"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              )}
            </form.Field>

            {/* Submit */}
            <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              )}
            </form.Subscribe>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm space-y-2">
            <Link
              to="/forgot-password"
              className="text-slate-500 hover:text-slate-800"
            >
              Forgot password?
            </Link>

            <p className="text-slate-500">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
