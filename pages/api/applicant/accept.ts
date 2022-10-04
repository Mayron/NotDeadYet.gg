import type { NextApiRequest, NextApiResponse } from "next";
import { updateApplicationStatus } from "../../../firebase";

const acceptHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400);
    return;
  }

  const payload = JSON.parse(req.body as string) as { userId: string };
  await updateApplicationStatus(payload.userId, "Guild Member");
  res.status(200).end();
};

export default acceptHandler;
