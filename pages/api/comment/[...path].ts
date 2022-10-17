/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { Collections } from "../../../data";
import { getAllCommentsByPostId, storeDocument } from "../../../firebase";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const user = session?.user;
  const [postId, userId] = req.query.path as string[];

  if (!user || (userId !== user.userId && !user.admin)) {
    res.status(400);
    return;
  }

  try {
    if (req.method === "GET") {
      const comments = await getAllCommentsByPostId(postId);
      res.status(200).json(comments);
      return;
    }
    if (req.method === "POST") {
      const commentBody = req.body as string;
      const comment: IComment = {
        postId,
        userId,
        body: commentBody,
        createdAt: new Date().toUTCString(),
      };

      await storeDocument(undefined, Collections.Comments, comment);
      res.status(200).json(comment);
      return;
    }
  } catch (err) {
    console.error("Failed to get all comments, error: %s.", err);
  }

  res.status(400);
};

export default handler;
