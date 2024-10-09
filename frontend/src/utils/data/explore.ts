import { Option } from "@/src/types/components";
import { Product } from "@/src/types/product";

export const productOptions: {
  label: string;
  value: string;
  detailOptions: Option[];
}[] = [
  {
    label: "Clothing",
    value: "Clothing",
    detailOptions: [
      { label: "Shirt", value: "Shirt" },
      { label: "Shorts", value: "Shorts" },
      { label: "Jackets", value: "Jackets" },
    ],
  },
  {
    label: "Electronics",
    value: "Electronics",
    detailOptions: [
      { label: "Phone", value: "Phone" },
      { label: "Laptop", value: "Laptop" },
    ],
  },
];

export const serviceOptions: {
  label: string;
  value: string;
  detailOptions: Option[];
}[] = [
  {
    label: "Consulting",
    value: "Consulting",
    detailOptions: [
      { label: "Business", value: "Business" },
      { label: "Technology", value: "Technology" },
    ],
  },
  {
    label: "Tutoring",
    value: "Tutoring",
    detailOptions: [
      { label: "Math", value: "Math" },
      { label: "Science", value: "Science" },
    ],
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Product Name",
    options: "Shipping Available - Pickup",
    price: "$10.99",
    image: require("../../../assets/images/product.png"),
  },
  {
    id: "2",
    name: "Product Name",
    options: "Shipping Available - Pickup",
    price: "$10.99",
    image: require("../../../assets/images/product.png"),
  },
  {
    id: "3",
    name: "Product Name",
    options: "Shipping Available - Pickup",
    price: "$10.99",
    image: require("../../../assets/images/product.png"),
  },
  {
    id: "4",
    name: "Product Name",
    options: "Shipping Available - Pickup",
    price: "$10.99",
    image: require("../../../assets/images/product.png"),
  },
  {
    id: "5",
    name: "Product Name",
    options: "Shipping Available - Pickup",
    price: "$10.99",
    image: require("../../../assets/images/product.png"),
  },
  {
    id: "6",
    name: "Product Name",
    options: "Shipping Available - Pickup",
    price: "$10.99",
    image: require("../../../assets/images/product.png"),
  },
];

export const services: Product[] = [
  {
    id: "1",
    name: "Service Name",
    options: "In Home",
    price: "$10.99",
    image: require("../../../assets/images/service.png"),
  },
  {
    id: "2",
    name: "Service Name",
    options: "In Home",
    price: "$10.99",
    image: require("../../../assets/images/service.png"),
  },
  {
    id: "3",
    name: "Service Name",
    options: "In Home",
    price: "$10.99",
    image: require("../../../assets/images/service.png"),
  },
  {
    id: "4",
    name: "Service Name",
    options: "In Home",
    price: "$10.99",
    image: require("../../../assets/images/service.png"),
  },
  {
    id: "5",
    name: "Service Name",
    options: "In Home",
    price: "$10.99",
    image: require("../../../assets/images/service.png"),
  },
  {
    id: "6",
    name: "Service Name",
    options: "In Home",
    price: "$10.99",
    image: require("../../../assets/images/service.png"),
  },
];
