import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Input } from "../base/input";
import { Textarea } from "../base/textarea";
import { Button } from "../base/button";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
});

export const CategoryForm = ({ editingCategory, onClose, onSubmit }) => {
  const form = useForm({
    defaultValues: {
      name: editingCategory?.name ?? "",
      description: editingCategory?.description ?? "",
    },
    validators: {
      onChange: schema,
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
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
            label="Category Name"
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errors?.[0]?.message}
            placeholder="Enter category name"
          />
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <Textarea
            label="Description"
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder="Enter category description (optional)"
            rows={3}
          />
        )}
      </form.Field>

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
                : editingCategory
                ? "Save Changes"
                : "Add Category"}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
};
