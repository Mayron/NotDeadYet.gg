/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from "next";

const revalidateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.token !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
    return res.status(401);
  }

  try {
    if (req.query.type === "admin") {
      await res.revalidate("/admin");

      if (req.query.status && typeof req.query.status === "string") {
        await res.revalidate(`/admin/${req.query.status}`);
        console.info(`Revalidating /admin + /admin/${req.query.status} path.`);
      } else {
        console.info(`Revalidating /admin path with no status paths.`);
      }
    }

    return res.status(200);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error revalidating");
  }
};

export default revalidateHandler;
