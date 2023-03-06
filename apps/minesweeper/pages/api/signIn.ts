import { type NextApiRequest, type NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";

import db from "config/firebase";

export default async function signIn(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const usersSnapshot = await db
      .collection("users")
      .where("username", "==", req.body.data.username)
      .get();

    if (usersSnapshot.docs.length) {
      usersSnapshot.docs.forEach(async (doc) => {
        try {
          await bcrypt.compare(req.body.data.password, doc.data().password);

          const token = jwt.sign(
            doc.id,
            process.env.NEXT_PUBLIC_JWT_SECRET as string
          );

          setCookie("jwt", token, { httpOnly: true, req, res });

          res.status(200).json({
            username: req.body.data.username,
            message: `you are logged in as ${req.body.data.username}`,
          });
        } catch (error) {
          console.error(error);
        }
      });
    } else {
      res.status(404).json({
        message:
          "we couldn't find a user with that username and password combination",
      });
    }
  } catch (error) {
    console.error(`Error getting collection: ${error}`);
  }
}
