import { IProduct } from "../types/product";
import { getBackendErrorMessage } from "../utils/error";
import axiosInstance from "./api";

export interface ProductData {
  name: string;
  description: string;
  price: number;
  images: { url: string; name: string }[];
  existingImages?: string[];
  location: string[];
  mainCategory: string[];
  category: string[];
  subCategory: string[];
  options: {
    optionCategory: string;
    optionName: string;
  }[];
  availableOnline: boolean;
  productUrl?: string;
  ships: boolean;
  pickupAvailable: boolean;
  inShopOnly: boolean;
}

export interface GetProductData {
  page?: number;
  limit?: number;
  search?: string;
  category?: string[];
  subCategory?: string[];
  minPrice?: number;
  maxPrice?: number;
  inShopOnly?: boolean;
  availableOnline?: boolean;
  options?: { [key: string]: string };
}

export interface ReviewData {
  content: string;
  rating: number;
}

export const getAllProducts = async ({
  page = 1,
  limit = 10,
  search = "",
  category = [],
  subCategory = [],
  minPrice,
  maxPrice,
  inShopOnly,
  availableOnline,
  options,
}: GetProductData): Promise<IProduct[]> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
      ...(minPrice !== undefined && { minPrice: minPrice.toString() }),
      ...(maxPrice !== undefined && { maxPrice: maxPrice.toString() }),
      ...(inShopOnly !== undefined && { inShopOnly: inShopOnly.toString() }),
      ...(availableOnline !== undefined && {
        availableOnline: availableOnline.toString(),
      }),
      ...(options && { options: JSON.stringify(options) }),
    });

    // Handle category and subCategory arrays
    if (category.length > 0) {
      category.forEach((cat) => queryParams.append("category", cat));
    }
    if (subCategory.length > 0) {
      subCategory.forEach((sub) => queryParams.append("subCategory", sub));
    }

    const response = await axiosInstance.get(
      `/products?${queryParams.toString()}`
    );
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products with filters:", error);
    throw error;
  }
};

export const fetchProductsForLocation = async (locationId: string) => {
  try {
    const response = await axiosInstance.get(
      `/products/location/${locationId}`
    );
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (productId: string) => {
  try {
    const response = await axiosInstance.get(`/products/${productId}`);
    return response.data.product;
  } catch (error) {
    console.error(`Error fetching product with ID: ${productId}`, error);
    throw error;
  }
};

export const createProduct = async (productData: ProductData) => {
  try {
    const formData = new FormData();

    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price.toString());
    formData.append("availableOnline", productData.availableOnline.toString());
    formData.append("ships", productData.ships.toString());
    formData.append("pickupAvailable", productData.pickupAvailable.toString());
    formData.append("inShopOnly", productData.inShopOnly.toString());

    if (productData.productUrl) {
      formData.append("productUrl", productData.productUrl);
    }

    productData.images.forEach((image) => {
      console.log(image);
      //@ts-ignore
      formData.append("media", {
        uri: image.url,
        name: image.name,
      });
    });

    // Append array fields
    productData.location.forEach((loc, index) => {
      formData.append(`location[${index}]`, loc);
    });

    productData.mainCategory.forEach((cat, index) => {
      formData.append(`mainCategory[${index}]`, cat);
    });

    productData.category.forEach((cat, index) => {
      formData.append(`category[${index}]`, cat);
    });

    if (productData.subCategory) {
      productData.subCategory.forEach((subCat, index) => {
        formData.append(`subCategory[${index}]`, subCat);
      });
    }

    // Append product options
    if (productData.options) {
      productData.options.forEach((option, index) => {
        formData.append(
          `options[${index}][optionCategory]`,
          option.optionCategory
        );
        formData.append(`options[${index}][optionName]`, option.optionName);
      });
    }
    console.log(formData);
    const response = await axiosInstance.post(`/products`, formData);
    return response.data.product;
  } catch (error) {
    console.error("Error creating product:", getBackendErrorMessage(error));
    throw error;
  }
};

// Function to update an existing product
export const updateProduct = async (
  productId: string,
  productData: ProductData
) => {
  try {
    const formData = new FormData();

    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price.toString());
    formData.append("availableOnline", productData.availableOnline.toString());
    formData.append("ships", productData.ships.toString());
    formData.append("pickupAvailable", productData.pickupAvailable.toString());
    formData.append("inShopOnly", productData.inShopOnly.toString());

    if (productData.productUrl) {
      formData.append("productUrl", productData.productUrl);
    }

    productData.images.forEach((image) => {
      //@ts-ignore
      formData.append("media", {
        uri: image.url,
        name: image.name,
      });
    });

    // Append array fields
    productData.location.forEach((loc, index) => {
      formData.append(`location[${index}]`, loc);
    });

    productData.existingImages &&
      productData.existingImages.forEach((loc, index) => {
        formData.append(`existingImages[${index}]`, loc);
      });

    productData.mainCategory.forEach((cat, index) => {
      formData.append(`mainCategory[${index}]`, cat);
    });

    productData.category.forEach((cat, index) => {
      formData.append(`category[${index}]`, cat);
    });

    if (productData.subCategory) {
      productData.subCategory.forEach((subCat, index) => {
        formData.append(`subCategory[${index}]`, subCat);
      });
    }

    // Append product options
    if (productData.options) {
      productData.options.forEach((option, index) => {
        formData.append(
          `options[${index}][optionCategory]`,
          option.optionCategory
        );
        formData.append(`options[${index}][optionName]`, option.optionName);
      });
    }
    const response = await axiosInstance.put(
      `/products/${productId}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID: ${productId}`, error);
    throw error;
  }
};

// Function to delete a product by ID
export const deleteProduct = async (productId: string) => {
  try {
    const response = await axiosInstance.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with ID: ${productId}`, error);
    throw error;
  }
};

// Function to submit a product review
export const submitReview = async (
  productId: string,
  reviewData: ReviewData
) => {
  try {
    const response = await axiosInstance.post(
      `/products/${productId}/review`,
      reviewData
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error submitting review for product with ID: ${productId}`,
      error
    );
    throw error;
  }
};
