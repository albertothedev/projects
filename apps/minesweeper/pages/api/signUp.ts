import { type NextApiRequest, type NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";

import db from "config/firebase";

export default async function leaderboard(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const newUser = {
    username: req.body.data.username,
    password: bcrypt.hashSync(req.body.data.password, 10),
  };

  try {
    const user = await db.collection("users").add(newUser);

    const token = jwt.sign(
      user.id,
      process.env.NEXT_PUBLIC_JWT_SECRET as string
    );

    setCookie("jwt", token, { httpOnly: true, req, res });

    res.status(200).json({
      username: req.body.data.username,
      message: `Your account has been created`,
    });
  } catch (error) {
    console.error(`Error adding document: ${error}`);
  }
}
