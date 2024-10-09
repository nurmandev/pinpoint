import { Request, Response } from "express";
import { downloadMediaFromS3 } from "../utils/media";

export const getMedia = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    if (!key) {
      res.status(400).json({
        message: "key is required",
      });
      return;
    }
    const result = await downloadMediaFromS3(key);
    res.writeHead(200, {
      "Content-Type": result.contentType,
      "Content-Length": result.bodyBuffer.length,
    });
    res.end(result.bodyBuffer);
  } catch (error) {
    console.error("Image download error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }
};
