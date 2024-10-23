import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  submitReview,
  ProductData,
  ReviewData,
  GetProductData,
} from "../services/product"; // import your services
import { IProduct } from "../types/product";

interface ProductContextProps {
  products: IProduct[];
  getProduct: (id: string) => Promise<IProduct>;
  createNewProduct: (productData: ProductData) => Promise<IProduct>;
  updateExistingProduct: (
    id: string,
    productData: ProductData
  ) => Promise<IProduct>;
  removeProduct: (id: string) => Promise<void>;
  reviewProduct: (id: string, reviewData: ReviewData) => Promise<any>;
  fetchProducts: (props: GetProductData) => Promise<IProduct[]>;
}

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = async (props: GetProductData) => {
    try {
      const fetchedProducts = await getAllProducts(props);
      setProducts(fetchedProducts);
      return fetchedProducts;
    } catch (error) {
      console.error("Error fetching products", error);
      throw error;
    }
  };

  const getProduct = async (id: string) => {
    try {
      const product = await getProductById(id);
      return product;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}`, error);
      throw error;
    }
  };

  // Create a new product
  const createNewProduct = async (productData: ProductData) => {
    try {
      const createdProduct = await createProduct(productData);
      console.log(createdProduct);
      setProducts((prev) => [...prev, createdProduct]);
      return createdProduct;
    } catch (error) {
      console.error("Error creating product", error);
      throw error;
    }
  };

  // Update an existing product
  const updateExistingProduct = async (
    id: string,
    productData: ProductData
  ) => {
    try {
      const updatedProduct = await updateProduct(id, productData);
      setProducts(
        products.map((product) =>
          product._id === id ? updatedProduct : product
        )
      );
      return updatedProduct;
    } catch (error) {
      console.error(`Error updating product with ID ${id}`, error);
      throw error;
    }
  };

  // Delete a product
  const removeProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error(`Error deleting product with ID ${id}`, error);
      throw error;
    }
  };

  // Submit a review for a product
  const reviewProduct = async (id: string, reviewData: ReviewData) => {
    try {
      const response = await submitReview(id, reviewData);
      return response;
    } catch (error) {
      console.error(`Error submitting review for product with ID ${id}`, error);
      throw error;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProduct,
        createNewProduct,
        updateExistingProduct,
        removeProduct,
        reviewProduct,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the ProductContext
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
