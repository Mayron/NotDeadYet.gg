/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from "next";
import { Collections } from "../../../../data";
import { getDocumentField } from "../../../../firebase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.userId) {
    res.status(400);
    return;
  }

  const userId = req.query.userId as string;

  try {
    if (req.method === "GET") {
      const username = await getDocumentField(userId, Collections.Users, "username");
      res.status(200).json(username ?? userId);
      return;
    }
  } catch (err) {
    console.error("Failed to get all comments, error: %s.", err);
    res.status(400);
  }

  res.status(404);
};

export default handler;
