import { type NextApiRequest, type NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { getCookie, hasCookie } from "cookies-next";

import db from "config/firebase";
import { type TCookie, type TUser } from "types";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  if (hasCookie("jwt", { req, res })) {
    const cookie = getCookie("jwt", { req, res }) as string;

    const tokenDecoded = jwt.verify(
      cookie,
      process.env.NEXT_PUBLIC_JWT_SECRET as string
    ) as TCookie;

    if (tokenDecoded) {
      try {
        const usersSnapshot = await db
          .collection("users")
          .doc(tokenDecoded)
          .get();

        res.status(200).json({
          username: (usersSnapshot.data() as TUser).username,
          message: `you are logged in as ${
            (usersSnapshot.data() as TUser).username
          }`,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      res.status(401).end();
    }
  } else {
    res.status(404).end();
  }
}
