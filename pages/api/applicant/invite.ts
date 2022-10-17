/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { Collections, Status } from "../../../data";
import { updateDocument } from "../../../firebase";
import { authOptions } from "../auth/[...nextauth]";

const inviteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const isAdmin = session?.user?.admin;

  if (!isAdmin || req.method !== "POST") {
    res.status(400);
    return;
  }

  const { userId } = JSON.parse(req.body as string) as { userId: string };

  await updateDocument(userId, Collections.Applications, {
    status: Status.PendingInvite,
  });

  await res.revalidate("/admin", { unstable_onlyGenerated: true });
  await res.revalidate("/admin/accepted");
  console.info(`Revalidating admin paths for accepted applicant with pending invite.`);

  res.status(200).end();
};

export default inviteHandler;
