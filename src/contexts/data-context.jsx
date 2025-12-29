import { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_USERS,
  INITIAL_ACTIVITIES,
} from "../data/seed";
import { useAuth } from "./auth-context";

const DataContext = createContext(null);

const PRODUCTS_STORAGE_KEY = "ihuza-products";
const CATEGORIES_STORAGE_KEY = "ihuza-categories";
const USERS_STORAGE_KEY = "ihuza-users";
const ACTIVITIES_STORAGE_KEY = "ihuza-activities";

export function DataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const { user, isAdmin } = useAuth();

  // init data from local
  useEffect(() => {
    const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    const storedCategories = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    const storedActivities = localStorage.getItem(ACTIVITIES_STORAGE_KEY);

    setProducts(storedProducts ? JSON.parse(storedProducts) : INITIAL_PRODUCTS);
    setCategories(
      storedCategories ? JSON.parse(storedCategories) : INITIAL_CATEGORIES
    );
    setUsers(storedUsers ? JSON.parse(storedUsers) : INITIAL_USERS);
    setActivities(
      storedActivities ? JSON.parse(storedActivities) : INITIAL_ACTIVITIES
    );
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    }
  }, [categories]);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }
  }, [users]);

  useEffect(() => {
    if (activities.length > 0) {
      localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(activities));
    }
  }, [activities]);

  function recordActivity(activity) {
    // activity: { type: "add", itemId: "2", doneBy: "user1" }
    const newActivity = {
      ...activity,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      doneBy: user.email,
    };
    setActivities((prev) => [newActivity, ...prev]);
  }

  const addProduct = (product) => {
    const existingProduct = products.find(
      (p) => p.name.toLowerCase() === product.name.toLowerCase()
    );
    if (existingProduct) {
      return { error: "Product name already exists" };
    }

    const newProduct = {
      ...product,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      createdBy: user.email,
    };
    recordActivity({
      type: "product-add",
      itemId: newProduct.id,
    });

    setProducts((prev) => [newProduct, ...prev]);
    return { data: newProduct };
  };

  const updateProduct = (id, updates) => {
    const existingProduct = products.find((p) => p.id === id);
    if (!existingProduct) {
      return { error: "Product not found" };
    }
    if (!isAdmin && user.email !== existingProduct.createdBy) {
      return { error: "Unauthorized" };
    }
    recordActivity({
      type: "product-update",
      itemId: id,
    });
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    return { data: "success" };
  };

  const deleteProduct = (id) => {
    const existingProduct = products.find((p) => p.id === id);
    if (!existingProduct) {
      return { error: "Product not found" };
    }
    if (!isAdmin && user.email !== existingProduct.createdBy) {
      return { error: "Unauthorized" };
    }
    recordActivity({
      type: "product-delete",
      itemId: id,
    });
    setProducts((prev) => prev.filter((p) => p.id !== id));
    return { data: "success" };
  };

  const getProductById = (id) => {
    const foundProduct = products.find((p) => p.id === id);
    if (!foundProduct) {
      return { error: "Product not found" };
    }
    return { data: foundProduct };
  };

  const addCategory = (category) => {
    if (!isAdmin) {
      return { error: "Unauthorized" };
    }

    const existingCat = categories.find(
      (c) => c.name.toLowerCase() === category.name.toLowerCase()
    );
    if (existingCat) {
      return { error: "Category name already exists" };
    }

    const newCategory = {
      ...category,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
    };
    recordActivity({
      type: "category-add",
      itemId: newCategory.id,
    });
    setCategories((prev) => [newCategory, ...prev]);
    return { data: newCategory };
  };

  const updateCategory = (id, updates) => {
    const existingCategory = categories.find((c) => c.id === id);
    if (!existingCategory) {
      return { error: "Category not found" };
    }
    if (!isAdmin) {
      return { error: "Unauthorized" };
    }
    recordActivity({
      type: "category-update",
      itemId: id,
    });
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    return { data: "success" };
  };

  const deleteCategory = (id) => {
    const existingCategory = categories.find((c) => c.id === id);
    if (!existingCategory) {
      return { error: "Category not found" };
    }
    if (!isAdmin) {
      return { error: "Unauthorized" };
    }
    recordActivity({
      type: "category-delete",
      itemId: id,
    });
    setCategories((prev) => prev.filter((c) => c.id !== id));
    return { data: "success" };
  };

  const getCategoryById = (id) => {
    const foundCategory = categories.find((c) => c.id === id);
    if (!foundCategory) {
      return { error: "Category not found" };
    }
    return { data: foundCategory };
  };

  const getProductCountByCategory = (categoryId) => {
    const foundCategory = categories.find((c) => c.id === categoryId);
    if (!foundCategory) {
      return { error: "Category not found" };
    }
    const count = products.filter((p) => p.categoryId === categoryId).length;
    return { data: count };
  };

  const addUser = (userData) => {
    const existingByEmail = users.find(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase()
    );
    if (existingByEmail) {
      return { error: "Email already exists" };
    }

    const newUser = {
      ...userData,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      lastLogin: undefined,
    };
    recordActivity({
      type: "user-add",
      itemId: newUser.id,
    });
    setUsers((prev) => [newUser, ...prev]);
    return { data: newUser };
  };

  const updateUser = (id, updates) => {
    const existingUser = users.find((u) => u.id === id);
    if (!existingUser) {
      return { error: "User not found" };
    }
    if (!isAdmin && user.email !== existingUser.email) {
      return { error: "Unauthorized" };
    }
    recordActivity({
      type: "user-update",
      itemId: id,
    });
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updates } : u))
    );
    return { data: "success" };
  };

  const deleteUser = (id) => {
    const existingUser = users.find((u) => u.id === id);
    if (!existingUser) {
      return { error: "User not found" };
    }
    if (!isAdmin && user.email !== existingUser.email) {
      return { error: "Unauthorized" };
    }
    recordActivity({
      type: "user-delete",
      itemId: id,
    });
    setUsers((prev) => prev.filter((u) => u.id !== id));
    return { data: "success" };
  };

  const getUserById = (id) => {
    const foundUser = users.find((u) => u.id === id);
    if (!foundUser) {
      return { error: "User not found" };
    }
    return { data: foundUser };
  };

  // stats
  const getStats = (userEmail = null) => {
    const filteredProducts = userEmail
      ? products.filter((p) => p.createdBy === userEmail)
      : products;

    const totalProducts = filteredProducts.length;
    const totalCategories = categories.length;
    const totalUsers = users.length;
    const lowStockProducts = filteredProducts.filter(
      (p) => p.quantity <= 10
    ).length;
    const outOfStockProducts = filteredProducts.filter(
      (p) => p.quantity <= 0
    ).length;
    const totalValue = filteredProducts.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );

    return {
      totalProducts,
      totalCategories,
      totalUsers,
      lowStockProducts,
      outOfStockProducts,
      totalValue,
    };
  };

  return (
    <DataContext.Provider
      value={{
        // products
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        // categories
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        getCategoryById,
        getProductCountByCategory,
        // users
        users,
        addUser,
        updateUser,
        deleteUser,
        getUserById,
        // activities
        activities,
        // stats
        getStats,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
