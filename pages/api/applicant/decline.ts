/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { Status } from "../../../data";
import { updateApplicationStatus } from "../../../firebase";
import { authOptions } from "../auth/[...nextauth]";

const declineHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const isAdmin = session?.user?.admin;

  if (!isAdmin || req.method !== "POST") {
    res.status(400);
    return;
  }

  const payload = JSON.parse(req.body as string) as { userId: string };
  await updateApplicationStatus(payload.userId, Status.Declined);

  await res.revalidate("/admin", { unstable_onlyGenerated: true });
  await res.revalidate("/admin/declined", { unstable_onlyGenerated: true });
  console.info(`Revalidating admin paths for declined applicant.`);

  res.status(200).end();
};

export default declineHandler;
