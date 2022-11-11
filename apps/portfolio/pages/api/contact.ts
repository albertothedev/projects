import type { NextApiRequest, NextApiResponse } from "next";

import { sendEmail } from "config/nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Contact>
) {
  await sendEmail(req.body.data);
  res.end();
}
