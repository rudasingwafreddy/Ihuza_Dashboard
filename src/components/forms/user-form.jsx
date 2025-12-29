import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Input } from "../base/input";
import { Select } from "../base/select";
import { Button } from "../base/button";

const createSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["Admin", "Manager", "Staff"]),
  status: z.enum(["Active", "Inactive"]),
});

const editSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email("Invalid email address"),
  password: z.string().optional(),
  role: z.enum(["Admin", "Manager", "Staff"]),
  status: z.enum(["Active", "Inactive"]),
});

const roleOptions = [
  { value: "Admin", label: "Admin" },
  { value: "Manager", label: "Manager" },
  { value: "Staff", label: "Staff" },
];

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

export const UserForm = ({ editingUser, onClose, onSubmit }) => {
  const form = useForm({
    defaultValues: {
      name: editingUser?.name ?? "",
      email: editingUser?.email ?? "",
      password: "",
      role: editingUser?.role ?? "Staff",
      status: editingUser?.status ?? "Active",
    },
    validators: {
      onChange: editingUser ? editSchema : createSchema,
    },
    onSubmit: ({ value }) => {
      const userData = {
        name: value.name,
        email: value.email,
        role: value.role,
        status: value.status,
      };
      if (value.password) {
        userData.password = value.password;
      }
      onSubmit(userData);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field name="name">
        {(field) => (
          <Input
            label="Full Name"
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errors?.[0]?.message}
            placeholder="Enter full name"
          />
        )}
      </form.Field>

      <form.Field name="email">
        {(field) => (
          <Input
            label="Email"
            name={field.name}
            type="email"
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errors?.[0]?.message}
            placeholder="Enter email address"
          />
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <Input
            label={
              editingUser ? "New Password (leave blank to keep)" : "Password"
            }
            name={field.name}
            type="password"
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errors?.[0]?.message}
            placeholder={editingUser ? "Enter new password" : "Enter password"}
          />
        )}
      </form.Field>

      <div className="grid grid-cols-2 gap-4">
        <form.Field name="role">
          {(field) => (
            <Select
              label="Role"
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              options={roleOptions}
              error={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>

        <form.Field name="status">
          {(field) => (
            <Select
              label="Status"
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              options={statusOptions}
              error={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="flex-1"
        >
          Cancel
        </Button>
        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="flex-1"
            >
              {isSubmitting
                ? "Saving..."
                : editingUser
                ? "Save Changes"
                : "Add User"}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
};
