import { Request, Response } from "express";
import Order, { OrderConfirmation, OrderDocument } from "../models/order";
import Category, { CategoryDocument } from "../models/category";
import Menu, { MenuDocument } from "../models/menu";
import { CustomRequest } from "../middleware/auth";

const calculateTotal = (products: any): number => {
  const totalPrice = products.reduce((total: number, product: any) => {
    return total + product.price;
  });
  return totalPrice || 0;
};

interface IConfirmationDetails {
  message: string;
}

const getConfirmationDetails = (
  order: OrderDocument | null
): IConfirmationDetails => {
  if (!order) {
    return { message: `Order not found` };
  }
  if (
    order.adminConfirmation == OrderConfirmation.ACCEPTED &&
    order.userConfirmation !== OrderConfirmation.ACCEPTED
  ) {
    return { message: `Waiting for user to confirm the order` };
  }
  // Admin rejected the order
  if (order.adminConfirmation == OrderConfirmation.REJECTED) {
    return { message: `Order has been rejected` };
  }
  // The order has been accepted by both parties
  if (
    order.adminConfirmation == OrderConfirmation.ACCEPTED &&
    order.userConfirmation == OrderConfirmation.ACCEPTED
  ) {
    return { message: `Order has been processed` };
  }
  return { message: `An error occurred` };
};

// All Orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const allOrders: any = await Order.find()
      .populate("user", "firstName lastName username")
      .populate("product");
    for (let order of allOrders) {
      order.totalPrice = calculateTotal(order.product);
    }
    res.status(200).send({ message: `Success`, data: allOrders });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Order Details using the order id
export const getOrderDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const _order: any = await Order.findById(id)
      .populate("user", "firstName lastName username")
      .populate("product");
    _order.totalPrice = calculateTotal(_order.product);
    res.status(200).send({ message: `Success`, data: _order });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Order by category
export const getOrderByCategory = async (req: Request, res: Response) => {
  try {
    const _categories = await Category.find().populate("order");
    // const allOrders = await Order.find()
    //   .populate("user", "firstName lastName username")
    //   .populate("product");
    // const groupedByCategory = allOrders.reduce(
    //   (acc: { [category: string]: OrderDocument[] }, order: OrderDocument) => {
    //     const category = order.category || "Uncategorized"; // Handle cases where category is undefined
    //     if (!acc[category]) {
    //       acc[category] = [];
    //     }
    //     acc[category].push(order); // Push each order into the corresponding category array
    //     return acc;
    //   },
    //   {} as { [category: string]: OrderDocument[] }
    // );

    res.status(200).send({ message: "success", data: _categories });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Creating Order
export const createCategory = async (req: CustomRequest, res: Response) => {
  try {
    const { name } = req.body;
    const user = req.user!._id;
    const _category: CategoryDocument = new Category({
      user,
      name,
    });
    await _category.save();
    res.status(201).send({ message: "success" });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Order confirmation
export const getOrderConfirmation = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const _order: OrderDocument | null = await Order.findById(id);
    res.status(200).send({ message: getConfirmationDetails(_order).message });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// confirm order
export const confirmOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const _order: OrderDocument | null = await Order.findById(id);
    if (!_order) {
      res.status(400).send({ message: `Order not found` });
    }
    _order!.adminConfirmation = OrderConfirmation.ACCEPTED;
    await _order!.save();
    res.status(200).send({ message: "confirmation success" });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// reject order
export const rejectOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const _order: OrderDocument | null = await Order.findById(id);
    if (!_order) {
      res.status(400).send({ message: `Order not found` });
    }
    _order!.adminConfirmation = OrderConfirmation.REJECTED;
    await _order!.save();
    res.status(200).send({ message: "Order rejected successfully" });
  } catch (err) {
    res.status(500).send({ message: "internal Server Error" });
  }
};

// Add Menu
export const addMenu = async (req: CustomRequest, res: Response) => {
  try {
    const { name, order, location, displayDays, displayTime } = req.body;
    const user = req.user!._id;
    const _menu: MenuDocument = new Menu({
      name,
      location,
      displayDays,
      displayTime,
      user,
    });
    await _menu.save();
    res.status(201).send({ message: "Menu created successfully" });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// All Menus
export const getAllMenu = async (req: Request, res: Response) => {
  try {
    const menus = await Menu.find()
      .populate("user", "firstName, lastName, username")
      .populate("order"); //populating menu with order and user
    res.status(201).send({ message: "Menu created successfully", data: menus });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
