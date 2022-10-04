import type { NextApiRequest, NextApiResponse } from "next";
import { updateApplicationStatus } from "../../../firebase";

const inviteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400);
    return;
  }

  const payload = JSON.parse(req.body as string) as { userId: string };
  await updateApplicationStatus(payload.userId, "Pending Invite");
  res.status(200).end();
};

export default inviteHandler;
