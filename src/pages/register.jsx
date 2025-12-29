import { Link, Navigate } from "react-router-dom";
import { BoxIcon, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/auth-context";
import { Button } from "../components/base/button";
import { Input } from "../components/base/input";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
});

export const RegisterPage = () => {
  const { register, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [genErrors, setGenErrors] = useState(undefined);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: schema,
    },
    onSubmit: ({ value }) => {
      const res = register(value.name, value.email, value.password);
      console.log(res);
      if (!res.result) {
        setGenErrors(res.error);
      }
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-accent-500/10 via-background to-primaryColor-500/10">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="p-2.5 bg-primaryColor-500 rounded-xl">
            <BoxIcon className="size-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-foreground">iHuza</h1>
            <span className="text-xs text-muted-foreground">
              Inventory Management
            </span>
          </div>
        </div>

        <div className="bg-background border rounded-2xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Create account
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Start managing your inventory today
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
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-sm text-destructive">
                {genErrors}
              </div>
            )}
            <form.Field name="name">
              {(field) => (
                <Input
                  label="Full Name"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={field.state.meta.errors?.[0]?.message}
                  autoComplete="name"
                />
              )}
            </form.Field>

            <form.Field name="email">
              {(field) => (
                <Input
                  label="Email"
                  type="email"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={field.state.meta.errors?.[0]?.message}
                  autoComplete="email"
                />
              )}
            </form.Field>

            <form.Field name="password">
              {(field) => (
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    placeholder="*********"
                    onChange={(e) => field.handleChange(e.target.value)}
                    error={
                      field.state.meta.errors?.[0]?.message ??
                      field.state.meta.errors?.[0]
                    }
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[2.3rem] text-muted-foreground hover:text-foreground transition-colors"
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
            <form.Field
              name="confirmPassword"
              validators={{
                onChangeListenTo: ["password"],
                onChange: ({ value, fieldApi }) => {
                  if (value !== fieldApi.form.getFieldValue("password")) {
                    return "Passwords do not match";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="relative">
                  <Input
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    error={
                      field.state.meta.errors?.[0]?.message ??
                      field.state.meta.errors?.[0]
                    }
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[2.3rem] text-muted-foreground hover:text-foreground transition-colors"
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

            <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  {isSubmitting ? "Creating account..." : "Create account"}
                </Button>
              )}
            </form.Subscribe>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primaryColor-500 hover:text-primaryColor-600 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
