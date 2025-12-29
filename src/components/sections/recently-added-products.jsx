import { Card } from "../base/card";
import { useData } from "../../contexts/data-context";
import { useAuth } from "../../contexts/auth-context";
import { checkQuantityStatus, cn } from "../../utils";
import { Badge } from "../base/badge";

export const RecentlyAddedProducts = () => {
  const { isAdmin, user } = useAuth();
  const { products, getCategoryById } = useData();

  const filteredProducts = isAdmin
    ? products
    : products.filter((p) => p.createdBy === user?.email);

  const recentProducts = [...filteredProducts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <Card
      title={"Recently Added Products"}
      asideLink={"/products"}
      asideText="View all"
    >
      {recentProducts.length === 0 ? (
        <p className="text-muted-foreground text-sm py-4 text-center">
          No products yet. Add your first product!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentProducts.map((product) => {
            const category = getCategoryById(product.categoryId).data;
            return (
              <div
                className={cn(
                  "bg-background rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
                )}
                key={product.id}
              >
                <div className="flex justify-between items-start mb-1">
                  <h5 className="font-medium text-foreground text-sm">
                    {product.name}
                  </h5>
                  <Badge text={checkQuantityStatus(product.quantity)} />
                </div>
                <div className="flex flex-col text-muted-foreground">
                  <p className="text-sm">{category?.name}</p>
                  <p className="text-xs mt-1 text-muted-foreground/85">
                    {product.createdAt?.split("T")[0]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};
