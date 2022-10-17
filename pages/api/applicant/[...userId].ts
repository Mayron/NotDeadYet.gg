/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { Collections, Status } from "../../../data";
import { storeDocument, updateDocument } from "../../../firebase";
import { authOptions } from "../auth/[...nextauth]";

const storeApplication = async (userId: string, application: IApplication) => {
  try {
    application.characters.forEach((character) => {
      const name = character.name.toLowerCase();
      const first = name.substring(0, 1).toUpperCase();
      character.name = `${first}${name.substring(1)}`;
    });

    application.userId = userId;
    application.createdAt = new Date().toUTCString();
    application.status =
      application.inGuild === "yes" ? Status.UnconfirmedMember : Status.NewApplicant;

    await storeDocument(userId, Collections.Applications, application);

    // Update username to match main character name (name is different to username - it's the battlenet name)
    await updateDocument(userId, Collections.Users, {
      username: application.characters[0].name,
    });
  } catch (err) {
    console.error("storeApplication error: %s.", err);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const user = session?.user;

  if (!user) {
    res.status(400);
    return;
  }

  if (req.method === "POST") {
    // new applicant:
    const { userId } = req.query;

    if (userId !== user.userId) {
      res.status(400);
      return;
    }

    const application = JSON.parse(req.body as string) as IApplication;
    await storeApplication(userId, application);
  }

  res.status(200).end();
};

export default handler;
