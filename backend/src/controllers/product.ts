import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Product from "../models/product";
import { CustomRequest } from "../middleware/auth";
import { deleteMediaFromS3, uploadMediaToS3 } from "../utils/media";

// Create Product Controller
export const createProduct = async (req: CustomRequest, res: Response) => {
  const userId = req.user?._id;
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: "Validation errors",
      errors: errors.array(),
    });
    return;
  }

  try {
    const imageUploadPromises: Promise<any>[] = [];
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const mediaType = file.mimetype.startsWith("image") ? "image" : "video";
        imageUploadPromises.push(
          uploadMediaToS3(file.path, file.filename, mediaType)
        );
      }
    }

    const imageUploadResults = await Promise.all(imageUploadPromises);
    console.log(imageUploadResults);

    const {
      name,
      description,
      price,
      location,
      mainCategory,
      category,
      subCategory,
      options,
      availableOnline,
      productUrl,
      ships,
      pickupAvailable,
      inShopOnly,
    } = req.body;

    // Create a new Product instance
    const newProduct = new Product({
      user: userId,
      name,
      description,
      price,
      images: imageUploadResults.map((image) => image.url),
      location,
      mainCategory,
      category,
      subCategory,
      options,
      availableOnline,
      productUrl,
      ships,
      pickupAvailable,
      inShopOnly,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Respond with the saved product
    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error: any) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "Server error while creating product",
      error: error.message,
    });
  }
};

// Update Product Controller
export const updateProduct = async (req: CustomRequest, res: Response) => {
  const userId = req.user?._id;
  const productId = req.params.id;

  const {
    name,
    description,
    price,
    location,
    mainCategory,
    category,
    existingImages,
    subCategory,
    options,
    availableOnline,
    productUrl,
    ships,
    pickupAvailable,
    inShopOnly,
  } = req.body;

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: "Validation errors",
      errors: errors.array(),
    });
    return;
  }

  try {
    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({
        message: "Product not found",
      });
      return;
    }

    // Check if the user is the owner of the product
    if (product.user.toString() !== userId) {
      res.status(403).json({
        message: "You are not authorized to update this product",
      });
      return;
    }

    // Handle media update
    const currentImage = product.images || [];
    const newImageUrls = existingImages || [];

    // Identify media to delete
    const imageToDelete = currentImage.filter(
      (image) => !newImageUrls.includes(image)
    );

    // Delete image from S3
    await Promise.all(
      imageToDelete.map(async (image) => {
        await deleteMediaFromS3(image); // Function to delete the file from S3
      })
    );

    // Handle media uploads if any files are provided
    const imageUploadPromises: Promise<any>[] = [];
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const mediaType = file.mimetype.startsWith("image") ? "image" : "video";
        imageUploadPromises.push(
          uploadMediaToS3(file.path, file.filename, mediaType)
        );
      }
    }

    const imageUploadResults = await Promise.all(imageUploadPromises);
    const uploadedImages = imageUploadResults.map((media) => media.url);

    // Update product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    if (uploadedImages.length > 0) {
      product.images = [...newImageUrls, ...uploadedImages];
    } else {
      product.images = newImageUrls;
    }
    product.location = location || product.location;
    product.mainCategory = mainCategory || product.mainCategory;
    product.category = category || product.category;
    product.subCategory = subCategory || product.subCategory;
    product.options = options || product.options;
    product.availableOnline =
      availableOnline !== undefined ? availableOnline : product.availableOnline;
    product.productUrl = productUrl || product.productUrl;
    product.ships = ships !== undefined ? ships : product.ships;
    product.pickupAvailable =
      pickupAvailable !== undefined ? pickupAvailable : product.pickupAvailable;
    product.inShopOnly =
      inShopOnly !== undefined ? inShopOnly : product.inShopOnly;

    // Save the updated product
    const updatedProduct = await product.save();

    // Respond with the updated product
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error: any) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Server error while updating product",
      error: error.message,
    });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: "Products retrieved successfully",
      products,
    });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
      error: error.message,
    });
  }
};

// Get Product by ID Controller
export const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      message: "Product retrieved successfully",
      product,
    });
  } catch (error: any) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      message: "Server error while fetching product",
      error: error.message,
    });
  }
};
