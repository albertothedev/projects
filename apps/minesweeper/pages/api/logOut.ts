import { type NextApiRequest, type NextApiResponse } from "next";
import { deleteCookie } from "cookies-next";

export default async function logOut(
  req: NextApiRequest,
  res: NextApiResponse
) {
  deleteCookie("jwt", { req, res });

  return res.status(200).json({
    message: "Successfully logged out",
  });
}
