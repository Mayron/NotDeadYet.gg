import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { Status } from "../../../data";
import { updateApplicationStatus } from "../../../firebase";
import { authOptions } from "../auth/[...nextauth]";

const acceptHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const user = session?.user;

  if (!user || req.method !== "POST") {
    res.status(400);
    return;
  }

  const payload = JSON.parse(req.body as string) as { userId: string };
  await updateApplicationStatus(payload.userId, Status.GuildMember);
  res.status(200).end();
};

export default acceptHandler;
