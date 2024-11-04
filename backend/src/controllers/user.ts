import { Request, Response } from "express";
import User from "../models/user";
import { CustomRequest } from "../middleware/auth";
import { uploadMediaToS3 } from "../utils/media";

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

export const updateUserData = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user!._id;
    const { firstName, lastName, state, city } = req.body;

    const user = await User.findById(userId).select(
      "-password -verificationCode -verificationCodeExpires"
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const imageUploadPromises: Promise<any>[] = [];
    console.log(req.files);
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const mediaType = file.mimetype.startsWith("image") ? "image" : "video";
        imageUploadPromises.push(
          uploadMediaToS3(file.buffer, file.filename, mediaType)
        );
      }
    }

    const imageUploadResults = await Promise.all(imageUploadPromises);
    console.log(imageUploadResults);
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.state = state || user.state;
    user.city = city || user.city;
    user.avatarUrl =
      imageUploadResults.length > 0
        ? imageUploadResults[0].url
        : user.avatarUrl;

    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
