import { Request, Response } from "express";
import User from "../models/user";
import { CustomRequest } from "../middleware/auth";

export const getUserData = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user!._id;
    const user = await User.findById(userId).select(
      "-password -verificationCode -verificationCodeExpires"
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
