import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { Collections } from "../../../data";
import { removeDocument, updateDocument } from "../../../firebase";
import { authOptions } from "../auth/[...nextauth]";

const removeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const user = session?.user;

  if (!user || req.method !== "POST") {
    res.status(400);
    return;
  }

  const { userId } = JSON.parse(req.body as string) as { userId: string };

  await removeDocument(userId, Collections.Applications);
  await updateDocument(userId, Collections.Users, {
    member: false,
  });

  await res.revalidate("/admin/accepted");
  res.status(200).end();
};

export default removeHandler;
