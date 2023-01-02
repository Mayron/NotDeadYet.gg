import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { Collections, Status } from "../../../data";
import { updateDocument } from "../../../firebase";
import { authOptions } from "../auth/[...nextauth]";

const acceptHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const user = session?.user;

  if (!user || req.method !== "POST") {
    res.status(400);
    return;
  }

  const { userId } = JSON.parse(req.body as string) as { userId: string };

  await updateDocument(userId, Collections.Applications, {
    status: Status.GuildMember,
  });

  await updateDocument(userId, Collections.Users, {
    member: true,
  });

  await res.revalidate("/admin/accepted");

  res.status(200).end();
};

export default acceptHandler;
