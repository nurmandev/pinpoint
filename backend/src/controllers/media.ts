import { Request, Response } from "express";
import { downloadMediaFromS3 } from "../utils/media";

export const downloadMedia = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const range = req.headers.range;
    if (!key) {
      res.status(400).json({
        message: "key is required",
      });
      return;
    }
    const response = await downloadMediaFromS3(key);

    if (!response.Body) {
      res.status(404).json({ message: "Media not found" });
      return;
    }

    const mediaBuffer = Buffer.from(await response.Body.transformToByteArray());

    // Check Content-Type for video or image
    const contentType = response.ContentType || "application/octet-stream";

    if (contentType.startsWith("video") && range) {
      // Handle video streaming with range headers
      const [start, end] = range
        .replace(/bytes=/, "")
        .split("-")
        .map(Number);
      const videoEnd = end || mediaBuffer.length - 1;
      const chunkSize = videoEnd - start + 1;

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${videoEnd}/${mediaBuffer.length}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": contentType,
      });
      res.end(mediaBuffer.slice(start, videoEnd + 1));
    } else {
      // Send image or full video without range
      res.writeHead(200, {
        "Content-Type": contentType,
        "Content-Length": mediaBuffer.length,
      });
      res.end(mediaBuffer);
    }
  } catch (error) {
    console.error("Media download error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
