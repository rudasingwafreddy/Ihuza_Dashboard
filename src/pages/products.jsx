import { useState } from "react";
import { Plus, Search, BoxIcon } from "lucide-react";
import { useData } from "../contexts/data-context";
import { SimpleCard } from "../components/base/card";
import { Button } from "../components/base/button";
import { Badge } from "../components/base/badge";
import { Modal } from "../components/base/modal";
import { IconCard } from "../components/icon-card";
import { useAuth } from "../contexts/auth-context";
import { checkQuantityStatus } from "../utils";
import { ProductForm } from "../components/forms/product-form";
import { toast } from "sonner";

export const ProductsPage = () => {
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    getCategoryById,
  } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { user, isAdmin } = useAuth();

  const filteredProducts = products
    .filter((product) => {
      if (isAdmin) {
        return (
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        return (
          product.createdBy === user.email &&
          (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
    })
    .map((p) => {
      const category = getCategoryById(p.categoryId);
      return { ...p, category: category.data?.name ?? "Unknown" };
    });

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleFormSubmit = (value) => {
    if (editingProduct) {
      const result = updateProduct(editingProduct.id, value);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Product updated successfully");
    } else {
      const result = addProduct(value);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Product added successfully");
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    const result = deleteProduct(id);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Product deleted successfully");
    setDeleteConfirm(null);
  };

  return (
    <>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primaryColor-500/50 focus:border-primaryColor-500"
        />
      </div>

      <SimpleCard
        title={"Products"}
        asideComponent={
          <Button onClick={() => handleOpenModal()}>
            <Plus className="size-4" />
            Add Product
          </Button>
        }
      >
        <div className="overflow-x-auto min-w-0">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
                  Product
                </th>
                <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
                  Category
                </th>
                <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
                  Quantity
                </th>
                <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
                  Price
                </th>
                <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    {searchQuery
                      ? "No products found matching your search."
                      : "No products yet. Add your first product!"}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b transition-colors hover:bg-muted/30"
                  >
                    <td className="px-4 py-3">
                      <div className="flex gap-3 items-center">
                        <IconCard
                          icon={BoxIcon}
                          variant="primary"
                          className="rounded-lg shrink-0"
                        />
                        <span className="font-medium text-foreground">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {product.category}
                    </td>
                    <td className="px-4 py-3 text-sm">{product.quantity}</td>
                    <td className="px-4 py-3 text-sm font-medium">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge text={checkQuantityStatus(product.quantity)} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleOpenModal(product)}
                          type="button"
                          className="transition-colors text-sm text-primaryColor-500/85 hover:text-primaryColor-500"
                          title="Edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(product)}
                          type="button"
                          className=" transition-colors text-sm text-destructive/85 hover:text-destructive"
                          title="Delete"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </SimpleCard>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProduct ? "Edit Product" : "Add Product"}
      >
        <ProductForm
          editingProduct={editingProduct}
          categories={categories}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
        />
      </Modal>

      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Product"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">
              {deleteConfirm?.name}
            </span>
            ? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteConfirm(null)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={() => handleDelete(deleteConfirm.id)}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
