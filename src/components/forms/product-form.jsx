import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Select } from "../base/select";
import { Input } from "../base/input";
import { Button } from "../base/button";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  categoryId: z.string().min(1, "Please select a category"),
  quantity: z.coerce.number().min(0, "Quantity cannot be negative"),
  price: z.coerce.number().min(0, "Price cannot be negative"),
});

export const ProductForm = ({
  editingProduct,
  categories,
  onClose,
  onSubmit,
}) => {
  const form = useForm({
    defaultValues: {
      name: editingProduct?.name ?? "",
      categoryId: editingProduct?.categoryId ?? "",
      quantity: editingProduct?.quantity ?? "",
      price: editingProduct?.price ?? "",
    },
    validators: {
      onChange: schema,
    },
    onSubmit: ({ value }) => {
      onSubmit({
        name: value.name,
        categoryId: value.categoryId,
        quantity: Number(value.quantity),
        price: Number(value.price),
      });
    },
  });

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

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
            label="Product Name"
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errors?.[0]?.message}
            placeholder="Enter product name"
          />
        )}
      </form.Field>

      <form.Field name="categoryId">
        {(field) => (
          <Select
            label="Category"
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            options={categoryOptions}
            placeholder="Select a category"
            error={field.state.meta.errors?.[0]?.message}
          />
        )}
      </form.Field>

      <div className="grid grid-cols-2 gap-4">
        <form.Field name="quantity">
          {(field) => (
            <Input
              label="Quantity"
              name={field.name}
              type="number"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors?.[0]?.message}
              placeholder="0"
            />
          )}
        </form.Field>

        <form.Field name="price">
          {(field) => (
            <Input
              label="Price (rwf)"
              name={field.name}
              type="number"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors?.[0]?.message}
              placeholder="0.00"
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
                : editingProduct
                ? "Save Changes"
                : "Add Product"}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
};
